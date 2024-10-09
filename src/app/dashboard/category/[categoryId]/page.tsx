import { Breadcrumbs } from "@/components/breadcrumbs";
import { RoleForm } from "@/components/forms/role-form";
import PageContainer from "@/components/layout/page-container";
import React from "react";
const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Role", link: "/dashboard/role" },
  { title: "Create", link: "/dashboard/role/create" },
];
export default function Page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <RoleForm />
      </div>
    </PageContainer>
  );
}
