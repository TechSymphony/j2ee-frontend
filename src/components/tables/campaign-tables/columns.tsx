"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { CampaignType } from "@/schemas/campaign.schema";
import { ReviewStatusEnum, ReviewStatusOptions } from "@/types/enum";// Import Select components
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { useUpdateCampaignStatusMutation } from "@/queries/useCampaign";

/**
 * Description: Khai báo columns cho table
 * Note:
 * accessorKey có value tương ứng với response data của api (phải ghi đúng để nó lấy được data ra)
 * header: Đơn giản chỉ là việc hiển thị tên column
 */
export const columns: ColumnDef<CampaignType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Tên chiến dịch",
  },
  {
    accessorKey: "disabledAt",
    header: "Trạng thái hiển thị",
    cell: ({ row }) => {
      const [isDisabled, setIsDisabled] = useState(row.original.disabledAt);
      const updateCampaignStatusMutation = useUpdateCampaignStatusMutation();

      const handleToggle = async () => {
        setIsDisabled(!isDisabled);

        await updateCampaignStatusMutation.mutateAsync({
          id: row.original.id,
          disabledAt: !isDisabled,
        });
      };

      return (
        <Switch className="bg-green-500 border-2 border-gray-300 rounded-full "
          checked={!isDisabled}
          onCheckedChange={handleToggle}
        />
      );
    },
  },
  {
    accessorKey: "targetAmount",
    header: "Số tiền dự kiến",
  },
  {
    accessorKey: "currentAmount",
    header: "Sô tiền hiện tại",
  },
  {
    accessorKey: "startDate",
    header: "Ngày bắt đầu",
  },
  {
    accessorKey: "endDate",
    header: "Ngày kết thúc",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const [status, setStatus] = useState<ReviewStatusEnum>(
        ReviewStatusEnum[row.original.status as keyof typeof ReviewStatusEnum]
      );

      useEffect(() => {
        setStatus(ReviewStatusEnum[row.original.status as keyof typeof ReviewStatusEnum]);
      }, [row.original.status]);

      const statusOption = ReviewStatusOptions.find(option => option.value === status);
      if (status === ReviewStatusEnum.APPROVED) {
        return <span className="text-green-500">{statusOption ? statusOption.label : "Không tìm thấy"}</span>;
      }
      if (status === ReviewStatusEnum.REJECT) {
        return <span className="text-red-500">{statusOption ? statusOption.label : "Không tìm thấy"}</span>;
      }
      return statusOption ? statusOption.label : "Không tìm thấy";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
