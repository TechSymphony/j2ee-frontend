import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { CategoryClient } from "@/components/tables/category-tables/client";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Category", link: "/dashboard/category" },
];
export default function page() {
  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <CategoryClient />
      </div>
    </PageContainer>
  );
}
