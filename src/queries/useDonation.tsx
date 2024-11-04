import donationApi from "@/apis/donations";
import { QueryConfig } from "@/hooks/useQueryConfig";
// import { UpdateCampaignBodyType } from "@/schemas/campaign.schema";
import { useQuery } from "@tanstack/react-query";

export const useGetDonationListQuery = (queryConfig?: QueryConfig) => {
  return useQuery({
    queryKey: ["donations", queryConfig],
    queryFn: donationApi.getDonationList,
    staleTime: 0,
    enabled: true,
  });
};
export const useGetMyDonationListQuery = (queryConfig?: QueryConfig) => {
  return useQuery({
    queryKey: ["my-donations", queryConfig],
    queryFn: donationApi.getMyDonationList,
    staleTime: 0,
    enabled: true,
  });
};
