import http from "@/lib/http";
import {
  CreateUserBodyType,
  UserListResType,
  UserResType,
  UpdateUserBodyType,
} from "@/schemas/user.schema";
import { RoleListResType } from "@/schemas/role.schema";

const prefix = "/users";

const userApi = {
  getUserList: () => http.get<UserListResType>(prefix),
  getRoleList: () => http.get<RoleListResType>("/roles"),
  addUser: (body: CreateUserBodyType) => http.post<UserResType>(prefix, body),
  updateUser: (id: number, body: UpdateUserBodyType) =>
    http.put<UserResType>(`${prefix}/${id}`, body),
  deleteUser: (id: number) => http.delete(`${prefix}/${id}`),
  getUser: (id: number) => http.get<UserResType>(`${prefix}/${id}`),
};
export default userApi;