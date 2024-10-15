import http from "@/lib/http";
import {
    DonationListResType,
} from "@/schemas/donation.schema";

const prefix = "/donations";

const donationApi = {
    getDonationList: () => http.get<DonationListResType>(prefix),
};
export default donationApi;