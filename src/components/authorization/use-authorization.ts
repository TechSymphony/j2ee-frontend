"use client";
import { CustomUser, useUser } from "@/contexts/user-context";
import { useRoutePermission } from "@/hooks/use-route-permission";

const allPermissions: string[] = [
  "SUPER_ADMIN",
  "VIEW_STATISTICS",
  "MANAGE_ROLES",
  "MANAGE_USERS",
  "MANAGE_CATEGORIES",
  "MANAGE_BENEFICIARIES",
  "MANAGE_DONATIONS",
  "MANAGE_CAMPAIGNS",
];
const permissions: string[] = [
  "SUPER_ADMIN",
  "VIEW_STATISTICS",
  "MANAGE_ROLES",
  "MANAGE_USERS",
  "MANAGE_CATEGORIES",
  //   "MANAGE_BENEFICIARIES",
  //   "MANAGE_DONATIONS",
  //   "MANAGE_CAMPAIGNS",
];

/**
 * Description: kiểm tra người dùng chưa đăng nhập thì trả về false, còn nếu đã đăng nhập thì kiểm ra tiếp permission request có hợp lệ và được cho phép hay không
 * params:
 * user: user context sau khi login auth server
 * permission: permission người dùng request
 * return value: boolean
 */

export function authorizeCheck(
  user: CustomUser | null,
  permission: string,
  permissions: string[]
) {
  if (!allPermissions.includes(permission)) {
    throw new Error(
      `Permission ${permission} doesn't exists in the app, please check again`
    );
  }

  if (user == null) {
    return false;
  }
  const isSuperAdmin = permissions.some(
    (permission) => permission === "SUPER_ADMIN"
  );

  return (
    permissions.includes(permission) || // Chố này sau sửa thành authorities
    isSuperAdmin // Supper admin role
  );
}

/**
 * Authorize the requested permission with the current logging user
 */
export function useAuthorize(): {
  isAuthorized: boolean;
} {
  const {
    state: { user },
  } = useUser();
  const permissions = (user?.profile?.authorities as string[]) ?? [];
  console.log({ permissions });

  const { requiredPermission } = useRoutePermission();
  const isAuthorized =
    requiredPermission !== ""
      ? authorizeCheck(user, requiredPermission, permissions)
      : true;
  return {
    isAuthorized,
  };
}
