import React, { useState, lazy, Suspense } from "react";
import { useGetCampaignListQuery } from "@/queries/useCampaign";

const Campaign = lazy(() => import("@/components/campaign/campaign"));

export default function CampaignList() {
  const { data: campaignListData, isLoading } = useGetCampaignListQuery(); // Sử dụng isLoading để theo dõi trạng thái tải
  const campaigns = campaignListData?.payload ?? [];
  const [visibleCount, setVisibleCount] = useState(6); // Mặc định hiển thị 6 campaign đầu tiên
  const [loading, setLoading] = useState(false); // Quản lý trạng thái tải dữ liệu


  /**
   * Tăng số lượng hiển thị của chiến dịch và hiển thị thêm chiến dịch
   */
  const loadMoreCampaigns = () => {
    if (!loading) {
      setLoading(true);
      setVisibleCount((prevCount) => prevCount + 6);
      setLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? ( // Nếu dữ liệu đang được tải thì hiển thị Loading
        <div>Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {campaigns
              .filter((campaign) => campaign.status === "APPROVED")
              .slice(0, visibleCount)
              .map((campaign, index) => (
                console.log(campaign),
                <Suspense key={index} fallback={<div>Loading...</div>}>
                  <Campaign data={campaign} />
                </Suspense>
              ))}
          </div>
          {visibleCount < campaigns.length && (
            <div className="flex justify-center mt-5">
              <button
                onClick={loadMoreCampaigns}
                className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
                disabled={loading} // Vô hiệu hóa nút khi đang tải
              >
                {loading ? 'Đang tải...' : 'Xem thêm'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
