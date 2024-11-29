"use client";
import ProfileForm from "@/components/forms/profile-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/contexts/user-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Notifications from "../notification/notifications";
import { ROUTE_PERMISSIONS } from "@/constants/route-permissions";
// import { signOut } from "next-auth/react";
export function UserNav() {
  // const { data: session } = useSession();
  // if (session) {
  const [isOpenProfileForm, setIsOpenProfileForm] = useState(false);
  const router = useRouter();
  const user = useUser().state.user;
  const permissions = (user?.profile?.authorities as string[]) ?? []; // ['IS_SUPERADMIN','MANAGE_DONATIONS', 'MANAGE_CAMPAIGNS']
  // Lấy route tương ứng với quyền đầu tiên trong permissions
  const getFirstPermissionRoute = (permissions: string[]): string => {
    // Nếu permissions rỗng hoặc không có quyền tương ứng, trả về mặc định
    if (!permissions.length) return "/dashboard";
    // Tìm route đầu tiên phù hợp
    const firstPermission = permissions.find((permission) =>
      Object.values(ROUTE_PERMISSIONS).includes(permission as any)
    );
    // Trả về route phù hợp hoặc mặc định
    return firstPermission
      ? Object.entries(ROUTE_PERMISSIONS).find(
          ([_, value]) => value === firstPermission
        )?.[0] ?? "/dashboard"
      : "/dashboard";
  };

  if (user) {
    const menuItems = [
      {
        title: "Trang quản lý",
        // href: "/dashboard",
        href: permissions.includes("SUPER_ADMIN")
          ? "/dashboard"
          : getFirstPermissionRoute(permissions),
        shortcut: "⌘B",
        // option chỉ có nếu user chứa bất kì authorities
        ignore: !permissions || permissions.length < 1,
      },
      {
        title: "Lịch sử gửi nguyện vọng",
        href: "/history-beneficiary",
        shortcut: "⇧⌘P",
      },
      {
        title: "Lịch sử quyên góp",
        href: "/history-donation",
        shortcut: "⌘B",
      },
      {
        title: "Hồ sơ cá nhân",
        href: "/new-team",
      },
    ];
    return (
      <>
        <Notifications />

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  // src={session.user?.image ?? ''}
                  // alt={session.user?.name ?? ''}
                  src={""}
                  alt={"Ảnh đại diện"}
                />
                <AvatarFallback></AvatarFallback>
                {/* <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback> */}
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {/* {user?.profile.} */}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.profile.sub}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {menuItems.map((item, index) =>
                item.ignore ? (
                  <></>
                ) : (
                  <DropdownMenuItem
                    key={index}
                    onClick={() =>
                      item.title === "Hồ sơ cá nhân"
                        ? setIsOpenProfileForm(true)
                        : router.push(item.href)
                    }
                  >
                    {item.title}
                    {/* {item.shortcut && (
                    <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
                  )} */}
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/logout")}>
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ProfileForm
          isOpenProfileForm={isOpenProfileForm}
          setIsOpenProfileForm={setIsOpenProfileForm}
        />
      </>
    );
  } else {
    const menuItems = [
      {
        title: "Đăng nhập",
        href: "/login",
      },
    ];
    return (
      <>
        {menuItems.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.title}
          </Link>
        ))}
      </>
    );
  }
}
