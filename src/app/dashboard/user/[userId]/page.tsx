import { Breadcrumbs } from "@/components/breadcrumbs";
import { UserForm } from "@/components/forms/user-form";
import PageContainer from "@/components/layout/page-container";
import React from "react";
const breadcrumbItems = [
    { title: "Thống kê", link: "/dashboard" },
    { title: "Người dùng", link: "/dashboard/user" },
    { title: "Thêm mới", link: "/dashboard/user/create" },

];
export default function Page() {
    return (
        <PageContainer scrollable={true}>
            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems} />
                <UserForm />
            </div>
        </PageContainer>
    );
}
