"use client"

import { useState, useEffect, useMemo } from "react"
import { Search, X, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BlogPost, searchPosts, getAllCategories, getAllTags } from "@/lib/blog-data"

interface BlogSearchProps {
  onResults: (posts: BlogPost[]) => void
  initialPosts: BlogPost[]
}

export function BlogSearch({ onResults, initialPosts }: BlogSearchProps) {
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const categories = useMemo(() => getAllCategories(), [])
  const tags = useMemo(() => getAllTags(), [])

  // Filter posts based on search criteria
  useEffect(() => {
    let filteredPosts = initialPosts

    // Apply text search
    if (query.trim()) {
      filteredPosts = searchPosts(query)
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== "all") {
      filteredPosts = filteredPosts.filter(post => post.category === selectedCategory)
    }

    // Apply tag filters
    if (selectedTags.length > 0) {
      filteredPosts = filteredPosts.filter(post =>
        selectedTags.some(tag => post.tags.includes(tag))
      )
    }

    onResults(filteredPosts)
  }, [query, selectedCategory, selectedTags, initialPosts, onResults])

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setQuery("")
    setSelectedCategory("all")
    setSelectedTags([])
  }

  const hasActiveFilters = query || selectedCategory !== "all" || selectedTags.length > 0

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search blog posts..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-8 w-8 p-0"
                onClick={() => setQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              {(selectedCategory !== "all" || selectedTags.length > 0) && (
                <Badge variant="secondary" className="ml-1">
                  {selectedCategory !== "all" ? 1 : 0 + selectedTags.length}
                </Badge>
              )}
            </Button>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground"
              >
                Clear all
              </Button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="space-y-4 pt-4 border-t">
              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tags Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/10"
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 pt-2 border-t">
              {query && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: "{query}"
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => setQuery("")}
                  />
                </Badge>
              )}
              
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Category: {selectedCategory}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => setSelectedCategory("all")}
                  />
                </Badge>
              )}
              
              {selectedTags.map(tag => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="flex items-center gap-1"
                >
                  Tag: {tag}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleTagToggle(tag)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}