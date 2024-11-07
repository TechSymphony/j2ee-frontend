import Beneficiary from "@/components/beneficiary/beneficiary";
import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import React from "react";
const breadcrumbItems = [
  { title: "Thống kê", link: "/dashboard" },
  { title: "Người thụ hưởng", link: "/dashboard/beneficiary" },
  { title: "Xem thông tin", link: "/dashboard/beneficiary/view" },
];

export default function Page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <Beneficiary />
      </div>
    </PageContainer>
  );
}
