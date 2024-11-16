import http from "@/lib/http";
import {
  CreatedDonationResType,
  CreateDonationBodyType,
  DonationListResType,
  DonationResType,
} from "@/schemas/donation.schema";

const prefix = "/donations";

const donationApi = {
  getDonationList: () => http.get<DonationListResType>(prefix),
  getDonation: (id: number) => http.get<DonationResType>(`${prefix}/${id}`),

  addDonation: (body: CreateDonationBodyType) =>
    http.post<CreatedDonationResType>("public" + prefix, body),
  getMyDonationList: () => http.get<DonationListResType>(`/me${prefix}`),
};
export default donationApi;
