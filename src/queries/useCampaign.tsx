import campaignApi from "@/apis/campaign";
import { UpdateCampaignBodyType } from "@/schemas/campaign.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCampaignListQuery = () => {
    return useQuery({
        queryKey: ["campaigns"],
        queryFn: campaignApi.getCampaignList,
        staleTime: 0,
        enabled: true,
    });
};

export const useGetCampaignQuery = ({
    id,
    enabled,
}: {
    id: number;
    enabled: boolean;
}) => {
    return useQuery({
        queryKey: ["campaigns-detail", id],
        queryFn: () => campaignApi.getCampaign(id),
        enabled,
    });
};

export const useUpdateCampaignMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...body }: UpdateCampaignBodyType & { id: number }) =>
            campaignApi.updateCampaign(id, body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["campaigns"],
            });
        },
    });
};

export const useGetBeneficiaryListQuery = () => {
    return useQuery({
        queryKey: ["beneficiaries"],
        queryFn: campaignApi.getBeneficiaryList,
    });
};

export const useAddCampaignMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: campaignApi.addCampaign,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["campaigns"],
            });
        },
    });
};

export const useDeleteCampaignMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: campaignApi.deleteCampaign,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["campaigns"],
            });
        },
    });
};
