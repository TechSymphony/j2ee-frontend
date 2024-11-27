import campaignApi from "@/apis/campaign";
import { campaignQueryConfig } from "@/components/tables/campaign-tables/campaign-query-table";
import { UpdateCampaignBodyType } from "@/schemas/campaign.schema";
import { ReviewStatusEnum } from "@/types/enum";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCampaignListQuery = () => {
    return useQuery({
        queryKey: ["campaigns"],
        queryFn: campaignApi.getCampaignList,
        staleTime: 0,
        enabled: true,
    });
};

export const useGetCampaignClientListQuery = (
    queryConfig?: campaignQueryConfig
) => {
    return useQuery({
        queryKey: ["client-campaigns", queryConfig],
        queryFn: campaignApi.getCampaignClientList,
        staleTime: 0,
        enabled: true,
    });
};

export const useUpdateCampaignStatusShowMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, disabledAt }: { id: number; disabledAt: boolean }) => {
            // Fetch the current campaign data
            const campaign = await campaignApi.getCampaign(id);
            const currentCampaign = campaign.payload;
            // Update only the disabledAt field
            return campaignApi.updateCampaign(id, {
                ...currentCampaign,
                disabledAt: disabledAt,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["campaigns"],
            });
        },
    });
};

export const useUpdateCampaignStatusMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, status }: { id: number; status: ReviewStatusEnum }) => {
            // Fetch the current campaign data
            const campaign = await campaignApi.getCampaign(id);
            const currentCampaign = campaign.payload;
            // Update only the disabledAt field
            return campaignApi.updateCampaign(id, {
                ...currentCampaign,
                status: ReviewStatusEnum[status as keyof typeof ReviewStatusEnum],
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["campaigns"],
            });
        },
    });
};

export const useGetCampaignClientQuery = ({
    id,
    enabled,
}: {
    id: number;
    enabled: boolean;
}) => {
    return useQuery({
        queryKey: ["client-campaigns-detail", id],
        queryFn: () => campaignApi.getCampaignClient(id),
        enabled,
    });
}

export const useGetCampaignList = (queryConfig?: campaignQueryConfig) => {
    return useQuery({
        queryKey: ["campaigns", queryConfig],
        queryFn: campaignApi.getCampaignList,
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
        mutationFn: ({ id, formData }: { id: number, formData: FormData }) => {
            return campaignApi.updateCampaign(id, formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["campaigns"],
            });
        },
    });
};

export const useAddCampaignMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (body: FormData) => campaignApi.addCampaign(body),
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
