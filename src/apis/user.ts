import http from "@/lib/http";
import {
  CreateUserBodyType,
  UserListResType,
  UserResType,
  UpdateUserBodyType,
  BasicUserResType,
  UpdateBasicUserBodyType,
  ResetUserPasswordBodyType,
  ChangePasswordBodyType,
  ImportStudentBodyType,
  UserPaginatedListResType,
} from "@/schemas/user.schema";

const prefix = "/users";

const userApi = {
  // getPaginatedUserList: () => http.get<UserPaginatedListResType>(prefix),
  getUserList: () => http.get<UserPaginatedListResType>(prefix),
  addUser: (body: CreateUserBodyType) => http.post<UserResType>(prefix, body),
  updateUser: (id: number, body: UpdateUserBodyType) =>
    http.put<UserResType>(`${prefix}/${id}`, body),
  deleteUser: (id: number) => http.delete(`${prefix}/${id}`),
  getUser: (id: number) => http.get<UserResType>(`${prefix}/${id}`),
  getMe: () => http.get<BasicUserResType>(`/me`),
  updateMe: (body: UpdateBasicUserBodyType) => http.put("/me", body),
  resetPassword: (id: number, body: ResetUserPasswordBodyType) =>
    http.put<null>(`${prefix}/${id}/reset-password`, body),
  changePassword: (body: ChangePasswordBodyType) =>
    http.put<null>(`${prefix}/change-password`, body),
  importStudent: (body: FormData) =>
    http.postWithFiles<UserListResType>(`${prefix}/import/student`, body),
};
export default userApi;
