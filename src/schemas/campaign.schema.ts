import z from "zod";
import { PaginatedResponseSchema } from "./paginate.schema";
// import { AccountSchema } from "./account.schema";
import { BeneficiarySchema } from "./beneficiary.schema";
import { CategorySchema } from "./category.schema";

export const BasicCampaignSchema = z.object({
  id: z.number(),
  code: z.string(),
  name: z.string(),
});

export const CampaignSchema = z.object({
  id: z.number(),
  beneficiary: BeneficiarySchema,
  category: CategorySchema,
  code: z.string(),
  name: z.string(),
  description: z.string().optional(),
  targetAmount: z.number(),
  currentAmount: z.number(),
  startDate: z.date(),
  endDate: z.date(),
  status: z.number(),
  numberOfDonations: z.number().optional(),
  disabledAt: z.boolean(),
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
  category: CategorySchema,
  code: z.string(),
  name: z.string(),
  description: z.string().optional(),
  targetAmount: z.number(),
  currentAmount: z.number(),
  startDate: z.date(),
  endDate: z.date(),
  status: z.number(),
  numberOfDonations: z.number().default(0),
  disabledAt: z.boolean(),
});

export type CampaignResType = z.TypeOf<typeof CampaignRes>;

export const CreateCampaignBody = z
  .object({
    beneficiary: BeneficiarySchema.nullish(),
    category: CategorySchema,
    code: z.string().trim().min(5).max(256),
    name: z.string().trim().min(2).max(256),
    description: z.string().trim().min(2),
    targetAmount: z.number().min(10000),
    currentAmount: z.number().min(0),
    startDate: z.date(),
    endDate: z.date(),
    status: z.number(),
    disabledAt: z.boolean().default(false),
  })
  .strict();

export type CreateCampaignBodyType = z.TypeOf<typeof CreateCampaignBody>;

export const UpdateCampaignBody = z
  .object({
    beneficiary: BeneficiarySchema.nullish(),
    category: CategorySchema,
    code: z.string().trim().min(5).max(256),
    name: z.string().trim().min(2).max(256),
    description: z.string().trim().min(2),
    targetAmount: z.number().min(10000),
    currentAmount: z.number().min(0),
    startDate: z.date(),
    endDate: z.date(),
    status: z.number(),
    disabledAt: z.boolean(),
  })
  .strict();

export type UpdateCampaignBodyType = z.TypeOf<typeof UpdateCampaignBody>;
