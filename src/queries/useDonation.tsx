import donationApi from "@/apis/donations";
import { QueryConfig } from "@/hooks/useQueryConfig";
// import { UpdateCampaignBodyType } from "@/schemas/campaign.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetDonationListQuery = (queryConfig?: QueryConfig) => {
  return useQuery({
    queryKey: ["donations", queryConfig],
    queryFn: donationApi.getDonationList,
    staleTime: 0,
    enabled: true,
  });
};

export const useGetDonationQuery = (id: number) => {
  return useQuery({
    queryKey: ["donation-detail", id],
    queryFn: () => donationApi.getDonation(id),
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

export const useAddDonationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: donationApi.addDonation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["campaigns-detail"],
      });
    },
  });
};
