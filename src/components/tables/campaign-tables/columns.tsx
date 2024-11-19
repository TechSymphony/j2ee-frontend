"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { CampaignType } from "@/schemas/campaign.schema";
import { ReviewStatusEnum, ReviewStatusOptions } from "@/types/enum";// Import Select components
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useUpdateCampaignStatusMutation, useUpdateCampaignStatusShowMutation } from "@/queries/useCampaign";
import SelectBoxEnum from "@/components/ui/select-box-enum";
import { toast } from "@/hooks/use-toast";
import { useRefetch } from "@/contexts/app-context";

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
      const updateCampaignStatusShowMutation = useUpdateCampaignStatusShowMutation();

      const handleToggle = async () => {
        setIsDisabled(!isDisabled);

        await updateCampaignStatusShowMutation.mutateAsync({
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
    header: "Trạng thái",
    cell: ({ row }) => <StatusCell row={row} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

const StatusCell = ({ row }: { row: any }) => {
  const [status, setStatus] =
    useState<ReviewStatusEnum>(
      ReviewStatusEnum[
      row.original
        .status as keyof typeof ReviewStatusEnum
      ]
    );

  console.log(status);

  const { triggerRefetch } = useRefetch();
  const updateCampaignStatusMutation = useUpdateCampaignStatusMutation();

  const handleValueChange = (value: ReviewStatusEnum) => {
    updateCampaignStatus(value);
  };

  const updateCampaignStatus = async (value: ReviewStatusEnum) => {
    await updateCampaignStatusMutation.mutateAsync({
      id: row.original.id,
      status: value,
    });
    setStatus(value);
    toast({
      description: "Cập nhật trạng thái thành công",
    });
    triggerRefetch();
  };

  return (
    <>
      <SelectBoxEnum
        value={status}
        options={ReviewStatusOptions}
        onValueChange={handleValueChange}
      />
    </>
  );
}
