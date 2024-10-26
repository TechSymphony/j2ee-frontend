import HeaderCommon from "@/components/layout/header-common";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import Sidebar from "@/components/layout/sidebar";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Next Shadcn Dashboard Starter",
    description: "Basic dashboard with Next.js and Shadcn",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            <Sidebar />
            <main className="w-full flex-1 overflow-hidden">
                <header className="sticky inset-x-0 top-0 w-full">
                    <nav className="flex items-center justify-between px-4 py-2 md:justify-end">
                        <div className={cn("block lg:!hidden")}>
                            <MobileSidebar />
                        </div>
                        <div className="flex items-center gap-2">
                            <HeaderCommon />
                        </div>
                    </nav>
                </header>
                {children}
            </main>
        </div>
    );
}
