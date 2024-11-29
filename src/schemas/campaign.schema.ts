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
  shortDescription: z.string().optional(),
  image: z.string(),
});

export type CampaignType = z.TypeOf<typeof CampaignSchema>;

export const CampaignListRes = z.array(CampaignSchema);

const PaginatedCampaignResponseSchema = PaginatedResponseSchema(CampaignSchema);

export type CampaignListResType = z.TypeOf<
  typeof PaginatedCampaignResponseSchema
>;
export type CampaignOptionsResType = z.TypeOf<typeof CampaignListRes>;

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
  shortDescription: z.string().optional(),
});
export type CampaignResType = z.TypeOf<typeof CampaignRes>;

export const CreateCampaignBody = z
  .object({
    beneficiary: BeneficiarySchema.nullish(),
    category: CategorySchema,
    code: z
      .string()
      .trim()
      .min(5, { message: "Vui lòng nhập khoảng từ 5-256 ký tự" })
      .max(256, { message: "Vui lòng nhập khoảng từ 5-256 ký tự" }),
    name: z
      .string()
      .trim()
      .min(2, { message: "Vui lòng nhập từ 2-256 ký tự" })
      .max(256, { message: "Vui lòng nhập khoảng từ 2-256 ký tự" }),
    description: z
      .string()
      .trim()
      .min(2, { message: "Vui lòng nhập từ 2 ký tự trở lên" }),
    targetAmount: z
      .number()
      .min(500000, {
        message: "Vui lòng nhập số tiền - tối thiểu 500.000 đồng",
      }),
    currentAmount: z.number().min(0),
    startDate: z.date({ message: "Vui lòng chọn ngày bắt đầu" }),
    endDate: z.date({ message: "Vui lòng chọn ngày kết thúc" }),
    status: z.number({ message: "Vui lòng chọn trạng thái" }),
    disabledAt: z.boolean(),
    shortDescription: z.string().optional(),
  })
  .strict();

export type CreateCampaignBodyType = z.TypeOf<typeof CreateCampaignBody>;

export const UpdateCampaignBody = z
  .object({
    beneficiary: BeneficiarySchema.nullish(),
    category: CategorySchema,
    code: z
      .string()
      .trim()
      .min(5, { message: "Vui lòng nhập khoảng từ 5-256 ký tự" })
      .max(256, { message: "Vui lòng nhập khoảng từ 5-256 ký tự" }),
    name: z
      .string()
      .trim()
      .min(2, { message: "Vui lòng nhập từ 2-256 ký tự" })
      .max(256, { message: "Vui lòng nhập khoảng từ 2-256 ký tự" }),
    description: z
      .string()
      .trim()
      .min(2, { message: "Vui lòng nhập từ 2 ký tự trở lên" }),
    targetAmount: z
      .number()
      .min(500000, {
        message: "Vui lòng nhập số tiền - tối thiểu 500.000 đồng",
      }),
    currentAmount: z.number().min(0),
    startDate: z.date({ message: "Vui lòng chọn ngày bắt đầu" }),
    endDate: z.date({ message: "Vui lòng chọn ngày kết thúc" }),
    status: z.number({ message: "Vui lòng chọn trạng thái" }),
    disabledAt: z.boolean(),
    shortDescription: z.string().optional(),
  })
  .strict();

export type UpdateCampaignBodyType = z.TypeOf<typeof UpdateCampaignBody>;
