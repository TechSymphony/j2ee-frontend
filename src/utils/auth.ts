import { routes } from "@/constants/path";
import { Role } from "@/constants/role";

/**
 * Description: Hàm hasRequiredRole dùng để kiểm tra xem người dùng có vai trò phù hợp để truy cập vào một route nhất định hay không.
 * @param userRole : Vai trò hiện tại của người dùng.
 * @param requiredRoles : Một mảng chứa các vai trò cần thiết để truy cập vào route.
 * @returns : boolean
 * Example:
 * hasRequiredRole("Admin", ["Admin", "Editor"]); // Trả về true (có quyền)
 * hasRequiredRole("User", ["Admin", "Editor"]); // Trả về false (không có quyền)
 */

export const hasRequiredRole = (
  userRole: Role | undefined,
  requiredRoles: Role[] = []
): boolean => {
  if (!userRole || requiredRoles.length === 0) return true;
  return requiredRoles.includes(userRole);
};

/**
 * Description: Hàm getRouteRoles dùng để lấy ra danh sách các vai trò cần thiết để truy cập vào một route cụ thể, dựa vào đường dẫn của route (pathname).
 * @param pathname :  Đường dẫn của route cần kiểm tra.
 * @param requiredRoles : Một mảng chứa các vai trò cần thiết để truy cập vào route.
 * @returns : string[]
 * Example:
 * getRouteRoles("/dashboard"); // Trả về ["Admin"]
 * getRouteRoles("/dashboard/role"); // Trả về ["Admin", "Editor"]
 */

export const getRouteRoles = (pathname: string): Role[] => {
  const allRoutes = [...routes.private, ...routes.public];
  const route = allRoutes.find((route) => pathname.startsWith(route.path));
  return route?.roles || [];
};
