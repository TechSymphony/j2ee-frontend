"use client";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/contexts/user-context";
import { NavItem } from "@/types";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navItems: NavItem[] = [
  {
    title: "Lịch sử quyên góp",
    href: "/history-donation",
    icon: "donation",
    label: "Lịch sử quyên góp",
  },
  {
    title: "Lịch sử gửi nguyện vọng",
    href: "/history-beneficiary",
    icon: "billing",
    label: "Lịch sử gửi nguyện vọng",
  },
  {
    title: "Đổi mật khẩu",
    href: "/change-password",
    icon: "changePassword",
    label: "Đổi mật khẩu",
  },
];
export default function PersonalSideNav() {
  //   const {
  //     state: { user },
  //   } = useUser();
  const pathname = usePathname();
  return (
    <div>
      {navItems.length > 0 &&
        navItems.map((item) => {
          const Icon = Icons[item.icon || "arrowRight"];
          return (
            <div className="mt-4" key={item.title}>
              <Link
                href={item.href as string}
                className={classNames(
                  "flex items-center capitalize transition-colors ",
                  {
                    "text-pink hover:text-pink-lighter ":
                      pathname === item.href,
                    "text-muted-foreground": pathname !== item.href,
                  }
                )}
              >
                <Icon className={`mr-3 size-5 flex-none`} />
                {item.label}
              </Link>
            </div>
          );
        })}
    </div>
  );
}
