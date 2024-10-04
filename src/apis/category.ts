import http from "@/lib/http";
import { CategoryListResType } from "@/schemas/category.schema";
import {
  CreateRoleBodyType,
  RoleResType,
  UpdateRoleBodyType,
} from "@/schemas/role.schema";

const prefix = "/categories";

const categoryApi = {
  getCategoryList: () => http.get<CategoryListResType>(prefix),
  addCategory: (body: CreateRoleBodyType) => http.post<RoleResType>(prefix, body),
  updateCategory: (id: number, body: UpdateRoleBodyType) =>
    http.put<RoleResType>(`${prefix}/${id}`, body),
  deleteCategory: (id: number) => http.delete(`${prefix}/${id}`),
  getCategory: (id: number) => http.get<RoleResType>(`${prefix}/${id}`),
};

export default categoryApi;
