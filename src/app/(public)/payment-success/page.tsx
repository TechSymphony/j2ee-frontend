"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import classNames from "classnames";

const PaymentSuccessPage: React.FC = () => {
  // Sử dụng useSearchParams để truy xuất các tham số từ URL
  const searchParams = useSearchParams();

  // Lấy các tham số từ URL
  const amount = searchParams.get("vnp_Amount");
  const bankCode = searchParams.get("vnp_BankCode");
  const bankTranNo = searchParams.get("vnp_BankTranNo");
  const cardType = searchParams.get("vnp_CardType");
  const orderInfo = searchParams.get("vnp_OrderInfo");
  const payDate = searchParams.get("vnp_PayDate");
  const responseCode = searchParams.get("vnp_ResponseCode");
  const transactionNo = searchParams.get("vnp_TransactionNo");
  const transactionStatus = searchParams.get("vnp_TransactionStatus");

  // Kiểm tra thiếu dữ liệu
  const missingData =
    !amount ||
    !bankCode ||
    !bankTranNo ||
    !cardType ||
    !orderInfo ||
    !payDate ||
    !responseCode ||
    !transactionNo ||
    !transactionStatus;

  // Định dạng ngày thanh toán
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    const hours = dateString.slice(8, 10);
    const minutes = dateString.slice(10, 12);
    const seconds = dateString.slice(12, 14);
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div
      className="flex items-center justify-center p-4"
      style={{
        minHeight: "60vh",
      }}
    >
      <Card className="max-w-max w-full">
        <CardHeader>
          <CardTitle>Thanh Toán Thành Công</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {missingData ? (
              <p className="text-red-600">
                Một số thông tin thanh toán bị thiếu. Vui lòng kiểm tra lại liên
                kết hoặc liên hệ hỗ trợ.
              </p>
            ) : (
              <>
                <p>
                  Cảm ơn bạn đã thanh toán! Giao dịch của bạn đã thành công.
                </p>
                <div className="space-y-2">
                  <div>
                    <strong>Số tiền thanh toán:</strong>{" "}
                    {(Number(amount) / 100).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </div>
                  <div>
                    <strong>Mã ngân hàng:</strong> {bankCode}
                  </div>
                  <div>
                    <strong>Mã giao dịch ngân hàng:</strong> {bankTranNo}
                  </div>
                  <div>
                    <strong>Loại thẻ:</strong> {cardType}
                  </div>
                  <div>
                    <strong>Thông tin đơn hàng:</strong>{" "}
                    {decodeURIComponent(orderInfo || "")}
                  </div>
                  <div>
                    <strong>Ngày thanh toán:</strong> {formatDate(payDate)}
                  </div>
                  <div>
                    <strong>Mã phản hồi:</strong> {responseCode}
                  </div>
                  <div>
                    <strong>Mã giao dịch:</strong> {transactionNo}
                  </div>
                  <div>
                    <strong>Trạng thái giao dịch:</strong>{" "}
                    {transactionStatus === "00" ? "Thành công" : "Thất bại"}
                  </div>
                  {/* Thông báo thời gian cập nhật kết quả */}
                  <p className="text-gray-600 mt-4">
                    Kết quả sẽ được cập nhật trong khoảng vài phút đến tối đa 30
                    phút. Chúng tôi trân trọng sự thông cảm và kiên nhẫn của quý
                    khách.
                  </p>
                </div>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full hover:opacity-60" asChild>
            <Link href="/history-donation" target="_blank">
              Xem trạng thái của đơn thanh toán
            </Link>
          </Button>
          <Button variant="secondary" className="w-full" asChild>
            <Link href="/" target="_blank">
              Về Trang Chủ
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
