import { usePathname } from "next/navigation";
import { ROUTE_PERMISSIONS } from "@/constants/route-permissions";

export function useRoutePermission() {
  const pathname = usePathname();

  /**
   * Get required permission for current route
   * Default to empty string if route not found in mapping
   */
  const getRequiredPermission = (): string => {
    // Check if path exists in mapping
    if (pathname in ROUTE_PERMISSIONS) {
      return ROUTE_PERMISSIONS[pathname as keyof typeof ROUTE_PERMISSIONS];
    }

    // For nested routes, try to find closest parent route
    const pathParts = pathname?.split("/") || [];
    let currentPath = "";

    for (let i = 0; i < pathParts.length; i++) {
      currentPath += `/${pathParts[i]}`;
      if (currentPath in ROUTE_PERMISSIONS) {
        return ROUTE_PERMISSIONS[currentPath as keyof typeof ROUTE_PERMISSIONS];
      }
    }

    return "";
  };

  return {
    currentRoute: pathname,
    requiredPermission: getRequiredPermission(),
  };
}
