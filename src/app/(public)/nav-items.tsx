"use client";

import Link from "next/link";
// import { useEffect, useState } from "react";

/**
 * authRequired === undefined => Đăng nhập hay chưa đăng nhập cũng cho hiển thị
 * authRequired === false => Chưa đăng nhập thì cho hiển thị
 * authRequired === true => Đăng nhập mới cho hiển thị
 */
const menuItems = [
  {
    title: "Đăng nhập",
    href: "/login",
    authRequired: false,
  },
  {
    title: "Quản lý",
    href: "/manage/roles",
    authRequired: true,
  },
];

export default function NavItems({ className }: { className?: string }) {
  // const [isAuth, setIsAuth] = useState(false);
  // useEffect(() => {
  //   setIsAuth(true);
  // }, []);
  return menuItems.map((item) => {
    // if (
    //   (item.authRequired === false && isAuth) ||
    //   (item.authRequired === true && !isAuth)
    // )
    //   return null;
    return (
      <Link href={item.href} key={item.href} className={className}>
        {item.title}
      </Link>
    );
  });
}
