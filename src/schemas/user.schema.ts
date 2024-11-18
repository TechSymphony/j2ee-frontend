import z from "zod";
import { RoleSchema } from "./role.schema";

export const BasicUserSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  username: z.string(),
  email: z.string(),
  phone: z.string().optional(),
});

export const UserSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  role: RoleSchema.nullish(),
  username: z.string(),
  isStudent: z.boolean(),
});

export type UserType = z.TypeOf<typeof UserSchema>;

export const UserListRes = z.array(UserSchema);

export type UserListResType = z.TypeOf<typeof UserListRes>;

export const BasicUserRes = z.object({
  id: z.number(),
  fullName: z.string(),
  email: z.string(),
  phone: z.string().optional(),
});
export type BasicUserResType = z.TypeOf<typeof BasicUserRes>;

export const UserRes = BasicUserRes.extend({
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

export const UpdateBasicUserBody = z
  .object({
    fullName: z.string().trim().min(2).max(256),
    email: z.string().trim().min(2).max(256).email(),
    phone: z.string().trim().min(2).max(256).optional(),
  })
  .strict();

export type UpdateBasicUserBodyType = z.TypeOf<typeof UpdateBasicUserBody>;

export const UpdateUserBody = UpdateBasicUserBody.extend({
  username: z.string().trim().min(2).max(256).optional(),
  role: RoleSchema,
}).strict();
export type UpdateUserBodyType = z.TypeOf<typeof UpdateUserBody>;

export const ResetUserPasswordBody = z.object({}).strict();
export type ResetUserPasswordBodyType = z.TypeOf<typeof ResetUserPasswordBody>;

export const ChangePasswordBody = z
  .object({
    currentPassword: z.string().min(6).max(100),
    newPassword: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
  })
  .strict()
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });

export type ChangePasswordBodyType = z.TypeOf<typeof ChangePasswordBody>;
export const ImportStudentBody = z.object({
  file: typeof window === "undefined" ? z.any() : z.instanceof(FileList),
});

export type ImportStudentBodyType = z.TypeOf<typeof ImportStudentBody>;
