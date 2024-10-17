import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import React from "react";
const breadcrumbItems = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Campaign", link: "/dashboard/user" },
    { title: "Create", link: "/dashboard/user/create" },

];
export default function Page() {
    return (
        <PageContainer scrollable={true}>
            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems} />
                {/* Put the form here */}
            </div>
        </PageContainer>
    );
}
