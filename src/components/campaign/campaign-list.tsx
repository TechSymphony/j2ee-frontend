import Campaign from "@/components/campaign/campaign";
import React from "react";
import { useGetCampaignListQuery } from "@/queries/useCampaign";


export default function CampaignList() {
  const { data: campaignListData } = useGetCampaignListQuery();
  const campaigns = campaignListData?.payload ?? [];
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {campaigns.map((campaign, index) => (
        <Campaign key={index} data={campaign} />
      ))}
    </div>
  );
}
