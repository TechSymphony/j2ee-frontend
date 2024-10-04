"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Linkedin, Github, Twitter } from "lucide-react";

const siteConfig = {
  name: "Saas Starter Kit",
  alt_name: "My SAAS",
  description: "An open source Saas boilerplate with Nextjs and Prisma.",
  url: process.env.NEXT_PUBLIC_DOMAIN,
  ogImage: "",
  loading_bar_color: "#ADD8E6",
  links: {
    twitter: "https://twitter.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
};

const config = {
  routes: [{ title: "Pricing", link: "/pricing" }],
  footer_nav: {
    about: {
      title: "About",
      routes: [
        { title: "Pricing", link: "/pricing" },
        { title: "FAQs", link: "/faq" },
      ],
    },
    resources: {
      title: "Resources",
      routes: [
        { title: "Blog", link: "/" },
        { title: "Docs", link: "/" },
      ],
    },
    legal: {
      title: "Legal",
      routes: [
        { title: "Privacy Policy", link: "/" },
        { title: "Terms and Conditions", link: "/" },
      ],
    },
  },
  metadata: {
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Server Components",
      "Radix UI",
    ],
    authors: [
      {
        name: "",
      },
    ],
    creator: "",
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "white" },
      { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
      images: [`${siteConfig.url}/og.jpg`],
      creator: "",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
  },
  copy: {
    cta: {
      heading: "Boost your productivity.",
      heading_line2: "Start using our app today.",
      subheading: `Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea.`,
      link1_text: "See Pricing",
      link2_text: "  Learn More ",
    },
  },
};

export default function Footer() {
  const { footer_nav } = config;

  return (
    <footer className="bg-gray-900 ">
      <div className="mx-auto max-w-7xl px-6 pb-6 pt-16 lg:px-8 ">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  {footer_nav.about.title}
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {footer_nav.about.routes.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.link}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  {footer_nav.resources.title}
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {footer_nav.resources.routes.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.link}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  {footer_nav.legal.title}
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {footer_nav.legal.routes.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.link}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 xl:mt-0">
            <h3 className="text-sm font-semibold leading-6 text-white">
              Subscribe to our newsletter
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-300">
              The latest news, articles, and resources, sent to your inbox
              weekly.
            </p>
            <div className="mt-6 sm:flex sm:max-w-md">
              <Input
                type="email"
                name="email-address"
                autoComplete="email"
                placeholder="Enter your email"
              />
              <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                <Button variant="secondary" type="submit">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 ">
          <p className="text-xs leading-5 text-slate-300 py-4 text-center md:text-left">
            &copy; 2023 Your Company, Inc. All rights reserved.
          </p>
          <div className="text-white py-4 justify-self-center">
            <div className="flex items-end">
              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="mx-8" size={24} />
              </Link>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mx-8" size={24} />
              </Link>
              <Link
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="mx-8" size={24} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
