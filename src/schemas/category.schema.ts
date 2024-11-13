import z from "zod";
import { PaginatedResponseSchema } from "./paginate.schema";

const BaseCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type Category = z.infer<typeof BaseCategorySchema> & {
  parent?: Category;
};

export type CategoryMenu = z.infer<typeof BaseCategorySchema> & {
  children?: CategoryMenu[];
};

export const CategorySchema: z.ZodType<Category> = BaseCategorySchema.extend({
  parent: z.lazy(() => CategorySchema.optional()),
});

export type CategoryResType = z.TypeOf<typeof CategorySchema>;

const PaginatedCategoryResponseSchema = PaginatedResponseSchema(CategorySchema);

export const CategoryListRes = z.array(CategorySchema);

export type CategoryListResType = z.TypeOf<
  typeof PaginatedCategoryResponseSchema
>;

// export const CategoryRes = z.object({
//   id: z.number(),
//   name: z.string(),
//   description: z.string().optional(),
//   permissions: z.array(PermissionSchema),
// });

// export type CategoryResType = z.TypeOf<typeof CategoryRes>;

export const CreateCategoryBody = z
  .object({
    name: z.string().trim().min(1).max(256),
    parent: CategorySchema.nullable(),
  })
  .strict();

export type CreateCategoryBodyType = z.TypeOf<typeof CreateCategoryBody>;

export const UpdateCategoryBody = z
  .object({
    name: z.string().trim().min(1).max(256),
    parent: CategorySchema.nullable(),
  })
  .strict();

export type UpdateCategoryBodyType = z.TypeOf<typeof UpdateCategoryBody>;

