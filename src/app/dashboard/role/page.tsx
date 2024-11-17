import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { RoleClient } from "@/components/tables/role-tables/client";

const breadcrumbItems = [
  { title: "Thống kê", link: "/dashboard" },
  { title: "Chức vụ", link: "/dashboard/role" },
];
export default function page() {
  return (
    <PageContainer>
      <div className="space-y-5">
        <Breadcrumbs items={breadcrumbItems} />
        <RoleClient />
      </div>
    </PageContainer>
  );
}
