"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { CampaignType } from "@/schemas/campaign.schema";

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
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
