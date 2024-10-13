import http from "@/lib/http";
import { BeneficiaryListResType, BeneficiaryResType, UpdateBeneficiaryBodyType } from "@/schemas/beneficiary.schema";

const prefix = "/beneficiaries";

const beneficiaryApi = {
  getBeneficiaryList: () => http.get<BeneficiaryListResType>(prefix),
  updateBeneficiary: (id: number, body: UpdateBeneficiaryBodyType) =>
    http.put<BeneficiaryResType>(`${prefix}/${id}`, body),
  deleteBeneficiary: (id: number) => http.delete(`${prefix}/${id}`),
  getBeneficiary: (id: number) => http.get<BeneficiaryResType>(`${prefix}/${id}`),
};

export default beneficiaryApi;
