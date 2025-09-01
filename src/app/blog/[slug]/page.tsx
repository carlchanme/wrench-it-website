import type { Metadata } from "next"
import Link from "next/link"
import { Calendar, Clock, User, ArrowLeft, Tag, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { SocialShare, SocialShareFloating } from "@/components/social-share"
import { getPostBySlug, getAllPosts, calculateReadingTime } from "@/lib/blog-data"
import { notFound } from "next/navigation"

// Simple markdown to HTML converter for blog content
function formatContent(content: string): string {
  if (!content) return '';
  
  return content
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
    .replace(/^---$/gm, '<hr class="my-8 border-border" />')
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^\*(.+)$/gm, '<li class="ml-4">$1</li>')
    .replace(/(<li[\s\S]*<\/li>)/g, '<ul class="list-disc ml-6 mb-4">$1</ul>')
    .replace(/^(.+)$/gm, '<p class="mb-4">$1</p>');
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.id,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found."
    }
  }

  return {
    title: `${post.title} | WrenchIt Blog`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      url: `/blog/${post.id}`,
    },
    twitter: {
      title: post.title,
      description: post.excerpt,
      card: "summary_large_image",
    },
    alternates: {
      canonical: `https://wrenchit.io/blog/${post.id}`,
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Constants
  const SITE_URL = 'https://wrenchit.io';
  const MAX_RELATED_POSTS = 3;
  
  const postUrl = `${SITE_URL}/blog/${post.id}`;
  const relatedPosts = getAllPosts()
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, MAX_RELATED_POSTS);


  return (
    <>
      <article className="min-h-screen">
        {/* Social Share Floating */}
        <SocialShareFloating 
          url={postUrl}
          title={post.title}
          description={post.excerpt}
          hashtags={post.tags}
        />

        {/* Hero Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Button asChild variant="ghost" className="mb-8">
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>

              <div className="flex items-center flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {post.category}
                </Badge>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
              <p className="text-xl text-muted-foreground mb-8">{post.excerpt}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{post.author}</p>
                    <p className="text-sm text-muted-foreground">Founder & CEO</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Share2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Share this article</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div 
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
              />
            </div>
          </div>
        </section>

        {/* Social Share Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <SocialShare 
                url={postUrl}
                title={post.title}
                description={post.excerpt}
                hashtags={post.tags}
              />
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <div className="text-2xl">📖</div>
                      </div>
                      <CardContent className="p-6">
                        <Badge variant="outline" className="mb-3 text-xs">
                          {relatedPost.category}
                        </Badge>
                        <h3 className="font-bold mb-2 line-clamp-2">{relatedPost.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        <Button asChild variant="outline" size="sm" className="w-full">
                          <Link href={`/blog/${relatedPost.id}`}>
                            Read More
                            <ArrowLeft className="ml-2 h-3 w-3" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl opacity-90 mb-8">
                Let's discuss how we can help transform your business with cutting-edge solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  <Link href="/services">View Our Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  )
}
