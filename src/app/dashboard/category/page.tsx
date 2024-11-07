import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { CategoryClient } from "@/components/tables/category-tables/client";

const breadcrumbItems = [
  { title: "Thống kê", link: "/dashboard" },
  { title: "Danh mục", link: "/dashboard/category" },
];
export default function page() {
  return (
    <PageContainer>
      <div className="space-y-5">
        <Breadcrumbs items={breadcrumbItems} />
        <CategoryClient />
      </div>
    </PageContainer>
  );
}
