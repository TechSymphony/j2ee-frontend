import http from "@/lib/http";
import {
  BeneficiaryListResType,
  BeneficiaryResType,
  UpdateBeneficiaryBodyType,
  UpdateMyBeneficiaryBodyType,
} from "@/schemas/beneficiary.schema";

const prefix = "/beneficiaries";

const beneficiaryApi = {
  getBeneficiaryList: () => http.get<BeneficiaryListResType>(prefix),
  updateBeneficiary: (id: number, body: UpdateBeneficiaryBodyType) =>
    http.put<BeneficiaryResType>(`${prefix}/${id}`, body),
  getBeneficiary: (id: number) =>
    http.get<BeneficiaryResType>(`${prefix}/${id}`),
  getMyBeneficiaryList: () => http.get<BeneficiaryListResType>(`/me${prefix}`),
  updateMyBeneficiary: (id: number, body: UpdateMyBeneficiaryBodyType) =>
    http.put<BeneficiaryResType>(`/me${prefix}/${id}`, body),
  deleteMyBeneficiary: (id: number) => http.delete(`/me${prefix}/${id}`),
};

export default beneficiaryApi;
