"use client";
import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { BeneficiaryType } from "@/schemas/beneficiary.schema";
import { ReviewStatusEnum, ReviewStatusOptions } from "@/types/enum";
import SelectBoxEnum from "@/components/ui/select-box-enum";
import { toast } from "@/hooks/use-toast";
import { useRefetch } from "@/contexts/app-context";
import Popup from "@/components/modal/popup";
import { useBeneficiary } from "@/contexts/beneficiary-context";

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
      const [verificationStatus, setVerificationStatus] =
        useState<ReviewStatusEnum>(
          ReviewStatusEnum[
          row.original.verificationStatus as keyof typeof ReviewStatusEnum
          ]
        );

      const { triggerRefetch } = useRefetch();
      const [isOpenPopup, setIsOpenPopup] = useState(false);
      const { setBeneficiary } = useBeneficiary();

      const handleValueChange = async (value: ReviewStatusEnum) => {
        const apiURL = process.env.NEXT_PUBLIC_API_ENDPOINT;
        fetch(`${apiURL}/beneficiaries/${row.original.id}`, {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            situationDetail: row.original.situationDetail,
            supportReceived: row.original.supportReceived,
            verificationStatus: value,
          }),
        }).then((res) => res.json());

        setVerificationStatus(value);
        toast({
          description: "Cập nhật trạng thái thành công",
        })
        // Trigger refetch
        triggerRefetch();

        if (value === ReviewStatusEnum.APPROVED) {
          setBeneficiary(row.original);
          setIsOpenPopup(true);
        }
      };

      return (
        <>
          <SelectBoxEnum
            value={verificationStatus}
            options={ReviewStatusOptions}
            onValueChange={handleValueChange}
          />
          {isOpenPopup && (
            <Popup
              isOpenPopup={isOpenPopup}
              setIsOpenPopup={setIsOpenPopup}
            />
          )}
        </>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];