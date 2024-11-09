import userApi from "@/apis/user";
import { QueryConfig } from "@/hooks/useQueryConfig";
import { UpdateUserBodyType } from "@/schemas/user.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetUserListQuery = (queryConfig?: QueryConfig) => {
    return useQuery({
        queryKey: ["users", queryConfig],
        queryFn: userApi.getUserList,
        staleTime: 0,
        enabled: true,
    });
};

export const useGetUserQuery = ({
    id,
    enabled,
}: {
    id: number;
    enabled: boolean;
}) => {
    return useQuery({
        queryKey: ["users-detail", id],
        queryFn: () => userApi.getUser(id),
        enabled,
    });
};

export const useUpdateUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...body }: UpdateUserBodyType & { id: number }) =>
            userApi.updateUser(id, body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });
};

export const useGetRoleListQuery = () => {
    return useQuery({
        queryKey: ["roles"],
        queryFn: userApi.getRoleList,
    });
};

export const useAddUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: userApi.addUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });
};

export const useDeleteUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: userApi.deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });
};

export const useResetUserPasswordMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => userApi.resetPassword(id, {}),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });
}