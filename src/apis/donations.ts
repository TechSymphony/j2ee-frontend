import http from "@/lib/http";
import { CreatedDonationRes } from "../schemas/donation.schema";
import {
    CreateDonationBodyType,
    DonationListResType,
} from "@/schemas/donation.schema";

const prefix = "/donations";

const donationApi = {
    getDonationList: () => http.get<DonationListResType>(prefix),
    addDonation: (body: CreateDonationBodyType) =>
        http.post<CreatedDonationRes>(prefix, body),
    getMyDonationList: () => http.get<DonationListResType>(`/me${prefix}`),
};
export default donationApi;
