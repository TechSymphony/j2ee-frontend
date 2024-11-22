import http from "@/lib/http";
import {
  CreatedDonationResType,
  CreateDonationBodyType,
  DonationListResType,
  DonationResType,
  DonationStatisResType,
} from "@/schemas/donation.schema";

const prefix = "/donations";

const donationApi = {
  getDonationList: () => http.get<DonationListResType>(prefix),
  getDonation: (id: number) => http.get<DonationResType>(`${prefix}/${id}`),
  addDonation: (body: CreateDonationBodyType) =>
    http.post<CreatedDonationResType>("public" + prefix, body),
  getMyDonationList: () => http.get<DonationListResType>(`/me${prefix}`),
  getTopListDonation: (id: number) =>
    http.get<DonationResType>(`/campaigns/${id}/top-donations`),
  getNewDonationsList: (id: number) =>
    http.get<DonationResType>(`/campaigns/${id}/donations`),
  getDonationStatis: () => http.get<DonationStatisResType>(`${prefix}/report`),
};
export default donationApi;
