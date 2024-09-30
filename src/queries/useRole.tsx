import roleApi from "@/apis/role";
import { UpdateRoleBodyType } from "@/schemas/role.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetRoleListQuery = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: roleApi.getRoleList,
    staleTime: 0,
    enabled: true,
  });
};

export const useGetRoleQuery = ({
  id,
  enabled,
}: {
  id: number;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["roles-detail", id],
    queryFn: () => roleApi.getRole(id),
    enabled,
  });
};

export const useUpdateRoleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: UpdateRoleBodyType & { id: number }) =>
      roleApi.updateRole(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
    },
  });
};

export const useGetPermissionListQuery = () => {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: roleApi.getPermissionList,
  });
};

export const useAddRoleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: roleApi.addRole,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
    },
  });
};

export const useDeleteRoleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: roleApi.deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
    },
  });
};
