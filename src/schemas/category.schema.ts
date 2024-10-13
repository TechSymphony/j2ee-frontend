import z from "zod";
import { PaginatedResponseSchema } from "./paginate.schema";

export const PermissionSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
});
const BaseCategorySchema = z.object({
    id: z.number(),
    name: z.string(),
});
type Category = z.infer<typeof BaseCategorySchema> & {
    parent?: Category;
};

const CategorySchema: z.ZodType<Category> = BaseCategorySchema.extend({
    parent: z.lazy(() => CategorySchema.optional()),
});

const PaginatedCategoryResponseSchema = PaginatedResponseSchema(CategorySchema);

export type CategoryType = z.TypeOf<typeof CategorySchema>;

export const CategoryListRes = z.array(CategorySchema);

export type CategoryListResType = z.TypeOf<typeof PaginatedCategoryResponseSchema>;

export const CategoryRes = z.object({

  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  permissions: z.array(PermissionSchema),

});

export type CategoryResType = z.TypeOf<typeof CategoryRes>;

export const CreateRoleBody = z
  .object({
    name: z.string().trim().min(1).max(256),
    parent: z.array(CategorySchema),
  })
  .strict();

export type CreateCategoryBodyType = z.TypeOf<typeof CreateRoleBody>;

export const UpdateCategoryBody = z
  .object({
    name: z.string().trim().min(2).max(256),
    description: z.string().min(2).max(256).optional(),
    permissions: z.array(PermissionSchema),
  })
  .strict();

export type UpdateRoleBodyType = z.TypeOf<typeof UpdateCategoryBody>;
