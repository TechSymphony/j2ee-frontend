import { PaginatedResponseSchema } from "@/schemas/paginate.schema";
import z from "zod";
import { BasicCampaignSchema, CampaignSchema } from "./campaign.schema";
import { ReviewDonationEnum } from "@/types/enum";
import { BasicUserSchema } from "./user.schema";

export const BeneficiarySchema = z.object({
  id: z.number(),
  userId: z.number(),
  situationDetail: z.string(),
  supportReceived: z.string(), // Assuming support_received is a string
  verificationStatus: z.boolean(),
});

export type BeneficiaryType = z.TypeOf<typeof BeneficiarySchema>;

export const BeneficiaryListRes = z.array(BeneficiarySchema);

export type BeneficiaryListResType = z.TypeOf<typeof BeneficiaryListRes>;

export const DonationSchema = z.object({
  id: z.number(),
  donor_id: z.number(),
  campaign_id: z.string(),
  amountBase: z.number(),
  amountTotal: z.number(),
  donationDate: z.date(),
  isAbleToPreview: z.boolean(),
  frequency: z.number(),
  status: z.number(),
});

export type DonationType = z.TypeOf<typeof DonationSchema>;

const PaginatedDonationResponseSchema =
  PaginatedResponseSchema(BeneficiarySchema);

export type DonationListResType = z.TypeOf<
  typeof PaginatedDonationResponseSchema
>;

// export const DonationListRes = z.array(DonationSchema);

// export type DonationListResType = z.TypeOf<typeof DonationListRes>;

export const DonationRes = z.object({
  donor_id: z.number(),
  campaign_id: z.string(),
  amountBase: z.number(),
  amountTotal: z.number(),
  donationDate: z.string(),
  donor: BasicUserSchema.nullish(),
  campaign: BasicCampaignSchema,
  status: z.nativeEnum(ReviewDonationEnum),
  message: z.string(),
});

export const DonationTopRes = z.array(DonationRes);

export type DonationResType = z.TypeOf<typeof DonationRes>;

export type DonationTopResType = z.TypeOf<typeof DonationTopRes>;

export const CreatedDonationRes = z.object({
  id: z.number(),
  paymentUrl: z.string().url(),
});

export type CreatedDonationResType = z.TypeOf<typeof CreatedDonationRes>;

export const CreateDonationBody = z
  .object({
    campaign: z.object({ id: z.number() }),
    amountTotal: z.coerce.number().positive().min(5000),
    message: z.string().trim().min(0).max(256),
    isAnonymous: z.boolean().default(false),
  })
  .strict();

export type CreateDonationBodyType = z.TypeOf<typeof CreateDonationBody>;
export const ExportDonationBody = z.object({
  campaign: z.string().regex(/^\d+$/).transform(Number),
  studentOnly: z.boolean().optional().default(false),
  isAnonymous: z.boolean().optional().default(true),
  from: z
    .date()
    .optional()
    .transform((date) =>
      date
        ? new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
        : date
    ).default(new Date(new Date().getFullYear(), 0, 1)),
  to: z
    .date()
    .optional()
    .transform((date) =>
      date
        ? new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
        : date
    )
    .default(new Date(new Date().getFullYear(), 11, 31)),
});

export type ExportDonationBodyType = z.infer<typeof ExportDonationBody>;

export const DonationStatisRes = z.object({
  period: z.string(),
  amountTotal: z.number(),
});

export type DonationStatisResType = z.TypeOf<typeof DonationStatisRes>;
