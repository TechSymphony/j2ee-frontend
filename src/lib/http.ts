/* eslint-disable @typescript-eslint/no-explicit-any */
import envConfig from "@/config";
import { userManager } from "@/lib/auth";
import { logFormData } from "./utils";

type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string | undefined;
  isBlob?: boolean;
};

const ENTITY_ERROR_STATUS = 422;
const NO_CONTENT = 204;

type EntityErrorPayload = {
  statusCode: string;
  title: string;
  detail: string;
  fieldErrors: string[];
};

export class HttpError extends Error {
  status: number;
  payload: any;
  constructor({
    status,
    payload,
    message = "Http Error",
  }: {
    status: number;
    payload: any;
    message?: string;
  }) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: typeof ENTITY_ERROR_STATUS;
  payload: EntityErrorPayload;
  constructor({
    status,
    payload,
  }: {
    status: typeof ENTITY_ERROR_STATUS;
    payload: EntityErrorPayload;
  }) {
    super({ status, payload, message: "Enity Error" });
    this.status = status;
    this.payload = payload;
  }
}
function convertBody(
  options?: CustomOptions | undefined,
  optionContentType?: string
) {
  // Get the Content-Type from the headers
  const contentType = optionContentType || "";

  let body;

  // Check if body exists and handle different types
  if (options?.body) {
    // If Content-Type is application/json, stringify the body
    if (contentType === "application/json") {
      body = JSON.stringify(options.body);
    }
    // If the body is already a Blob or File, keep it as is
    else if (options.body instanceof Blob || options.body instanceof File) {
      body = options.body;
    }
    // If Content-Type is multipart/form-data, handle form data (we'll assume it's a Blob/File)
    else if (contentType === "multipart/form-data") {
      body = options.body instanceof FormData ? options.body : new FormData();
      logFormData(body);
    }
    // For other content types, just pass the body as is
    else {
      body = options.body;
    }
  } else {
    body = undefined;
  }
  return body;
}
interface BaseHeader {
  Authorization?: string;
  "Content-Type"?: string;
}
const request = async <Response>(
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined
) => {
  const baseHeaders: BaseHeader = {
    Authorization: "",
  };

  const body = convertBody(options, options?.headers?.["Content-Type"] ?? "");
  const user = await userManager.getUser().then((user) => user);
  const accessToken = user?.access_token;

  if (accessToken) {
    // fix bug vì nếu không đăng nhập Bearer rỗng sẽ khiến hệ thống tưởng đang bị hack
    baseHeaders.Authorization = `Bearer ${accessToken}`;
  }

  /**
   * Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ envConfig.NEXT_PUBLIC_API_ENDPOINT
   * Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc gọi API đến Next.js Server
   */

  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;

  /**
   * Xử lý trường hợp ng dùng nhập /auth/login hoặc auth/login
   */
  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  /**
   * Add current query parameter if exists
   */

  const params: URLSearchParams = new URL(window.location.href).searchParams;

  const res = await fetch(fullUrl + "?" + params.toString(), {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  });

  // Check if the response is JSON or a binary file (e.g., PDF)
  const contentType = res.headers.get("Content-Type");
  let payload: Response;

  // Handle JSON response
  if (contentType) {
    if (
      contentType?.includes("application/json") ||
      res.status === NO_CONTENT
    ) {
      payload = res.status === NO_CONTENT ? {} : await res.json();
    }
    // Handle binary file response (e.g., PDF)
    else if (contentType?.includes("application/pdf") || options?.isBlob) {
      const blob = await res.blob();
      payload = blob as unknown as Response;
    } else {
      throw new Error(`Unexpected content type: ${contentType}`);
    }
  } else {
    payload = {};
  }

  const data = {
    status: res.status,
    payload,
  };

  /**
   * Đây là phần xử lý interceptor request,response
   */
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: typeof ENTITY_ERROR_STATUS;
          payload: EntityErrorPayload;
        }
      );
    } else {
      throw new HttpError(data);
    }
  }

  return data;
};

const withDefaultJsonHeaders = (options?: Omit<CustomOptions, "body">) => {
  const headers = {
    "Content-Type": "application/json",
    ...(options?.headers || {}),
  };
  return { ...options, headers };
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, withDefaultJsonHeaders(options));
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, {
      ...withDefaultJsonHeaders(options),
      body,
    });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, {
      ...withDefaultJsonHeaders(options),
      body,
    });
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, {
      ...withDefaultJsonHeaders(options),
    });
  },
  postWithFiles<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, {
      ...options,
      body,
    });
  },
  putWithFiles<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, {
      ...options,
      body,
    });
  },
  patch<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PATCH", url, {
      ...withDefaultJsonHeaders(options),
      body,
    });
  },
};

export default http;
