import beneficiaryApi from "@/apis/beneficiary";
import { QueryConfig } from "@/hooks/useQueryConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetBeneficiaryList = (queryConfig?: QueryConfig) => {
    return useQuery({
        queryKey: ["beneficiaries", queryConfig],
        queryFn: beneficiaryApi.getBeneficiaryList,
    });
};

export const useGetBeneficiaryQuery = ({ id, enabled }: { id: number; enabled: boolean }) => {
    return useQuery({
        queryKey: ["beneficiaries-detail", id],
        queryFn: () => beneficiaryApi.getBeneficiary(id),
        enabled,
    })
}