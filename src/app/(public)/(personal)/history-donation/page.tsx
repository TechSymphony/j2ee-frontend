import { DonationClient } from "@/components/tables/donation-tables/client";
import React from "react";
import { Suspense } from "react";

export default function page() {
  return (
    <div className="rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20">
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">
          Danh sách quyên góp
        </h1>
        <div className="mt-1 text-sm text-gray-700">
          Quản lý thông tin các chiến dịch đã quyên góp
        </div>
      </div>
      <div className="mt-8">
        <Suspense>
          <DonationClient type="user" />
        </Suspense>
      </div>
    </div>
  );
}
