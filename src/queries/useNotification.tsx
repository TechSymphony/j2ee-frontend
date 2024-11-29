import notificationApi from "@/apis/notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useGetNotificationListQuery = (username: string) => {
    return useQuery({
        queryKey: ["notifications", username],
        queryFn: () => notificationApi.getNotificationListByUsername(username),
        enabled: true,
    });
};

export const useUpdateNotificationAsRead = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => notificationApi.setNotificationAsRead(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notifications"],
            });
        },
    });
}