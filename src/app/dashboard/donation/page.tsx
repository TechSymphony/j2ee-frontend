import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { DonationClient } from "@/components/tables/donation-tables/client";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Donation", link: "/dashboard/donation" },
];
export default function page() {
  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <DonationClient type="admin" />
      </div>
    </PageContainer>
  );
}
