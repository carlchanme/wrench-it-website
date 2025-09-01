import { getAllPosts } from "@/lib/blog-data"

export async function GET() {
  const posts = getAllPosts()
  const baseUrl = "https://wrenchit.io"
  
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>WrenchIt Blog</title>
    <description>Expert insights on software development, AI automation, and cutting-edge technology trends from WrenchIt.</description>
    <link>${baseUrl}/blog</link>
    <language>en-US</language>
    <managingEditor>carl@wrenchit.io (Carl Anderson)</managingEditor>
    <webMaster>carl@wrenchit.io (Carl Anderson)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/og-image.png</url>
      <title>WrenchIt Blog</title>
      <link>${baseUrl}/blog</link>
      <width>1200</width>
      <height>630</height>
    </image>
    ${posts.map(post => {
      const postUrl = `${baseUrl}/blog/${post.id}`
      const pubDate = new Date(post.date).toUTCString()
      const categories = [post.category, ...post.tags].map(cat => `<category>${cat}</category>`).join('')
      
      // Convert markdown content to HTML for RSS
      const htmlContent = post.content
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
        .replace(/^---$/gm, '<hr />')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(.+)$/gm, '<p>$1</p>')
        .replace(/<p><\/p>/g, '')
      
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>carl@wrenchit.io (${post.author})</author>
      ${categories}
      <content:encoded><![CDATA[${htmlContent}]]></content:encoded>
      <source url="${baseUrl}/blog/feed.xml">WrenchIt Blog</source>
    </item>`
    }).join('')}
  </channel>
</rss>`

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}