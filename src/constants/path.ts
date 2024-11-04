import { Role } from "@/constants/role";

interface Route {
  path: string;
  name: string;
  roles?: Role[]; // Các roles được phép truy cập route này
}

interface RouteGroups {
  unauth: Route[];
  private: Route[];
  public: Route[];
}

export const routes: RouteGroups = {
  unauth: [
    {
      path: "/login",
      name: "Đăng nhập",
    },
  ],
  private: [
    {
      path: "/dashboard",
      name: "Thống kê",
      roles: ["ADMIN"],
    },
    {
      path: "/dashboard/role",
      name: "Quản lý chức vụ",
      roles: ["ADMIN"],
    },
    {
      path: "/dashboard/category",
      name: "Quản lý danh mục",
      roles: ["ADMIN"],
    },
  ],
  public: [
    {
      path: "/",
      name: "Trang chủ",
    },
    {
      path: "/logout",
      name: "Đăng xuất",
    },
    {
      path: "/campaign",
      name: "Chiến dịch",
      roles: ["ADMIN", "DONOR", "USER"],
    },
    {
      path: "/history-donation",
      name: "Lịch sử quyên góp",
      roles: ["ADMIN", "DONOR", "USER"],
    },
  ],
};

export const getPaths = (routeGroup: Route[]): string[] =>
  routeGroup.map((route) => route.path);

export const privatePaths = getPaths(routes.private);
export const unAuthPaths = getPaths(routes.unauth);
export const publicPaths = getPaths(routes.public);
