"use client";
import { ColumnDef } from "@tanstack/react-table";
// import { CellAction } from "./cell-action";
// import { Checkbox } from "@/components/ui/checkbox";
import { DonationType } from "@/schemas/donation.schema";
import { ReviewFrequencyEnum, ReviewFrequencyOptions } from "@/types/enum";// Import Select components
import { useState } from "react";

/**
 * Description: Khai báo columns cho table
 * Note:
 * accessorKey có value tương ứng với response data của api (phải ghi đúng để nó lấy được data ra)
 * header: Đơn giản chỉ là việc hiển thị tên column
 */
export const columns: ColumnDef<DonationType>[] = [
  // {
  // id: "select",
  // header: ({ table }) => (
  //   <Checkbox
  //     checked={table.getIsAllPageRowsSelected()}
  //     onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //     aria-label="Select all"
  //   />
  // ),
  // cell: ({ row }) => (
  //   <Checkbox
  //     checked={row.getIsSelected()}
  //     onCheckedChange={(value) => row.toggleSelected(!!value)}
  //     aria-label="Select row"
  //   />
  // ),
  // enableSorting: false,
  // enableHiding: false,
  // },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "donor.fullName",
    header: "Tên người ủng hộ",
  },
  {
    accessorKey: "campaign.name",
    header: "Chiến dịch",
  },
  {
    accessorKey: "amountBase",
    header: "Số tiền cơ bản",
  },
  {
    accessorKey: "amountTotal",
    header: "Số tiền tổng",
  },
  {
    accessorKey: "donationDate",
    header: "Ngày ủng hộ",
  },
  {
    accessorKey: "frequency",
    header: "Kỳ hạn",
    cell: ({ row }) => {
      const frequency = useState<ReviewFrequencyEnum>(
        ReviewFrequencyEnum[row.original.frequency as keyof typeof ReviewFrequencyEnum]
      );
      const frequencyOption = ReviewFrequencyOptions.find(option => option.value === frequency[0]);
      return frequencyOption ? frequencyOption.label : "Không tìm thấy";
    },
  },
];
