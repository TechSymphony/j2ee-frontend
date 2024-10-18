import http from "@/lib/http";
import {
  CreateCampaignBodyType,
  BeneficiaryListResType,
  CampaignListResType,
  CampaignResType,
  UpdateCampaignBodyType,
} from "@/schemas/campaign.schema";

const prefix = "/campaigns";

const campaignApi = {
  getCampaignList: () => http.get<CampaignListResType>(prefix),
  getBeneficiaryList: () => http.get<BeneficiaryListResType>("/beneficiaries"),
  addCampaign: (body: CreateCampaignBodyType) => http.post<CampaignResType>(prefix, body),
  updateCampaign: (id: number, body: UpdateCampaignBodyType) =>
    http.put<CampaignResType>(`${prefix}/${id}`, body),
  deleteCampaign: (id: number) => http.delete(`${prefix}/${id}`),
  getCampaign: (id: number) => http.get<CampaignResType>(`${prefix}/${id}`),
};
export default campaignApi;