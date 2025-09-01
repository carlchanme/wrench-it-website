"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { ArrowRight, Calendar, Clock, User, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BlogSearch } from "@/components/blog-search"
import { BlogPost } from "@/lib/blog-data"

interface BlogPageClientProps {
  allPosts: BlogPost[]
  featuredPosts: BlogPost[]
}

export function BlogPageClient({ allPosts, featuredPosts }: BlogPageClientProps) {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(allPosts)

  const regularPosts = filteredPosts.filter(post => !post.featured)
  const displayFeaturedPosts = featuredPosts.filter(post => filteredPosts.includes(post))

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Stay updated with the latest trends in software development, AI automation, 
              and technology insights from our team of experts.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <span>{allPosts.length} articles</span>
              <span>•</span>
              <Link href="/blog/feed.xml" className="hover:text-primary transition-colors">
                RSS Feed
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <BlogSearch 
            onResults={setFilteredPosts}
            initialPosts={allPosts}
          />
        </div>
      </section>

      {/* Featured Posts */}
      {displayFeaturedPosts.length > 0 && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Featured Articles</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {displayFeaturedPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <div className="text-4xl">📝</div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
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
                    <h3 className="text-2xl font-bold mb-4 line-clamp-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-6 line-clamp-3">{post.excerpt}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{post.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium">{post.author}</span>
                      </div>
                      <Button asChild>
                        <Link href={`/blog/${post.id}`}>
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or browse all articles.
              </p>
              <Button onClick={() => setFilteredPosts(allPosts)}>
                Show All Articles
              </Button>
            </div>
          ) : regularPosts.length > 0 ? (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  {filteredPosts.length < allPosts.length ? 'Search Results' : 'Latest Articles'}
                </h2>
                {filteredPosts.length < allPosts.length && (
                  <p className="text-muted-foreground">
                    Showing {filteredPosts.length} of {allPosts.length} articles
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <Card key={post.id} className="h-full hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      <div className="text-2xl">📖</div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                      <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{post.tags.length - 2}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-3 h-3 text-primary" />
                          </div>
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                      
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href={`/blog/${post.id}`}>
                          Read Article
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to get the latest articles and insights 
            delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md text-foreground"
            />
            <Button variant="secondary">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}