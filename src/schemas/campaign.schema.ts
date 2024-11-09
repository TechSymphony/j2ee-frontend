import z from "zod";
import { PaginatedResponseSchema } from "./paginate.schema";
// import { AccountSchema } from "./account.schema";
import { BeneficiarySchema } from "./beneficiary.schema";

export const CampaignSchema = z.object({
  id: z.number(),
  beneficiary: BeneficiarySchema,
  code: z.string(),
  name: z.string(),
  description: z.string().optional(),
  targetAmount: z.number(),
  currentAmount: z.number(),
  startDate: z.date(),
  endDate: z.date(),
  status: z.string(),
});

export type CampaignType = z.TypeOf<typeof CampaignSchema>;

export const CampaignListRes = z.array(CampaignSchema);

const PaginatedCampaignResponseSchema = PaginatedResponseSchema(CampaignSchema);

export type CampaignListResType = z.TypeOf<
  typeof PaginatedCampaignResponseSchema
>;

export const CampaignRes = z.object({
  id: z.number(),
  beneficiary: BeneficiarySchema,
  code: z.string(),
  name: z.string(),
  description: z.string().optional(),
  targetAmount: z.number(),
  currentAmount: z.number(),
  startDate: z.date(),
  endDate: z.date(),
  status: z.number(),
  numberOfDonations: z.number().default(0),
});

export type CampaignResType = z.TypeOf<typeof CampaignRes>;

export const CreateCampaignBody = z
  .object({
    beneficiary: BeneficiarySchema.nullable(),
    code: z.string().trim().min(5).max(256),
    name: z.string().trim().min(2).max(256),
    description: z.string().min(2).max(256),
    targetAmount: z.number().min(10000),
    currentAmount: z.number().min(0),
    startDate: z.date(),
    endDate: z.date(),
    status: z.number(),
  })
  .strict();

export type CreateCampaignBodyType = z.TypeOf<typeof CreateCampaignBody>;

export const UpdateCampaignBody = z
  .object({
    beneficiary: BeneficiarySchema.nullable(),
    code: z.string().trim().min(5).max(256),
    name: z.string().trim().min(2).max(256),
    description: z.string().min(2).max(256),
    targetAmount: z.number().min(10000),
    currentAmount: z.number().min(0),
    startDate: z.date(),
    endDate: z.date(),
    status: z.number(),
  })
  .strict();

export type UpdateCampaignBodyType = z.TypeOf<typeof UpdateCampaignBody>;
