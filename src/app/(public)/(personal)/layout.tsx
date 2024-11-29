import PersonalSideNav from "@/components/layout/personal-side-nav";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-neutral-100 py-16 text-sm text-gray-600 min-h-[71vh]">
      <div className="container">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 pr-4">
          <div className="md:col-span-3">
            <PersonalSideNav />
          </div>
          <div className="md:col-span-9">{children}</div>
        </div>
      </div>
    </div>
  );
}
