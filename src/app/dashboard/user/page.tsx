import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { UserClient } from "@/components/tables/user-tables/client";

const breadcrumbItems = [
  { title: "Thống kê", link: "/dashboard" },
  { title: "Người dùng", link: "/dashboard/user" },
];
export default function page() {
  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <UserClient />
      </div>
    </PageContainer>
  );
}
