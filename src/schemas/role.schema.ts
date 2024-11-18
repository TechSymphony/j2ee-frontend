import z from "zod";

export const PermissionSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
});

export type PermissionType = z.TypeOf<typeof PermissionSchema>;

export const PermissionListRes = z.array(PermissionSchema);

export type PermissionListResType = z.TypeOf<typeof PermissionListRes>;

export const RoleSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
});

export type RoleType = z.TypeOf<typeof RoleSchema>;

export const RoleListRes = z.array(RoleSchema);

export type RoleListResType = z.TypeOf<typeof RoleListRes>;

const optionsSchema = z.array(RoleSchema.extend({}));
export type RoleOptionsResType = z.TypeOf<typeof optionsSchema>;

export const RoleRes = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  permissions: z.array(PermissionSchema),
});

export type RoleResType = z.TypeOf<typeof RoleRes>;

export const CreateRoleBody = z
  .object({
    name: z.string().trim().min(2).max(256),
    description: z.string().min(2).max(256),
    permissions: z.array(PermissionSchema),
  })
  .strict();

export type CreateRoleBodyType = z.TypeOf<typeof CreateRoleBody>;

export const UpdateRoleBody = z
  .object({
    name: z.string().trim().min(2).max(256),
    description: z.string().min(2).max(256).optional(),
    permissions: z.array(PermissionSchema),
  })
  .strict();

export type UpdateRoleBodyType = z.TypeOf<typeof UpdateRoleBody>;
