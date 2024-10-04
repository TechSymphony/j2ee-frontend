"use client";

import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
// import { useEffect, useState } from "react";

/**
 * authRequired === undefined => Đăng nhập hay chưa đăng nhập cũng cho hiển thị
 * authRequired === false => Chưa đăng nhập thì cho hiển thị
 * authRequired === true => Đăng nhập mới cho hiển thị
 */
const menuItems = [
  {
    title: "Trang chủ",
    href: "/",
    exact: true,
    authRequired: false,
  },
  {
    title: "Đăng nhập",
    href: "/login",
    authRequired: false,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    authRequired: true,
  },
  {
    title: "Chiến dịch gây quỹ",
    href: "/campaign",
    authRequired: false,
  },
  {
    title: "Trái tim momo",
    href: "/heart",
    authRequired: false,
  },
  {
    title: "Tin tức cộng đồng",
    href: "/news",
    authRequired: false,
  },
];

export default function NavItems({ className }: { className?: string }) {
  // const [isAuth, setIsAuth] = useState(false);
  // useEffect(() => {
  //   setIsAuth(true);
  // }, []);
  const pathname = usePathname();
  return useMemo(() => {
    return menuItems.map((item) => {
      // if (
      //   (item.authRequired === false && isAuth) ||
      //   (item.authRequired === true && !isAuth)
      // )
      //   return null;

      const isActive = item.exact
        ? pathname === item.href
        : pathname.startsWith(item.href);
      return (
        <Link
          href={item.href}
          key={item.href}
          className={classNames(className, {
            "text-pink hover:text-pink-lighter ": isActive,
            "text-muted-foreground": !isActive,
          })}
        >
          {item.title}
        </Link>
      );
    });
  }, [pathname, className]);
}
