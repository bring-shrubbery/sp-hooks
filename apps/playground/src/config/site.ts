import { env } from "@/lib/env.mjs";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js",
  url: env.NEXT_PUBLIC_APP_URL,
  description:
    "use-search-params-state is a React hook for managing state in the URL query string for Next.js and other Frontend .",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    github: "https://github.com/bring-shrubbery/use-search-params-state",
    docs: "https://use-search-params-state.js.org",
  },
};
