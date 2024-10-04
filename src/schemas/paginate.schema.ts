import { any, z } from 'zod';

// Schema for pageable metadata
const PageableSchema = z.object({
  pageNumber: z.number().default(0),
  pageSize: z.number().default(10),
  offset: z.number().default(0),
});

// Schema for the full pagination information
const PaginationInfoSchema = z.object({
  totalPages: z.number().default(0),
  totalElements: z.number().default(0),
  number: z.number().default(0),
  numberOfElements: z.number().default(10),
  first: z.boolean().default(true),
  last: z.boolean().default(true),
});

// Combine both for reusable structure
export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
    z.object({
      content: z.array(dataSchema).default([]),
      pageable: PageableSchema.optional(),
      ...PaginationInfoSchema.shape,
    });

export type PaginatedResponse<T> = z.infer<ReturnType<typeof PaginatedResponseSchema<z.ZodType<T>>>>;

const emptyObjectSchema= z.object({});
export const getDefaultPaginatedResponse= PaginatedResponseSchema(emptyObjectSchema).parse({})