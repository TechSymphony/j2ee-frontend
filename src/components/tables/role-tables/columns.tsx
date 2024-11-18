"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import { RoleType } from "@/schemas/role.schema";
import { CheckIcon, X } from "lucide-react";

/**
 * Description: Khai báo columns cho table
 * Note:
 * accessorKey có value tương ứng với response data của api (phải ghi đúng để nó lấy được data ra)
 * header: Đơn giản chỉ là việc hiển thị tên column
 */
export const columns: ColumnDef<RoleType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
  },

  {
    accessorKey: "name",
    header: "Tên ",
  },
  {
    accessorKey: "description",
    header: "Mô tả",
  },
  // {
  //   header: "Không thể xóa",
  //   cell: ({ row }) =>
  //     row.original.name !== "admin" ? (
  //       <CheckIcon className="text-green-500" />
  //     ) : (
  //       <X className="text-red-500" />
  //     ),
  // },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
