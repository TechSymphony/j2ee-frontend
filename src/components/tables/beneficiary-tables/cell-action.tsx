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
import { toast } from "@/hooks/use-toast";
import { handleErrorFromApi } from "@/lib/utils";
import { BeneficiaryType } from "@/schemas/beneficiary.schema";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

  const onDelete = async function () {};

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

          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/beneficiary/${data.id}`)}
          >
            <Eye className="mr-2 h-4 w-4" /> Hiển thị
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/beneficiary/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Cập nhật
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
