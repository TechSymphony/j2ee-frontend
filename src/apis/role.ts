import http from "@/lib/http";
import {
  CreateRoleBodyType,
  PermissionListResType,
  RoleListResType,
  RoleOptionsResType,
  RoleResType,
  UpdateRoleBodyType,
} from "@/schemas/role.schema";

const prefix = "/roles";

const roleApi = {
  getRoleList: () => http.get<RoleListResType>(prefix),
  getPermissionList: () => http.get<PermissionListResType>("/permissions"),
  addRole: (body: CreateRoleBodyType) => http.post<RoleResType>(prefix, body),
  updateRole: (id: number, body: UpdateRoleBodyType) =>
    http.put<RoleResType>(`${prefix}/${id}`, body),
  deleteRole: (id: number) => http.delete(`${prefix}/${id}`),
  getRole: (id: number) => http.get<RoleResType>(`${prefix}/${id}`),
  getRoleOptions: () => http.get<RoleOptionsResType>("/roles/options"),
};

export default roleApi;
