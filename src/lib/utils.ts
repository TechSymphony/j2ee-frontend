import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "@/hooks/use-toast";
import { EntityError } from "@/lib/http";
import { UseFormSetError } from "react-hook-form";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// /**
//  * Description: Xử lý lỗi trả về từ API
//  * Params:
//  * error: Lỗi trả về
//  * setError: hooks của form để set message lỗi nếu có
//  * duration: Thời gian của thông báo lỗi
//  */
export const handleErrorFromApi = ({
  error,
  setError,
  duration,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.fieldErrors.forEach((item) => {
      console.log(item); // permissions: There must be at least one permission
      const [field, message] = item.split(": ");
      console.log([field, message]);
      setError(field, {
        type: "server",
        message: message,
      });
    });
  } else {
    toast({
      title: "Lỗi",
      description: error?.payload?.message ?? "Lỗi không xác định",
      variant: "destructive",
      duration: duration ?? 5000,
    });
  }
};

const isBrowser = typeof window !== "undefined";

export const getAccessTokenFromLocalStorage = () => {
  let accessToken = null;
  if (isBrowser) {
    const object = localStorage.getItem("accessToken");
    accessToken = (object as any).access_token as string;
  }
  console.log(accessToken);
  return accessToken;
};
