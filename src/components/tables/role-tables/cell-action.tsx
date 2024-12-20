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
import { useDeleteRoleMutation } from "@/queries/useRole";
import { RoleType } from "@/schemas/role.schema";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CellActionProps {
  data: RoleType;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const deleteRoleMutation = useDeleteRoleMutation();
  /**
   * Xử lý sự kiện delete role
   */
  const onDelete = async () => {
    try {
      setLoading(true);
      await deleteRoleMutation.mutateAsync(data.id);
      toast({
        description: "Xóa vai trò thành công",
        duration: 5000,
      });
    } catch (error: any) {
      handleErrorFromApi({ error });
    } finally {
      setLoading(false);
      setOpen(false);
    }
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
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Hành động</DropdownMenuLabel>
          {data && data.name !== "admin" ? (
            <>
              <DropdownMenuItem
                onClick={() => router.push(`/dashboard/role/${data.id}`)}
              >
                <Edit className="mr-2 h-4 w-4" /> Cập nhật
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash className="mr-2 h-4 w-4" /> Xóa
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem
              onClick={() => router.push(`/dashboard/role/${data.id}`)}
            >
              <Eye className="mr-2 h-4 w-4" /> Đọc
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
