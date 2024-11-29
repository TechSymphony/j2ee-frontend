"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUpdateClientDonationMutation } from "@/queries/useDonation";
import { handleErrorFromApi } from "@/lib/utils";

const PaymentSuccessPage: React.FC = () => {
  // Sử dụng useSearchParams để truy xuất các tham số từ URL
  const searchParams = useSearchParams();

  // Lấy các tham số từ URL
  const transactionNo = searchParams.get("vnp_TransactionNo");
  const transactionStatus = searchParams.get("vnp_TransactionStatus");
  const vnpTxnRef = searchParams.get("vnp_TxnRef");
  const updateMutationClient = useUpdateClientDonationMutation({
    id: Number(vnpTxnRef),
  });

  const sendEventPayment = async () => {
    try {
      await updateMutationClient.mutateAsync();
    } catch (error: any) {
      handleErrorFromApi({ error });
    }
  };

  // Kiểm tra thiếu dữ liệu
  const missingData =
    !transactionNo ||
    !transactionStatus ||
    transactionStatus != "00" ||
    !vnpTxnRef;

  React.useEffect(() => {
    const isProccessing =
      window.localStorage.getItem("donations-proccess-" + vnpTxnRef) ?? "";
    // only run 1 time
    if (!missingData && !updateMutationClient.isPending && !isProccessing) {
      window.localStorage.setItem("donations-proccess-" + vnpTxnRef, "true");
      sendEventPayment();
    }
  }, []);

  return (
    <div
      className="flex items-center justify-center p-4"
      style={{
        minHeight: "60vh",
      }}
    >
      <Card className="max-w-max w-full">
        <CardHeader>
          <CardTitle>
            Giao dịch {missingData ? "thất bại" : "thành công"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {missingData ? (
              transactionStatus == "02" ? (
                <>
                  <p>
                    Bạn sắp hoàn thành sự hỗ trợ rồi, nhớ quay lại hoàn tất
                    quyên góp nhé.
                    <br />
                    <i>1 gói khi đói bằng 1 gói khi no</i>
                  </p>
                </>
              ) : (
                <>
                  <p className="text-red-600">
                    Dường như có lỗi xảy ra. Vui lòng liên hệ tới nhân viên hỗ
                    trợ .
                  </p>
                </>
              )
            ) : (
              <>
                <p>Cảm ơn sự hỗ trợ của bạn!</p>
                <div className="space-y-2">
                  {/* Thông báo thời gian cập nhật kết quả */}
                  <p className="text-gray-600 mt-4">
                    Kết quả sẽ được cập nhật trong khoảng vài phút đến tối đa 30
                    phút. Chúng tôi trân trọng sự thông cảm và kiên nhẫn của
                    bạn.
                  </p>
                </div>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full hover:opacity-60" asChild>
            <Link href="/history-donation" target="_blank">
              Xem các chiến dịch bạn đã hỗ trợ
            </Link>
          </Button>
          <Button variant="secondary" className="w-full" asChild>
            <Link href="/" target="_blank">
              Về trang chủ
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
