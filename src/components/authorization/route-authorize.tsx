"use client";
import NotFound from "@/components/ui/not-found";
import { privatePaths, unAuthPaths, publicPaths } from "@/constants/path";
import { useUser } from "@/contexts/user-context";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { hasRequiredRole, getRouteRoles } from "@/utils/auth";
import Forbidden from "@/components/authorization/forbidden";

interface Props {
  children: ReactNode;
}

export function RouteAuthorize({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    state: { user },
  } = useUser();

  const isAuthorized = Boolean(user);
  const authoritiesLength = user?.profile?.authorities
    ? (user?.profile?.authorities as string[]).length
    : 0;
  const userRole = authoritiesLength > 0 ? "ADMIN" : "USER"; // Sau này bổ sung property role vào localstorage khi login thành công
  // const userRole = "Test Role tùm lum";
  const requiredRoles = getRouteRoles(pathname);

  /**
   * Description: Helpers function, mục đích để kiểm tra pathname hiện tại là kiểu nào trong route group (private,public,unauth)
   */
  const isPrivateRoute = privatePaths.some((path) => pathname.startsWith(path));
  const isPublicRoute = publicPaths.some((path) => pathname.startsWith(path));
  const isUnauthRoute = unAuthPaths.some((path) => pathname.startsWith(path));

  useEffect(() => {
    // Đã đăng nhập
    if (isAuthorized) {
      // Đã đăng nhập mà cố tình truy cập unauth route ("/login") (trừ homepage) => cho chuyển về trang chủ
      if (isUnauthRoute && pathname !== "/") {
        router.push("/");
        return;
      }
    }
  }, [isAuthorized, pathname, router, isUnauthRoute]);

  // RENDER LOGIC

  // CASE 1: Chưa đăng nhập
  if (!isAuthorized) {
    // 1.1: Cho phép truy cập unauth routes (login)
    if (isUnauthRoute) {
      return children;
    }

    // 1.2: Cho phép truy cập public routes không yêu cầu role
    if (isPublicRoute && requiredRoles.length === 0) {
      return children;
    }

    // 1.3: Chặn truy cập private routes và public routes có yêu cầu role
    return <Forbidden />;
  }

  // CASE 2: Đã đăng nhập
  if (isAuthorized) {
    // 2.1: Kiểm tra role cho private và public routes
    if (isPrivateRoute && requiredRoles.length > 0) {
      const hasRole = hasRequiredRole(userRole, requiredRoles);
      if (!hasRole) {
        return <Forbidden />;
      }
    }

    // 2.2: Cho phép truy cập nếu có role phù hợp hoặc route không yêu cầu role
    return children;
  }

  // CASE 3: Mọi trường hợp khác => 404
  return <NotFound />;
}
