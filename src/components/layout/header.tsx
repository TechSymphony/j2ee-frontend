// import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
// import { cn } from '@/lib/utils';
// import { MobileSidebar } from './mobile-sidebar';
// import { UserNav } from './user-nav';
import Link from "next/link";
import { Menu, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NavItems from "@/app/(public)/nav-items";
import Image from "next/image";
import { NavigationMenuComponent } from "@/components/category-menu";
import { useGetCategoryMenus } from "@/queries/useCategory";
import DarkModeToggle from "../dark-mode-toggle";

export default function Header() {
    const { data } = useGetCategoryMenus();
    const categorieMenuList = data?.payload;

    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-20">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:grow md:justify-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    {/* <Package2 className="h-6 w-6" /> */}
                    <Image
                        src="/static/images/logo.png"
                        alt="Logo"
                        width={36}
                        height={36}
                        quality={100}
                        className="h-6 w-6"
                    />

                    <span className="sr-only">Acme Inc</span>
                </Link>
                <NavItems className="transition-colors hover:text-foreground flex-shrink-0" />
                <NavigationMenuComponent
                    categories={categorieMenuList}
                ></NavigationMenuComponent>
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Package2 className="h-6 w-6" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        <NavItems className="text-muted-foreground transition-colors hover:text-foreground" />
                        <NavigationMenuComponent
                            categories={categorieMenuList}
                        ></NavigationMenuComponent>
                    </nav>
                </SheetContent>
                <div className="ml-auto">
                    <DarkModeToggle />
                </div>
            </Sheet>

        </header>
        // <header className="sticky inset-x-0 top-0 w-full">
        //   <nav className="flex items-center justify-between px-4 py-2 md:justify-end">
        //     <div className={cn('block lg:!hidden')}>
        //       <MobileSidebar />
        //     </div>
        //     <div className="flex items-center gap-2">
        //       <UserNav />
        //       <ThemeToggle />
        //     </div>
        //   </nav>
        // </header>
    );
}
