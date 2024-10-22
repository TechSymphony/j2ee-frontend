"use client";
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
// import { signOut } from "next-auth/react";
export function UserNav() {
    // const { data: session } = useSession();
    // if (session) {
    if (true) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full"
                    >
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
                        <DropdownMenuItem>
                            Profile
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Billing
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Settings
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>New Team</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    {/* <DropdownMenuItem onClick={() => signOut()}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem> */}
                </DropdownMenuContent>
            </DropdownMenu>
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
