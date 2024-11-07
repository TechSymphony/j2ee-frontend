"use client";
import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
// import { Checkbox } from "@/components/ui/checkbox";
import { BeneficiaryType } from "@/schemas/beneficiary.schema";
import { ReviewStatusEnum, ReviewStatusOptions } from "@/types/enum";// Import Select components
import SelectBoxEnum from "@/components/ui/select-box-enum"; // Import the new component
import { toast } from "@/hooks/use-toast";
import { useRefetch } from "@/contexts/app-context";


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
      const [verificationStatus, setVerificationStatus] = useState<ReviewStatusEnum>(
        ReviewStatusEnum[row.original.verificationStatus as keyof typeof ReviewStatusEnum]
      );

      const { triggerRefetch } = useRefetch();

      const handleValueChange = async (value: ReviewStatusEnum) => {
        const apiURL = process.env.NEXT_PUBLIC_API_ENDPOINT;
        fetch(`${apiURL}/beneficiaries/${row.original.id}`, {
          method: "PUT",
          headers: {
            "Authorization": "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            situationDetail: row.original.situationDetail,
            supportReceived: row.original.supportReceived,
            verificationStatus: value,
          })
        }).then(res => res.json());

        // Update the state with the new value
        setVerificationStatus(value);

        //Show success toast
        toast({
          description: "Cập nhật trạng thái thành công",
        })
        // Trigger refetch
        triggerRefetch();
      };
      return (
        <SelectBoxEnum
          value={verificationStatus}
          options={ReviewStatusOptions}
          onValueChange={handleValueChange}
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
