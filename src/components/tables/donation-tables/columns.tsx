"use client";
import { ColumnDef } from "@tanstack/react-table";
// import { CellAction } from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import { DonationType } from "@/schemas/donation.schema";

/**
 * Description: Khai báo columns cho table
 * Note:
 * accessorKey có value tương ứng với response data của api (phải ghi đúng để nó lấy được data ra)
 * header: Đơn giản chỉ là việc hiển thị tên column
 */
export const columns: ColumnDef<DonationType>[] = [
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
    accessorKey: "donor.fullName",
    header: "Name",
  },
  {
    accessorKey: "campaign.name",
    header: "Campaign",
  },
  {
    accessorKey: "amountBase",
    header: "Amount Base",
  },
  {
    accessorKey: "amountTotal",
    header: "Amount Total",
  },
  {
    accessorKey: "donationDate",
    header: "Donation Date",
  },
  {
    accessorKey: "frequency",
    header: "Frequency ",
  },
];
