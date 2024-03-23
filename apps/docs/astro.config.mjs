import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import vercelStatic from "@astrojs/vercel/static";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://sp-hooks.js.org/",
  output: "static",
  adapter: vercelStatic(),
  integrations: [
    starlight({
      title: "Search Params Hooks",
      social: {
        github: "https://github.com/bring-shrubbery/sp-hooks",
        discord: "https://discord.gg/fnp5zwCczT",
      },
      sidebar: [
        {
          label: "Getting started",
          items: [
            { label: "Introduction", link: "/getting-started/introduction/" },
            { label: "Starting with React", link: "/getting-started/react/" },
            {
              label: "Starting with Next.js",
              link: "/getting-started/nextjs/",
            },
          ],
        },
        {
          label: "Guides",
          items: [
            { label: "Basic", link: "/guides/basic/" },
            { label: "With default values", link: "/guides/default-values" },
            {
              label: "React Server Components (in Next.js)",
              link: "/guides/rsc",
            },
            { label: "With validation (wip)", link: "/guides/validation" },
            { label: "With Jotai", link: "/guides/jotai" },
            { label: "With Zustand", link: "/guides/zustand" },
            { label: "With Redux", link: "/guides/redux" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
      customCss: ["./src/tailwind.css"],
    }),
    tailwind({ applyBaseStyles: false }),
  ],
});
