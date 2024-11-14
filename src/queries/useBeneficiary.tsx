import beneficiaryApi from "@/apis/beneficiary";
import { beneficiaryQueryConfig } from "@/components/tables/beneficiary-tables/beneficiary-query-table";
import {
  UpdateBeneficiaryBodyType,
  UpdateMyBeneficiaryBodyType,
} from "@/schemas/beneficiary.schema";
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
    staleTime: 3600 * 3600,
    enabled,
  });
};

export const useUpdateBeneficiary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      verificationStatus,
    }: UpdateBeneficiaryBodyType & { id: number }) =>
      beneficiaryApi.updateBeneficiary(id, { verificationStatus }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["beneficiaries"],
      });
    },
  });
};

export const useGetUserBeneficiaryQuery = ({
  id,
  enabled,
}: {
  id: number;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["user-beneficiary", id],
    queryFn: () => beneficiaryApi.getUserBeneficiary(id),
    staleTime: 3600 * 3600,
    enabled,
  });
};


export const useGetMyBeneficiaryListQuery = (
  queryConfig?: beneficiaryQueryConfig
) => {
  return useQuery({
    queryKey: ["my-beneficiaries", queryConfig],
    queryFn: beneficiaryApi.getMyBeneficiaryList,
    staleTime: 0,
    enabled: true,
  });
};

export const useUpdateMyBeneficiaryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: number;
      body: UpdateMyBeneficiaryBodyType;
    }) => beneficiaryApi.updateMyBeneficiary(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-beneficiaries"],
      });
    },
  });
};

export const useDeleteMyBeneficiaryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: beneficiaryApi.deleteMyBeneficiary,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-beneficiaries"],
      });
    },
  });
};
export const useCreateBeneficiary = () => {
  return useMutation({
    mutationFn: beneficiaryApi.createUserBeneficiary,
  });
};
