import { env } from "@/lib/env.mjs";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js",
  url: env.NEXT_PUBLIC_APP_URL,
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
};
