import beneficiaryApi from "@/apis/beneficiary";
import { beneficiaryQueryConfig } from "@/components/tables/beneficiary-tables/beneficiary-query-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetBeneficiaryList = (queryConfig?: beneficiaryQueryConfig) => {
  return useQuery({
    queryKey: ["beneficiaries", queryConfig],
    queryFn: beneficiaryApi.getBeneficiaryList,
  });
};

export const useGetBeneficiaryQuery = ({
  id,
  enabled,
}: {
  id: number;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["beneficiaries-detail", id],
    queryFn: () => beneficiaryApi.getBeneficiary(id),
    enabled,
  });
};
