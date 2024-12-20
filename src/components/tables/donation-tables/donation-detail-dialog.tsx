import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetDonationQuery, useGetMyDonationQuery } from "@/queries/useDonation";
import { ReviewDonationEnum, ReviewDonationOptions } from "../../../types/enum";
import Component from "@/app/loading";

interface DonationDetailDialogProps {
  open: boolean;
  donationId: number;
  onOpenChange: (open: boolean) => void;
  isAdmin: boolean;
}
export function DonationDetailDialog({
  open,
  onOpenChange,
  donationId,
  isAdmin,
}: DonationDetailDialogProps) {
  // Dữ liệu quyên góp nhận được

  if (!open) {
    return <></>;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading } = isAdmin
    ? useGetDonationQuery(donationId)
    : useGetMyDonationQuery(donationId);

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thông Tin Quyên Góp</DialogTitle>
            <DialogDescription>
              Dưới đây là các thông tin chi tiết về quyên góp của bạn. Cảm ơn sự
              hỗ trợ của bạn!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Thông tin người quyên góp */}
            <div className="flex items-center justify-center h-full">
              <div className="w-12 h-12 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  const donationInfo = data?.payload;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thông Tin Quyên Góp</DialogTitle>
          <DialogDescription>
            Dưới đây là các thông tin chi tiết về quyên góp của bạn. Cảm ơn sự
            hỗ trợ của bạn!
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* Thông tin người quyên góp */}
          <div>
            <strong>Tên người quyên góp:</strong>{" "}
            {donationInfo?.donor?.fullName}
          </div>
          <div>
            <strong>Email:</strong> {donationInfo?.donor?.email}
          </div>
          <div>
            <strong>Số điện thoại:</strong> {donationInfo?.donor?.phone}
          </div>

          {/* Thông tin chiến dịch */}
          <div>
            <strong>Tên chiến dịch:</strong> {donationInfo?.campaign.name}
          </div>
          <div>
            <strong>Mã chiến dịch:</strong> {donationInfo?.campaign.code}
          </div>

          {/* Thông tin quyên góp */}
          <div>
            <strong>Số tiền quyên góp:</strong>{" "}
            {(donationInfo?.amountTotal ?? 0 / 100).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </div>
          <div>
            <strong>Ngày quyên góp:</strong> {donationInfo?.donationDate}
          </div>
          {/* <div>
            <strong>Tần suất:</strong>{" "}
            {donationInfo?.frequency === "ONCE" ? "Một lần" : "Định kỳ"}
          </div> */}
          <div>
            <strong>Trạng thái:</strong>{" "}
            {donationInfo?.status
              ? ReviewDonationOptions[ReviewDonationEnum[donationInfo.status]]
                ?.label
              : "Không rõ"}
          </div>

          {/* Thông điệp quyên góp */}
          <div>
            <strong>Thông điệp:</strong> {donationInfo?.message}
          </div>
        </div>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DonationDetailDialog;
