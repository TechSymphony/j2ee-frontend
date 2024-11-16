import http from "@/lib/http";
import {
    CreatedDonationResType,
    CreateDonationBodyType,
    DonationListResType,
} from "@/schemas/donation.schema";

const prefix = "/donations";

const donationApi = {
    getDonationList: () => http.get<DonationListResType>(prefix),
    addDonation: (body: CreateDonationBodyType) =>
        http.post<CreatedDonationResType>("public" + prefix, body),
    getMyDonationList: () => http.get<DonationListResType>(`/me${prefix}`),
};
export default donationApi;
