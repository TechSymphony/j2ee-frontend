"use client";
import { ColumnDef } from "@tanstack/react-table";
// import { CellAction } from "./cell-action";
// import { Checkbox } from "@/components/ui/checkbox";
import { DonationType } from "@/schemas/donation.schema";
import {
  ReviewDonationOptions,
  ReviewFrequencyEnum,
  ReviewFrequencyOptions,
} from "@/types/enum"; // Import Select components
import { useEffect, useState } from "react";
import { ReviewDonationEnum } from "../../../types/enum";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { CellAction } from "./cell-action";

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
    accessorKey: "campaign.name",
    header: "Chiến dịch",
  },
  {
    accessorKey: "donor.fullName",
    header: "Tên người ủng hộ",
  },
  // {
  //   accessorKey: "amountBase",
  //   header: "Số tiền cơ bản",
  // },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status =
        ReviewDonationEnum[
          row.original.status as keyof typeof ReviewDonationEnum
        ];

      const statusOption = ReviewDonationOptions.find(
        (option) => option.value === status
      );

      if (status === ReviewDonationEnum.COMPLETED) {
        return (
          <span className="text-green-500">
            {statusOption ? statusOption.label : "Không tìm thấy"}
          </span>
        );
      }
      if (status === ReviewDonationEnum.CANCELLED) {
        return (
          <span className="text-red-500">
            {statusOption ? statusOption.label : "Không tìm thấy"}
          </span>
        );
      }
      if (status === ReviewDonationEnum.HOLDING) {
        return (
          <span>
            <Popover>
              <PopoverTrigger>
                <span className="whitespace-nowrap flex gap-1 items-center">
                  {statusOption ? statusOption.label : "Không tìm thấy"}{" "}
                  <InfoCircledIcon></InfoCircledIcon>
                </span>
              </PopoverTrigger>
              <PopoverContent>
                <p className="whitespace-nowrap">
                  {statusOption ? statusOption.tooltip : ""}
                </p>
              </PopoverContent>
            </Popover>
          </span>
        );
      }
      return statusOption ? statusOption.label : "Không tìm thấy";
    },
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
        ReviewFrequencyEnum[
          row.original.frequency as keyof typeof ReviewFrequencyEnum
        ]
      );
      const frequencyOption = ReviewFrequencyOptions.find(
        (option) => option.value === frequency[0]
      );
      return frequencyOption ? frequencyOption.label : "Không tìm thấy";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
