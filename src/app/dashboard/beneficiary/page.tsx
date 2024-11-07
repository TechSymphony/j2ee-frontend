import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { BeneficiaryClient } from "@/components/tables/beneficiary-tables/client";

const breadcrumbItems = [
  { title: "Thống kê", link: "/dashboard" },
  { title: "Người thụ hưởng", link: "/dashboard/beneficiary" },
];
export default function page() {
  return (
    <PageContainer>
      <div className="space-y-5">
        <Breadcrumbs items={breadcrumbItems} />
        <BeneficiaryClient />
      </div>
    </PageContainer>
  );
}
