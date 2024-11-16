import { Badge } from "@/components/ui/badge";
import exp from "constants";

export enum ReviewStatusEnum {
    WAITING = 0,
    APPROVED = 1,
    REJECT = 2,
}

export enum ReviewFrequencyEnum {
    ONCE = 0,
    MONTHLY = 1,
    QUARTERLY = 2,
    YEARLY = 3,
}

// Create an array of options manually because js is too stupid
export const ReviewStatusOptions = [
    { value: ReviewStatusEnum.WAITING, label: "Đợi xét duyệt" },
    { value: ReviewStatusEnum.APPROVED, label: "Đã duyệt" },
    { value: ReviewStatusEnum.REJECT, label: "Từ chối" },
];

export const ReviewFrequencyOptions = [
    { value: ReviewFrequencyEnum.ONCE, label: "Một lần" },
    { value: ReviewFrequencyEnum.MONTHLY, label: "Hàng tháng" },
    { value: ReviewFrequencyEnum.QUARTERLY, label: "Hàng quý" },
    { value: ReviewFrequencyEnum.YEARLY, label: "Hàng năm" },
];

export enum ReviewDonationEnum {
    IN_PROGRESS = 0,
    HOLDING = 1,
    COMPLETED = 2,
    CANCELLED = 3,
}

export const ReviewDonationOptions = [
    { value: ReviewDonationEnum.IN_PROGRESS, label: "Đang xử lý" },
    {
        value: ReviewDonationEnum.HOLDING,
        label: "Đang tạm giữ",
        tooltip: "Hệ thống không thể xác thực tự động",
    },
    { value: ReviewDonationEnum.COMPLETED, label: "Đã hoàn thành" },
    { value: ReviewDonationEnum.CANCELLED, label: "Đã huỷ" },
];
