"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
// import { Checkbox } from "@/components/ui/checkbox";
import { BeneficiaryType } from "@/schemas/beneficiary.schema";
import { ReviewStatusEnum, ReviewStatusOptions } from "@/types/enum"; // Import Select components

import classNames from "classnames";

/**
 * Description: Khai báo columns cho table
 * Note:
 * accessorKey có value tương ứng với response data của api (phải ghi đúng để nó lấy được data ra)
 * header: Đơn giản chỉ là việc hiển thị tên column
 */
export const columns: ColumnDef<BeneficiaryType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
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
    header: "Trạng thái duyệt",
    cell: ({ row }) => {
      const verificationStatus =
        ReviewStatusEnum[
        row.original
          .verificationStatus as unknown as keyof typeof ReviewStatusEnum
        ];

      const statusOption = ReviewStatusOptions.find(
        (option) => option.value === verificationStatus
      );

      return (
        <div
          className={classNames("text-sm font-semibold", {
            "text-green-500": verificationStatus === ReviewStatusEnum.APPROVED,
            "text-red-500": verificationStatus === ReviewStatusEnum.REJECT,
            "text-yellow-500": verificationStatus === ReviewStatusEnum.WAITING,
          })}
        >
          {statusOption ? statusOption.label : row.original.verificationStatus}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
