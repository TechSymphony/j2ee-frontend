import Beneficiary from "@/components/beneficiary/beneficiary";
import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import React from "react";
const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Beneficiary", link: "/dashboard/beneficiary" },
  { title: "View", link: "/dashboard/beneficiary/view" },
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
