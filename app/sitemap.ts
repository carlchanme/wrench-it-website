import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.wrenchit.io",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.wrenchit.io/privacy",
      lastModified: new Date("2026-10-28"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
