import donationApi from "@/apis/donations";
import { QueryConfig } from "@/hooks/useQueryConfig";
import { ExportDonationBodyType } from "@/schemas/donation.schema";
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

export const useGetTopListDonationQuery = ({
  id,
  enabled,
}: {
  id: number;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["top-donations", id],
    queryFn: () => donationApi.getTopListDonation(id),
    staleTime: 3600 * 3600,
    enabled,
  });
};

export const useGetNewListDonationQuery = ({
  id,
  enabled,
}: {
  id: number;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["new-donations", id],
    queryFn: () => donationApi.getNewDonationsList(id),
    staleTime: 3600 * 3600,
    enabled,
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
export const useExportDonationMutation = () => {
  return useMutation({
    mutationFn: ({ ...body }: ExportDonationBodyType) =>
      donationApi.exportDonationList(body),
  });
};
