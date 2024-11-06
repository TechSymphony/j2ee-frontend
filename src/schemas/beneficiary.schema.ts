import z from "zod";
import { AccountSchema } from "./account.schema";
import { PaginatedResponseSchema } from "./paginate.schema";

const BeneficiarySchema = z.object({
  id: z.number(),
  user: AccountSchema,
  situationDetail: z.string(),
  supportReceived: z.number(),
  verificationStatus: z.number(),
});

export type BeneficiaryType = z.TypeOf<typeof BeneficiarySchema>;

const PaginatedBeneficiaryResponseSchema =
  PaginatedResponseSchema(BeneficiarySchema);

export type BeneficiaryListResType = z.TypeOf<
  typeof PaginatedBeneficiaryResponseSchema
>;

export const BeneficiaryRes = z.object({
  id: z.number(),
  user: AccountSchema,
  situationDetail: z.string(),
  supportReceived: z.number(),
  verificationStatus: z.number(),
});

export type BeneficiaryResType = z.TypeOf<typeof BeneficiaryRes>;

export const UpdateBeneficiaryBody = z
  .object({
    verificationStatus: z.number(),
  })
  .strict();

export type UpdateBeneficiaryBodyType = z.TypeOf<typeof UpdateBeneficiaryBody>;
