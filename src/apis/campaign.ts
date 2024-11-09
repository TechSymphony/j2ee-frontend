import http from "@/lib/http";
import {
    CreateCampaignBodyType,
    CampaignListResType,
    CampaignResType,
    UpdateCampaignBodyType,
} from "@/schemas/campaign.schema";

const prefix = "/campaigns";

const campaignApi = {
    getCampaignClientList: () =>
        http.get<CampaignListResType>("/public" + prefix),
    getCampaignList: () => http.get<CampaignListResType>(prefix),
    addCampaign: (body: CreateCampaignBodyType) =>
        http.post<CampaignResType>(prefix, body),
    updateCampaign: (id: number, body: UpdateCampaignBodyType) =>
        http.put<CampaignResType>(`${prefix}/${id}`, body),
    deleteCampaign: (id: number) => http.delete(`${prefix}/${id}`),
    getCampaign: (id: number) => http.get<CampaignResType>(`${prefix}/${id}`),
};
export default campaignApi;
