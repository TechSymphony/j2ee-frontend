import donationApi from "@/apis/donations";
// import { UpdateCampaignBodyType } from "@/schemas/campaign.schema";
import { useQuery } from "@tanstack/react-query";

export const useGetDonationListQuery = () => {
    return useQuery({
        queryKey: ["donations"],
        queryFn: donationApi.getDonationList,
        staleTime: 0,
        enabled: true,
    });
};


