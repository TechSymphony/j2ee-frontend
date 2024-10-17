import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "User", link: "/dashboard/user" },
];
export default function page() {
  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        {/* Put client code here */}
      </div>
    </PageContainer>
  );
}
