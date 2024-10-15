import { Breadcrumbs } from "@/components/breadcrumbs";
import { CategoryForm } from "@/components/forms/category-form";
import PageContainer from "@/components/layout/page-container";
import React from "react";
const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Category", link: "/dashboard/category" },
  { title: "Create", link: "/dashboard/category/create" },
];
export default function Page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <CategoryForm />
      </div>
    </PageContainer>
  );
}
