import http from "@/lib/http";
import { DonationListResType } from "@/schemas/donation.schema";

const prefix = "/donations";

const donationApi = {
  getDonationList: () => http.get<DonationListResType>(prefix),
  getMyDonationList: () => http.get<DonationListResType>(`/me${prefix}`),
};
export default donationApi;
