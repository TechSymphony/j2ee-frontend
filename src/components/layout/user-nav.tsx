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
// import { signOut } from "next-auth/react";
export function UserNav() {
  // const { data: session } = useSession();
  // if (session) {
  const [isOpenProfileForm, setIsOpenProfileForm] = useState(false);
  const router = useRouter();
  const user = useUser().state.user;

  if (user) {
    const menuItems = [
      {
        title: "Trang quản lý",
        href: "/dashboard",
        shortcut: "⌘B",
        // option chỉ có nếu user chứa bất kì authorities
        ignore: user?.authorities?.length,
      },
      {
        title: "Gửi nguyện vọng",
        href: "/beneficiary",
        shortcut: "⇧⌘P",
      },
      {
        title: "Lịch sử thanh toán",
        href: "/billing",
        shortcut: "⌘B",
      },
      {
        title: "Cài đặt",
        href: "/settings",
        shortcut: "⌘S",
      },
      {
        title: "Hồ sơ cá nhân",
        href: "/new-team",
      },
    ];
    return (
      <>
        <DropdownMenu>
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
