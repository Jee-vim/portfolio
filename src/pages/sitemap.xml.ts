import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { DOMAIN } from "../utils/constants.ts";

export const GET: APIRoute = async () => {
  const now = new Date();

  const posts = (await getCollection("blog"))
    .filter((post) => {
      if (post.data.status === "PUBLISH") return true;

      if (post.data.status === "SCHEDULE" && post.data.date <= now) {
        return true;
      }

      return false;
    })
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const urls = [
    `${DOMAIN}/`,
    `${DOMAIN}/blog`,
    ...posts.map((post) => `${DOMAIN}/blog/${post.slug}`),
  ]
    .map(
      (url) => `
  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === `${DOMAIN}/` ? "1.0" : "0.8"}</priority>
  </url>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
