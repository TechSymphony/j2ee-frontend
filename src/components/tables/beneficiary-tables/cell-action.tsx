"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BeneficiaryType } from "@/schemas/beneficiary.schema";
import { Eye, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ReviewStatusEnum } from "@/types/enum";


interface CellActionProps {
  data: BeneficiaryType;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  //   const deleteBeneficiaryMutation = useDeleteBeneficiaryMutation();
  //   /**
  //    * Xử lý sự kiện delete role
  //    */
  //   const onDelete = async () => {
  //     try {
  //       console.log("delete");
  //       setLoading(true);
  //       await deleteBeneficiaryMutation.mutateAsync(data.id);
  //       toast({
  //         description: "Xóa vai trò thành công",
  //         duration: 5000,
  //       });
  //     } catch (error: any) {
  //       handleErrorFromApi({ error });
  //     } finally {
  //       setLoading(false);
  //       setOpen(false);
  //     }
  //   };

  const onDelete = async function () { };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Hành động</DropdownMenuLabel>

          {(ReviewStatusEnum[
            data.verificationStatus as unknown as keyof typeof ReviewStatusEnum
          ] === ReviewStatusEnum.APPROVED ||
            ReviewStatusEnum[
            data.verificationStatus as unknown as keyof typeof ReviewStatusEnum
            ] === ReviewStatusEnum.WAITING) && (
              <DropdownMenuItem
                onClick={() => router.push(`/dashboard/beneficiary/${data.id}`)}
              >
                <Eye className="mr-2 h-4 w-4" /> Hiển thị
              </DropdownMenuItem>
            )}
          {ReviewStatusEnum[
            data.verificationStatus as unknown as keyof typeof ReviewStatusEnum
          ] === ReviewStatusEnum.REJECT && (
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash className="mr-2 h-4 w-4" /> Xóa
              </DropdownMenuItem>
            )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
