import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { CampaignClient } from "@/components/tables/campaign-tables/client";

const breadcrumbItems = [
    { title: "Thống kê", link: "/dashboard" },
    { title: "Quản lý chiến dịch", link: "/dashboard/campaign" },
];
export default function page() {
    return (
        <PageContainer>
            <div className="space-y-2">
                <Breadcrumbs items={breadcrumbItems} />
                <CampaignClient />
            </div>
        </PageContainer>
    );
}