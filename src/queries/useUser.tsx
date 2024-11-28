import userApi from "@/apis/user";
import { QueryConfig } from "@/hooks/useQueryConfig";
import {
  ChangePasswordBodyType,
  UpdateUserBodyType,
} from "@/schemas/user.schema";
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

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: userApi.getMe,
  });
};

export const useUpdateMeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
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
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: (body: ChangePasswordBodyType) => userApi.changePassword(body),
  });
};

export const useImportStudentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.importStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};

export const useUpdateUserStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, enabled }: {id: number; enabled: boolean}) => {
      const user = await userApi.getUser(id);
      const currentUser = user.payload;
      return userApi.updateUser(id, {...currentUser, enabled: enabled});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};

export const useUpdateUserIsStudentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, isStudent }: {id: number; isStudent: boolean}) => {
      const user = await userApi.getUser(id);
      const currentUser = user.payload;
      return userApi.updateUser(id, {...currentUser, isStudent: isStudent});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};