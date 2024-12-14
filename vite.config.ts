import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { execSync } from 'child_process'
import { writeFileSync } from 'fs'
import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: 'https://aioutfitgenerator.online' });

  const links = [
    { url: '/', changefreq: 'daily', priority: 1 },
    { url: '/privacy', changefreq: 'monthly', priority: 0.8 },
    { url: '/terms', changefreq: 'monthly', priority: 0.8 },
    { url: '/how-it-works', changefreq: 'weekly', priority: 0.9 },
    { url: '/contact', changefreq: 'monthly', priority: 0.8 },
  ];

  const stream = Readable.from(links).pipe(sitemap);
  const data = await streamToPromise(stream);
  writeFileSync('./public/sitemap.xml', data.toString());
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'generate-sitemap',
      buildStart: async () => {
        await generateSitemap();
      },
    },
  ],
  base: '', // This ensures assets are loaded correctly
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate a single CSS file
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // Ensure consistent file names for WordPress
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  server: {
    port: 8080
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})