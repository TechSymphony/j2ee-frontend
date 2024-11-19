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
  updateDonationClient: (id: number) =>
    http.put<CreatedDonationResType>(
      "public" + prefix + `/${id}/payment/event`,
      {}
    ),
  getMyDonationList: () => http.get<DonationListResType>(`/me${prefix}`),
  getTopListDonation: (id: number) =>
    http.get<DonationResType>(`public/campaigns/${id}/top-donations`),
  getNewDonationsList: (id: number) =>
    http.get<DonationResType>(`public/campaigns/${id}/donations`),
  exportDonationList: (body: ExportDonationBodyType) =>
    http.post<Blob>(`${prefix}/export`, body, {
      isBlob: true,
    }),
};
export default donationApi;
