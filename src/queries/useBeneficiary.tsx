import beneficiaryApi from "@/apis/beneficiary";
import { UpdateBeneficiaryBodyType } from "@/schemas/beneficiary.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetBeneficiaryList = () => {
    return useQuery({
        queryKey: ["beneficiaries"],
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