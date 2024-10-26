import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { BeneficiaryClient } from "@/components/tables/beneficiary-tables/client";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Beneficiary", link: "/dashboard/beneficiary" },
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
