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
import { useDeleteUserMutation, useResetUserPasswordMutation } from "@/queries/useUser";
import { UserType } from "@/schemas/user.schema";
import { Edit, Key, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CellActionProps {
  data: UserType;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const router = useRouter();

  const deleteUserMutation = useDeleteUserMutation();
  /**
   * Xử lý sự kiện delete user
   */
  const onDelete = async () => {
    try {
      console.log("delete");
      setLoading(true);
      await deleteUserMutation.mutateAsync(data.id);
      toast({
        description: "Xóa nguời dùng thành công",
        duration: 5000,
      });
    } catch (error: any) {
      handleErrorFromApi({ error });
    } finally {
      setLoading(false);
      setDeleteOpen(false);
    }
  };
  
  const resetPasswordMutation = useResetUserPasswordMutation();

  const onResetPassword = async () => {
    try {
      setLoading(true);
      await resetPasswordMutation.mutateAsync(data.id);
      toast({
        description: "Thay đổi mật khẩu người dùng thành công!",
        duration: 5000,
      });
    } catch (error: any) {
      handleErrorFromApi({ error });
    } finally {
      setLoading(false);
      setResetPasswordOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <AlertModal
        isOpen={resetPasswordOpen}
        onClose={() => setResetPasswordOpen(false)}
        onConfirm={onResetPassword}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Mở tùy chọn</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Hành động</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/user/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Cập nhật
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Xóa
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setResetPasswordOpen(true)}>
            <Key className="mr-2 h-4 w-4" /> Đổi mật khẩu
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
