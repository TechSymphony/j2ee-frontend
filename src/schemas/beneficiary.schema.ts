import z from "zod";
import { AccountSchema } from "./account.schema";
export const BeneficiarySchema = z.object({
  id: z.number(),
  user: AccountSchema,
  situationDetail: z.string(),
  supportReceived: z.number(),
  verificationStatus: z.boolean(),
});

export type BeneficiaryType = z.TypeOf<typeof BeneficiarySchema>;

export const BeneficiaryListRes = z.array(BeneficiarySchema);

export type BeneficiaryListResType = z.TypeOf<typeof BeneficiaryListRes>;

export const BeneficiaryRes = z.object({
    id: z.number(),
    user: AccountSchema,
    situationDetail: z.string(),
    supportReceived: z.number(),
    verificationStatus: z.boolean(),
});

export type BeneficiaryResType = z.TypeOf<typeof BeneficiaryRes>;

export const UpdateBeneficiaryBody = z
  .object({
    verificationStatus: z.boolean()
  })
  .strict();

export type UpdateBeneficiaryBodyType = z.TypeOf<typeof UpdateBeneficiaryBody>;