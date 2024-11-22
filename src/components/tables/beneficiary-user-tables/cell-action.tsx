"use client";
import BeneficiaryClientPopup from "@/components/modal/popup-beneficiary-client";
// import EditBeneficiary from "@/app/(public)/(personal)/history-beneficiary/edit-beneficiary";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { handleErrorFromApi } from "@/lib/utils";
import { useDeleteMyBeneficiaryMutation } from "@/queries/useBeneficiary";
import { BeneficiaryType } from "@/schemas/beneficiary.schema";
import { ReviewStatusEnum } from "@/types/enum";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CellActionProps {
  data: BeneficiaryType;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState<"create" | "edit" | "show">("show");
  const [id, setId] = useState<number | undefined>(undefined);


  const router = useRouter();

  const deleteMyBeneficiaryMutation = useDeleteMyBeneficiaryMutation();
  /**
   * Xử lý sự kiện delete role
   */
  const onDelete = async () => {
    try {
      setLoading(true);
      await deleteMyBeneficiaryMutation.mutateAsync(data.id);
      toast({
        description: "Xóa nguyện vọng thành công",
      });
    } catch (error: any) {
      handleErrorFromApi({ error });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };


  const handleShow = () => {
    setPopupMode("show");
    setId(data.id);
    setPopupOpen(true);
  };

  const handleEdit = () => {
    setPopupMode("edit");
    setId(data.id);
    setPopupOpen(true);
  };

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

          {ReviewStatusEnum[
            data.verificationStatus as unknown as keyof typeof ReviewStatusEnum
          ] === ReviewStatusEnum.APPROVED && (
              <DropdownMenuItem onClick={handleShow}>
                <Eye className="mr-2 h-4 w-4" /> Hiển thị
              </DropdownMenuItem>
            )}
          {/* Chỉ hiển thị nút "Update" khi trạng thái không phải "WAITING" */}
          {ReviewStatusEnum[
            data.verificationStatus as unknown as keyof typeof ReviewStatusEnum
          ] === ReviewStatusEnum.WAITING && (
              <DropdownMenuItem
                // onClick={() => router.push(`/dashboard/campaign/${data.id}`)}
                onClick={handleEdit}
              >
                <Edit className="mr-2 h-4 w-4" /> Cập nhật
              </DropdownMenuItem>
            )}
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <BeneficiaryClientPopup
        id={id}
        setId={setId}
        mode={popupMode}
        open={popupOpen}
        setOpen={setPopupOpen}
      />
      {/* <EditBeneficiary id={id} setId={setId} /> */}
    </>
  );
};
