"use client"

import { Share2, Twitter, Facebook, Linkedin, Link, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

interface SocialShareProps {
  url: string
  title: string
  description?: string
  hashtags?: string[]
}

export function SocialShare({ url, title, description, hashtags }: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description || "")
  const encodedHashtags = hashtags ? encodeURIComponent(hashtags.join(",")) : ""

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${encodedHashtags}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  const openShare = (platform: keyof typeof shareUrls) => {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400')
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Share2 className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Share this article</h3>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => openShare('twitter')}
            className="flex items-center space-x-2"
          >
            <Twitter className="h-4 w-4" />
            <span>Twitter</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => openShare('facebook')}
            className="flex items-center space-x-2"
          >
            <Facebook className="h-4 w-4" />
            <span>Facebook</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => openShare('linkedin')}
            className="flex items-center space-x-2"
          >
            <Linkedin className="h-4 w-4" />
            <span>LinkedIn</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="flex items-center space-x-2"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface SocialShareFloatingProps {
  url: string
  title: string
  description?: string
  hashtags?: string[]
}

export function SocialShareFloating({ url, title, description, hashtags }: SocialShareFloatingProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description || "")
  const encodedHashtags = hashtags ? encodeURIComponent(hashtags.join(",")) : ""

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${encodedHashtags}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  const openShare = (platform: keyof typeof shareUrls) => {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400')
  }

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
      <div className="flex flex-col items-center space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-12 h-12 p-0 shadow-lg"
        >
          <Share2 className="h-5 w-5" />
        </Button>
        
        {isOpen && (
          <div className="flex flex-col items-center space-y-2 bg-background border rounded-lg p-2 shadow-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openShare('twitter')}
              className="rounded-full w-10 h-10 p-0 hover:bg-blue-50 hover:text-blue-600"
            >
              <Twitter className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openShare('facebook')}
              className="rounded-full w-10 h-10 p-0 hover:bg-blue-50 hover:text-blue-800"
            >
              <Facebook className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openShare('linkedin')}
              className="rounded-full w-10 h-10 p-0 hover:bg-blue-50 hover:text-blue-700"
            >
              <Linkedin className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="rounded-full w-10 h-10 p-0 hover:bg-gray-50"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}