import { z } from "zod";

export const NotificationSchema = z.object({
    id: z.number(),
    userId: z.number().nullable(),
    message: z.string(),
    isRead: z.boolean().default(false),
    createdAt: z.date()
})

export type NotificationType = z.TypeOf<typeof NotificationSchema>;