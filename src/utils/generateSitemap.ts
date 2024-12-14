import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { Readable } from 'stream';

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
  
  // Write sitemap to public directory
  createWriteStream('./public/sitemap.xml').write(data.toString());
}

generateSitemap().catch(console.error);