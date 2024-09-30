import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { RoleClient } from "@/components/tables/role-tables/client";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Role", link: "/dashboard/role" },
];
export default function page() {
  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <RoleClient />
      </div>
    </PageContainer>
  );
}
