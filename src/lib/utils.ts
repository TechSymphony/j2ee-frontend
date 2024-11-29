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
      title: error?.payload?.title ?? "Lỗi",
      description: error?.payload?.detail ?? "Lỗi không xác định",
      variant: "destructive",
      duration: duration ?? 5000,
    });
  }
};

export const logFormData = (formData: FormData) => {
  const entries = Array.from(formData.entries());
  entries.forEach(([key, value]) => {
    console.log(key, value);
  });
};

export const formatCurrency = (number: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};
