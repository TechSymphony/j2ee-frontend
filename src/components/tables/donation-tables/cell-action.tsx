"use client";
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
import { DonationType } from "@/schemas/donation.schema";
import { ReviewDonationEnum } from "@/types/enum";
import { Eye, MoreHorizontal, Check, X } from "lucide-react";
import { useState } from "react";
import DonationDetailDialog from "./donation-detail-dialog";
import { useUpdateDonationVerifyStatus } from "@/queries/useDonation";

interface CellActionProps {
  data: DonationType;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const updateDonationVerifyStatus = useUpdateDonationVerifyStatus();

  const onCompleted = async () => {
    try {
      if (updateDonationVerifyStatus.isPending) return;
      // const formData = new FormData();

      await updateDonationVerifyStatus.mutateAsync({
        id: data.id,
        donationStatus: ReviewDonationEnum.COMPLETED,
      });
      toast({
        description: "Cập nhật thành công",
      });
    } catch (error: any) {
      handleErrorFromApi({ error });
    } finally {
      setOpen(false);
    }
  };
  const onCanceled = async () => {
    try {
      if (updateDonationVerifyStatus.isPending) return;
      // const formData = new FormData();

      await updateDonationVerifyStatus.mutateAsync({
        id: data.id,
        donationStatus: ReviewDonationEnum.CANCELLED,
      });
      toast({
        description: "Cập nhật thành công",
      });
    } catch (error: any) {
      handleErrorFromApi({ error });
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Hành động</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Eye className="mr-2 h-4 w-4" /> Hiển thị
          </DropdownMenuItem>
          {data.isAbleToPreview && (
            <>
              <DropdownMenuItem onClick={onCompleted}>
                <Check className="mr-2 h-4 w-4" /> Chấp nhận
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onCanceled}>
                <X className="mr-2 h-4 w-4" /> Từ chối
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DonationDetailDialog
        open={open}
        onOpenChange={setOpen}
        donationId={data.id}
      />
    </>
  );
};
