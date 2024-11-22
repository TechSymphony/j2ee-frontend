import { z } from "zod";
import { UserSchema } from "./user.schema";

export const NotificationSchema = z.object({
    id: z.number(),
    user: UserSchema,
    message: z.string(),
    isRead: z.boolean().default(false),
    createdAt: z.date()
})

export type NotificationType = z.TypeOf<typeof NotificationSchema>;