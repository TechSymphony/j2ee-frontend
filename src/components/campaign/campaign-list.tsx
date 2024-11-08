import React, { useState, lazy, Suspense, useEffect } from "react";
import { useRefetch } from "@/contexts/app-context";
import { useGetCampaignListQuery } from "@/queries/useCampaign";
import { useRouter } from "next/navigation";
// import { CampaignType } from "@/schemas/campaign.schema";

const Campaign = lazy(() => import("@/components/campaign/campaign"));

export default function CampaignList() {
  const {
    data: campaignListData,
    isLoading,
    refetch,
  } = useGetCampaignListQuery(); // Sử dụng isLoading để theo dõi trạng thái tải
  const campaigns = campaignListData?.payload.content ?? [];
  const [visibleCount, setVisibleCount] = useState(6); // Mặc định hiển thị 6 campaign đầu tiên
  const [loading, setLoading] = useState(false); // Quản lý trạng thái tải dữ liệu

  const { setTriggerRefetch } = useRefetch();
  const router = useRouter();
  useEffect(() => {
    setTriggerRefetch(() => refetch);
  }, [refetch, setTriggerRefetch]);

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
            {campaigns &&
              campaigns
                .filter((campaign) => campaign.status === "APPROVED")
                .slice(0, visibleCount)
                .map((campaign, index) => (
                  <Suspense key={index} fallback={<div>Loading...</div>}>
                    <div
                      onClick={() => router.push(`/campaign/${campaign.id}`)}
                    >
                      <Campaign data={campaign} />
                    </div>
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
                {loading ? "Đang tải..." : "Xem thêm"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
