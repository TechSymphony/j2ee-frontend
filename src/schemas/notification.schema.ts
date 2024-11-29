import { z } from "zod";
import { UserSchema } from "./user.schema";

export const NotificationSchema = z.object({
    id: z.number(),
    user: UserSchema,
    message: z.string(),
    read: z.boolean().default(false),
    createdAt: z.date()
})

export type NotificationType = z.TypeOf<typeof NotificationSchema>;

export const NotificationListRes = z.array(NotificationSchema);

export type NotificationListResType = z.TypeOf<typeof NotificationListRes>;