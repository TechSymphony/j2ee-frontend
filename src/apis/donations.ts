import http from "@/lib/http";
import {
  CreatedDonationResType,
  CreateDonationBodyType,
  DonationListResType,
  DonationResType,
  ExportDonationBodyType,
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
  exportDonationList: (body: ExportDonationBodyType) =>
    http.post<Blob>(`${prefix}/export`, body),
};
export default donationApi;
