import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// Add markdown config and content collections config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
      configFile: './tailwind.config.mjs',
    }),
    react(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'monokai',
      wrap: true
    }
  },
  // Add this content config
  content: {
    collections: [
      {
        name: 'team',
        pattern: 'src/content/team/**/*.md',
      },
      {
        name: 'news',
        pattern: 'src/content/news/**/*.md',
      },
      {
        name: 'case-studies',
        pattern: 'src/content/case-studies/**/*.md',
      },
      {
        name: 'articles',
        pattern: 'src/content/articles/**/*.md',
      },
      {
        name: 'courses',
        pattern: 'src/content/courses/**/*.md',
      },
    ],
  }
});