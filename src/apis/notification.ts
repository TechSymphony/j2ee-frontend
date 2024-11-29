import http from "@/lib/http";
import { NotificationListResType } from "@/schemas/notification.schema";

const prefix = "/notifications";

const notificationApi = {
    getNotificationListByUsername: (username: string) => 
        http.get<NotificationListResType>(`${prefix}/${username}`),
    setNotificationAsRead: (id: number) => http.put(`${prefix}/read/${id}`, {}),
}

export default notificationApi;