

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

export const CampaignSchema = z.object({
    id: z.number(),
    beneficiary_id: z.number(),
    code: z.string(),
    name: z.string(),
    description: z.string().optional(),
    targetAmount: z.number(),
    currentAmount: z.number(),
    startDate: z.date(),
    endDate: z.date(),
    isApproved: z.boolean(),
});

export type CampaignType = z.TypeOf<typeof CampaignSchema>;

export const CampaignListRes = z.array(CampaignSchema);

export type CampaignListResType = z.TypeOf<typeof CampaignListRes>;

export const CampaignRes = z.object({
    id: z.number(),
    beneficiary_id: z.number(),
    code: z.string(),
    name: z.string(),
    description: z.string().optional(),
    targetAmount: z.number(),
    currentAmount: z.number(),
    startDate: z.date(),
    endDate: z.date(),
    isApproved: z.boolean(),
});

export type CampaignResType = z.TypeOf<typeof CampaignRes>;

export const CreateCampaignBody = z
    .object({
        beneficiary_id: z.number({ errorMap: () => ({ message: 'Beneficiary must be selected' }) }).min(1),
        code: z.string().trim().min(5).max(256),
        name: z.string().trim().min(2).max(256),
        description: z.string().min(2).max(256),
        targetAmount: z.number().min(10000).max(99999999999999),
        currentAmount: z.number().min(0).max(99999999999999),
        startDate: z.date(),
        endDate: z.date(),
        isApproved: z.boolean(),
    })
    .strict();

export type CreateCampaignBodyType = z.TypeOf<typeof CreateCampaignBody>;

export const UpdateCampaignBody = z
    .object({
        beneficiary_id: z.number({ errorMap: () => ({ message: 'Beneficiary must be selected' }) }).min(1),
        code: z.string().trim().min(5).max(256),
        name: z.string().trim().min(2).max(256),
        description: z.string().min(2).max(256),
        targetAmount: z.number().min(10000).max(99999999999999),
        currentAmount: z.number().min(0).max(99999999999999),
        startDate: z.date(),
        endDate: z.date(),
        isApproved: z.boolean(),
    })
    .strict();

export type UpdateCampaignBodyType = z.TypeOf<typeof UpdateCampaignBody>;
