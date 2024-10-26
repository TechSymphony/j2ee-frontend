import { ReviewStatusEnum } from "@/types/enum";
import { Badge } from "./badge";

export const ReviewStatusBadges = (status: ReviewStatusEnum) => {
  return (
    <div>
      <Badge key={status} color={getBadgeColor(status)}>
        {status}
      </Badge>
    </div>
  );
};

// Function to determine the badge color based on status
const getBadgeColor = (status: ReviewStatusEnum) => {
  switch (status) {
    case ReviewStatusEnum.WAITING:
      return "yellow";
    case ReviewStatusEnum.APPROVED:
      return "green";
    case ReviewStatusEnum.REJECT:
      return "red";
    default:
      return "gray";
  }
};
