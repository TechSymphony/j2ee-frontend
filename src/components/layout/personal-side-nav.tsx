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
      <div className="bor-b bor-b-gray-200 flex items-center py-4">
        <Link
          href={"/"}
          className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10"
        >
          {/* <img src={""} alt='' className='h-full w-full object-cover' /> */}
          <Avatar className="h-full w-full">
            <AvatarImage
              // src={session.user?.image ?? ''}
              // alt={session.user?.name ?? ''}
              src={""}
              alt={"Ảnh đại diện"}
            />
            <AvatarFallback></AvatarFallback>
            {/* <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback> */}
          </Avatar>
        </Link>

        <div className="flex-grow pl-4 overflow-hidden">
          <div className="mb-1 truncate font-semibold text-gray-600 break-words">
            {"Vương Huy Hoàng"}
            {/* {user?.profile.email} */}
          </div>
          <Link
            href={"/"}
            className="flex items-center capitalize text-gray-500"
          >
            <svg
              width={12}
              height={12}
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: 4 }}
            >
              <path
                d="M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48"
                fill="#9B9B9B"
                fillRule="evenodd"
              />
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className="border-b-2 border-gray-200"></div>

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
