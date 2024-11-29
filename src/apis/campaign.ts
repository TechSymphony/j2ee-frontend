import http from "@/lib/http";
import {
    // CreateCampaignBodyType,
    CampaignListResType,
    CampaignResType,
} from "@/schemas/campaign.schema";

const prefix = "/campaigns";

const campaignApi = {

    getCampaignClientList: () =>
        http.get<CampaignListResType>("/public" + prefix),
    getCampaignClient: (id: number) =>
        http.get<CampaignResType>("/public" + `${prefix}/${id}`),
    getCampaignList: () => http.get<CampaignListResType>(prefix),
    addCampaign: (body: FormData) =>{
        http.postWithFiles<CampaignResType>(prefix, body);
    },
    updateCampaign: (id: number, body: FormData) => {
        http.putWithFiles<CampaignResType>(`${prefix}/${id}`, body);
    },
    deleteCampaign: (id: number) => http.delete(`${prefix}/${id}`),
    getCampaign: (id: number) => http.get<CampaignResType>(`${prefix}/${id}`),

};
export default campaignApi;
