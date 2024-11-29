import donationApi from "@/apis/donations";
import { QueryConfig } from "@/hooks/useQueryConfig";
import { ExportDonationBodyType } from "@/schemas/donation.schema";
import { ReviewDonationEnum } from "@/types/enum";
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

export const useGetMyDonationQuery = (id: number) => {
  return useQuery({
    queryKey: ["donation-detail", id],
    queryFn: () => donationApi.getMyDonation(id),
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
        queryKey: ["donations-detail"],
      });
    },
  });
};

export const useUpdateClientDonationMutation = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => donationApi.updateDonationClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["donations-detail", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["donations", "my-donations"],
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

export const useGetDonationStatisQuery = (queryConfig?: QueryConfig) => {
  return useQuery({
    queryKey: ["donation-statis", queryConfig],
    queryFn: donationApi.getDonationStatis,
  });
};

export const useUpdateDonationVerifyStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      donationStatus,
    }: {
      id: number;
      donationStatus: ReviewDonationEnum;
    }) => {
      // const donation = await donationApi.getDonation(id);
      // const currentDonation = donation.payload;

      return donationApi.updateDonationVerifyStatus(
        id,
        //   {
        //   ...currentDonation,
        //   donationStatus:
        //     ReviewDonationEnum[donationStatus as keyof typeof ReviewDonationEnum],
        // }
        {
          donationStatus:
            ReviewDonationEnum[
            donationStatus as unknown as keyof typeof ReviewDonationEnum
            ], // COMPLETED | CANCELLED
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["donations", "my-donations"],
      });
    },
  });
};

// mutationFn: async ({ id, verificationStatus }: { id: number; verificationStatus: ReviewStatusEnum }) => {
//   // Fetch the current beneficiary data
//   const beneficiary = await beneficiaryApi.getBeneficiary(id);
//   const currentBeneficiary = beneficiary.payload;
//   // Update only the verificationStatus field
//   return beneficiaryApi.updateBeneficiary(id, {
//     ...currentBeneficiary,
//     verificationStatus: ReviewStatusEnum[verificationStatus as keyof typeof ReviewStatusEnum],
//   });
// },
