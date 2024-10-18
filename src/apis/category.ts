import http from "@/lib/http";
import {
  CategoryListResType,
  CategoryMenu,
  CategoryResType,
  CreateCategoryBodyType,
  UpdateCategoryBodyType,
} from "@/schemas/category.schema";

const prefix = "/categories";

const categoryApi = {
  getCategoryList: () => http.get<CategoryListResType>(prefix),
  getCategoryMenuList: () => http.get<CategoryMenu[]>(prefix + "/menus"),
  addCategory: (body: CreateCategoryBodyType) =>
    http.post<CategoryResType>(prefix, body),
  updateCategory: (id: number, body: UpdateCategoryBodyType) =>
    http.put<CategoryResType>(`${prefix}/${id}`, body),
  deleteCategory: (id: number) => http.delete(`${prefix}/${id}`),
  getCategory: (id: number) => http.get<CategoryResType>(`${prefix}/${id}`),
};

export default categoryApi;
