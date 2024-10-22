"use client";

import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useUser } from "@/contexts/user-context";
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
        hideAfterAuth: false,
    },
];

export default function NavItems({ className }: { className?: string }) {
    const userContext = useUser();
    const [isAuth, setIsAuth] = useState(userContext.state.user != null);
    // const [isAuth, setIsAuth] = useState(userContext.state.user != null);
    useEffect(() => {
        setIsAuth(userContext.state.user != null);
    }, [userContext.state.user]);

    const pathname = usePathname();
    return useMemo(() => {
        return menuItems.map((item) => {
            if (
                (item.authRequired === true && !isAuth) ||
                (item.hideAfterAuth && isAuth)
            )
                return null;

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
    }, [pathname, className, isAuth]);
}
