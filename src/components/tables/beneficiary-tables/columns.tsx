"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import { BeneficiaryType } from "@/schemas/beneficiary.schema";

/**
 * Description: Khai báo columns cho table
 * Note:
 * accessorKey có value tương ứng với response data của api (phải ghi đúng để nó lấy được data ra)
 * header: Đơn giản chỉ là việc hiển thị tên column
 */
export const columns: ColumnDef<BeneficiaryType>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },

  {
    accessorKey: "supportReceived",
    header: "Số tiền dự kiến",
  },
  {
    id: "user_name",
    accessorKey: "user.fullName",
    header: "Người dùng yêu cầu",
  },
  {
    accessorKey: "verificationStatus",
    header: "Trạng thái duyệt",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
