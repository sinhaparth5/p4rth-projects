// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import siteConfig from './src/data/site-config';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  site: siteConfig.website,
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [mdx(), sitemap({
    customPages: ["https://projects.parthsinha.com/blogs", "https://projects.parthsinha.com/projects"],
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date(),
  })]
});