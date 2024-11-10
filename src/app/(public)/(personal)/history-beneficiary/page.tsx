import { BeneficiaryUserTable } from "@/components/tables/beneficiary-user-tables/client";
import React from "react";
import { Suspense } from "react";

export default function page() {
  return (
    <div className="rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20">
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">
          Danh sách gửi nguyện vọng
        </h1>
        <div className="mt-1 text-sm text-gray-700">
          Lịch sử các nguyện vọng đã yêu cầu
        </div>
      </div>
      <div className="mt-8">
        <Suspense>
          {/* <DonationClient type="user" /> */}
          {/* <BeneficiaryClient /> */}
          <BeneficiaryUserTable />
        </Suspense>
      </div>
    </div>
  );
}
