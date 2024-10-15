import { Breadcrumbs } from "@/components/breadcrumbs";
import { CampaignForm } from "@/components/forms/campaign-form";
import PageContainer from "@/components/layout/page-container";
import React from "react";
const breadcrumbItems = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Campaign", link: "/dashboard/campaign" },
    { title: "Create", link: "/dashboard/campaign/create" },

];
export default function Page() {
    return (
        <PageContainer scrollable={true}>
            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems} />
                <CampaignForm />
            </div>
        </PageContainer>
    );
}