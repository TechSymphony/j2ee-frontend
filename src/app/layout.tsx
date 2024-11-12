"use client";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AppProvider from "@/components/app-provider";
import { Toaster } from "@/components/ui/toaster";
import { AppContextProvider } from "@/contexts/app-context";
import UserProvider from "@/contexts/user-context";
import { BeneficiaryProvider } from "@/contexts/beneficiary-context";
import { RouteAuthorize } from "@/components/authorization/route-authorize";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <NextTopLoader showSpinner={false} /> */}
        <NuqsAdapter>
          <AppProvider>
            <UserProvider>
              <BeneficiaryProvider>
                <AppContextProvider>
                  <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                  >
                    <RouteAuthorize>{children}</RouteAuthorize>

                    <Toaster />
                  </ThemeProvider>
                </AppContextProvider>
              </BeneficiaryProvider>
            </UserProvider>
          </AppProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}

// import Providers from "@/components/layout/providers";
// import { Toaster } from "@/components/ui/toaster";
// import "@uploadthing/react/styles.css";
// import type { Metadata } from "next";
// import NextTopLoader from "nextjs-toploader";
// import { Inter } from "next/font/google";
// import "./globals.css";
// // import { auth } from "@/auth";
// import AppProvider from "@/components/app-provider";
// import { auth } from "../../auth";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Next Shadcn",
//   description: "Basic dashboard with Next.js and Shadcn",
// };

// export default async function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const session = await auth();
//   return (
//     <html lang="en">
//       <body
//         className={`${inter.className} overflow-hidden `}
//         suppressHydrationWarning={true}
//       >
//         <NextTopLoader showSpinner={false} />
//         <AppProvider>
//           <Providers session={session}>
//             <Toaster />
//             {children}
//           </Providers>
//         </AppProvider>
//       </body>
//     </html>
//   );
// }
