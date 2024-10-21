import Campaign from "@/components/campaign/campaign";
import React, { useState } from "react";
import { useGetCampaignListQuery } from "@/queries/useCampaign";

export default function CampaignList() {
  const { data: campaignListData } = useGetCampaignListQuery();
  const campaigns = campaignListData?.payload ?? [];
  const [visibleCount, setVisibleCount] = useState(6);


  /**
  * Tăng số lượng hiển thị của chiến dịch và hiển thị thêm chiến dịch
  */
  const loadMoreCampaigns = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.slice(0, visibleCount).map((campaign, index) => (
          <Campaign key={index} data={campaign} />
        ))}
      </div>
      {visibleCount < campaigns.length && (
        <div className="flex justify-center mt-5">
          <button
            onClick={loadMoreCampaigns}
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
          >
            Xem thêm
          </button>
        </div>
      )}
    </div>
  );
}
