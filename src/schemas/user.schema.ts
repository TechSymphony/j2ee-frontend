import z from "zod";
import { RoleSchema } from "./role.schema";

export const UserSchema = z.object({
    id: z.number(),
    fullName: z.string(),
    email: z.string(),
    phone: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
    role: RoleSchema,
});

export type UserType = z.TypeOf<typeof UserSchema>;

export const UserListRes = z.array(UserSchema);

export type UserListResType = z.TypeOf<typeof UserListRes>;

export const UserRes = z.object({
    id: z.number(),
    fullName: z.string(),
    email: z.string(),
    phone: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
    role: RoleSchema,
});

export type UserResType = z.TypeOf<typeof UserRes>;

export const CreateUserBody = z
    .object({
        fullName: z.string().trim().min(2).max(256),
        email: z.string().trim().min(2).max(256).email(),
        username: z.string().trim().min(2).max(256).optional(),
        phone: z.string().trim().min(2).max(256),
        role: RoleSchema,
    })
    .strict();

export type CreateUserBodyType = z.TypeOf<typeof CreateUserBody>;

export const ResetUserPasswordBody = z.object({}).strict();
export type ResetUserPasswordBodyType = z.TypeOf<typeof ResetUserPasswordBody>;

export const UpdateUserBody = z
    .object({
        fullName: z.string().trim().min(2).max(256),
        email: z.string().trim().min(2).max(256).email(),
        username: z.string().trim().min(2).max(256).optional(),
        phone: z.string().trim().min(2).max(256),
        role: RoleSchema,
    })
    .strict();

export type UpdateUserBodyType = z.TypeOf<typeof UpdateUserBody>;
