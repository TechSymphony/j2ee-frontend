import { PaginatedResponseSchema } from "@/schemas/paginate.schema";
import z from "zod";

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
  amountTotlal: z.number(),
  donationDate: z.date(),
  frequency: z.number(),
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
  id: z.number(),
  donor_id: z.number(),
  campaign_id: z.string(),
  amountBase: z.number(),
  amountTotlal: z.number(),
  donationDate: z.date(),
});

export type DonationResType = z.TypeOf<typeof DonationRes>;
