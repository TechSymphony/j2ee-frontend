import { z } from "zod";

// Schema for pageable metadata
const PageableSchema = z.object({
  number: z.number().default(0),
  size: z.number().default(10),
  totalPages: z.number().default(0),
  totalElements: z.number().default(0),
  amountTotal: z.number().optional(),
});

// Combine both for reusable structure
export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(
  dataSchema: T
) =>
  z.object({
    content: z.array(dataSchema).default([]),
    page: PageableSchema,
    // ...PaginationInfoSchema.shape,
  });

export type PaginatedResponse<T> = z.infer<
  ReturnType<typeof PaginatedResponseSchema<z.ZodType<T>>>
>;

const emptyObjectSchema = z.object({ page: PageableSchema });
export const getDefaultPaginatedResponse = PaginatedResponseSchema(
  emptyObjectSchema
).parse({
  page: PageableSchema.parse({}),
});
