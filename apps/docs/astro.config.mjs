import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "use-search-params-state docs",
      social: {
        github: "https://github.com/bring-shrubbery/use-search-params-state",
        discord: "https://discord.gg/fnp5zwCczT",
      },
      sidebar: [
        {
          label: "Getting started",
          items: [],
        },
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", link: "/guides/example/" },
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
