import type { Metadata } from "next"
import { getAllPosts, getFeaturedPosts } from "@/lib/blog-data"
import { BlogPageClient } from "./blog-page-client"

export const metadata: Metadata = {
  title: "Blog - Tech Insights & Tutorials",
  description: "Stay updated with the latest trends in software development, AI automation, and technology insights from WrenchIt's team of experts.",
  keywords: [
    "tech blog",
    "software development blog",
    "AI automation articles",
    "web development tutorials",
    "mobile app development",
    "programming insights",
    "technology trends"
  ],
  openGraph: {
    title: "WrenchIt Blog - Tech Insights & Tutorials",
    description: "Expert insights on software development, AI automation, and cutting-edge technology trends.",
    url: "/blog",
    type: "website",
  },
  twitter: {
    title: "WrenchIt Blog - Tech Insights & Tutorials",
    description: "Expert insights on software development, AI automation, and cutting-edge technology trends.",
  },
  alternates: {
    canonical: "https://wrenchit.io/blog",
    types: {
      "application/rss+xml": [
        { url: "/blog/feed.xml", title: "WrenchIt Blog RSS Feed" },
      ],
    },
  },
}

export default function BlogPage() {
  const allPosts = getAllPosts()
  const featuredPosts = getFeaturedPosts()

  return (
    <BlogPageClient
      allPosts={allPosts}
      featuredPosts={featuredPosts}
    />
  )
}