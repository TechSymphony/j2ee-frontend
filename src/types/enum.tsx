import { Badge } from "@/components/ui/badge";

export enum ReviewStatusEnum {
  WAITING = 0,
  APPROVED = 1,
  REJECT = 2,
}

// Create an array of options manually because js is too stupid
export const ReviewStatusOptions = [
  { value: ReviewStatusEnum.WAITING, label: "Đợi xét duyệt" },
  { value: ReviewStatusEnum.APPROVED, label: "Đã duyệt" },
  { value: ReviewStatusEnum.REJECT, label: "Từ chối" },
];
