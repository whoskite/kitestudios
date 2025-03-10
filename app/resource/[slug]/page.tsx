"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import OffWhiteNav from '@/components/OffWhiteNav'
import { Github, FileText, Video, FileIcon, ArrowLeft, Calendar, User, Tag } from 'lucide-react'
import Link from 'next/link'

// Define resource types and interfaces (same as in LinkHub)
type ResourceType = 'video' | 'github' | 'document' | 'idea' | 'other' | 'audio'

interface Resource {
  slug: string
  title: string
  description: string
  url: string
  type: ResourceType
  tags: string[]
  date: string
  content: string
  author: string
  size?: string
  modified?: string
  featured_image?: string
}

export default function ResourcePage() {
  const params = useParams()
  const { slug } = params
  
  const [resource, setResource] = useState<Resource | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // In a real implementation, this would fetch from your database
    // For now, we'll simulate with mock data
    const fetchResource = async () => {
      try {
        setLoading(true)
        
        // This would be replaced with an actual API call
        // e.g., const response = await fetch(`/api/resources/${slug}`)
        
        // Mock data for demonstration
        const mockResource: Resource = {
          slug: slug as string,
          title: "KITESTUDIOS Design System Overview",
          description: "Comprehensive documentation of our design system including typography, colors, and components.",
          url: "https://example.com/design-system",
          type: "document",
          tags: ["design", "documentation"],
          date: "2024-04-15",
          content: `
# KITESTUDIOS Design System

## Introduction
This document provides a comprehensive overview of the KITESTUDIOS design system, including our approach to typography, color, spacing, and component design.

## Typography
We use a combination of industrial sans-serif fonts for headings and body text:
- Headings: Helvetica Neue Bold
- Body: Helvetica Neue Regular
- Monospace: Space Mono (for code and technical content)

## Color System
Our color palette is inspired by industrial design and construction aesthetics:
- Primary: Black (#000000) and White (#FFFFFF)
- Accent: Yellow (#FFFF00) - our signature "caution tape" color
- Secondary: Various grays for subtle hierarchy

## Components
Our component library includes:
- Navigation elements
- Cards and containers
- Buttons and form elements
- Typography components
- Interactive elements

Each component is designed with both function and aesthetic in mind, emphasizing the industrial design language that defines our brand.
          `,
          author: "KITESTUDIOS Design Team",
          size: "4.2 MB"
        }
        
        // Simulate network delay
        setTimeout(() => {
          setResource(mockResource)
          setLoading(false)
        }, 500)
      } catch (err) {
        setError('Failed to load resource')
        setLoading(false)
        console.error(err)
      }
    }
    
    fetchResource()
  }, [slug])

  if (loading) {
    return (
      <div className="page-wrapper">
        <OffWhiteNav />
        <div className="min-h-screen bg-white dark:bg-black off-white-grid py-20">
          <div className="container mx-auto px-4">
            <div className="border-2 border-black dark:border-white p-12 flex items-center justify-center">
              <div className="text-2xl font-bold">Loading resource...</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !resource) {
    return (
      <div className="page-wrapper">
        <OffWhiteNav />
        <div className="min-h-screen bg-white dark:bg-black off-white-grid py-20">
          <div className="container mx-auto px-4">
            <div className="border-2 border-black dark:border-white p-12">
              <h1 className="text-3xl font-bold mb-4">Resource Not Found</h1>
              <p className="mb-6">The resource you're looking for doesn't exist or has been moved.</p>
              <Link href="/hub" className="inline-flex items-center border-2 border-black dark:border-white px-4 py-2 font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Resource Hub
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render different templates based on resource type
  return (
    <div className="page-wrapper">
      <OffWhiteNav />
      <div className="min-h-screen bg-white dark:bg-black off-white-grid py-20">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <Link href="/hub" className="inline-flex items-center mb-8 border-b-2 border-black dark:border-white font-bold hover:text-[#ffff00] transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Resource Hub
          </Link>

          {/* Resource header */}
          <div className="border-2 border-black dark:border-white mb-8 relative">
            <div className="absolute -top-3 -right-3 bg-[#ffff00] p-1 text-black z-10">
              <span className="text-xs font-bold uppercase">{resource.type}</span>
            </div>
            
            <div className="p-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 industrial-text">{resource.title}</h1>
              <p className="text-xl mb-6">{resource.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{resource.date}</span>
                </div>
                <div className="flex items-center text-sm">
                  <User className="mr-2 h-4 w-4" />
                  <span>{resource.author}</span>
                </div>
                {resource.size && (
                  <div className="flex items-center text-sm">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>{resource.size}</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag, index) => (
                  <div key={index} className="bg-black dark:bg-white text-white dark:text-black px-2 py-1 text-xs flex items-center">
                    <Tag className="mr-1 h-3 w-3" />
                    {tag.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resource content - different templates based on type */}
          {resource.type === 'document' && (
            <div className="border-2 border-black dark:border-white p-8">
              <div className="prose dark:prose-invert max-w-none">
                {/* In a real implementation, you would use a markdown renderer here */}
                <div dangerouslySetInnerHTML={{ __html: resource.content.split('\n').map(line => {
                  if (line.startsWith('# ')) return `<h1>${line.substring(2)}</h1>`
                  if (line.startsWith('## ')) return `<h2>${line.substring(3)}</h2>`
                  if (line.startsWith('- ')) return `<li>${line.substring(2)}</li>`
                  if (line === '') return '<br/>'
                  return `<p>${line}</p>`
                }).join('') }} />
              </div>
              
              <div className="mt-8 pt-8 border-t-2 border-black dark:border-white">
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center border-2 border-black dark:border-white px-4 py-2 font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  <FileText className="mr-2 h-4 w-4" /> Download Full Document
                </a>
              </div>
            </div>
          )}

          {resource.type === 'github' && (
            <div className="border-2 border-black dark:border-white p-8">
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: resource.content.split('\n').map(line => {
                  if (line.startsWith('# ')) return `<h1>${line.substring(2)}</h1>`
                  if (line.startsWith('## ')) return `<h2>${line.substring(3)}</h2>`
                  if (line.startsWith('- ')) return `<li>${line.substring(2)}</li>`
                  if (line === '') return '<br/>'
                  return `<p>${line}</p>`
                }).join('') }} />
              </div>
              
              <div className="mt-8 pt-8 border-t-2 border-black dark:border-white">
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center border-2 border-black dark:border-white px-4 py-2 font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  <Github className="mr-2 h-4 w-4" /> View Repository
                </a>
              </div>
            </div>
          )}

          {resource.type === 'video' && (
            <div className="border-2 border-black dark:border-white">
              <div className="aspect-video bg-black flex items-center justify-center">
                {/* In a real implementation, this would be an embedded video player */}
                <div className="text-white text-center p-8">
                  <Video className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-xl">Video player would be embedded here</p>
                  <p className="text-sm mt-2">In a real implementation, this would use an iframe or video component</p>
                </div>
              </div>
              
              <div className="p-8">
                <div className="prose dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: resource.content.split('\n').map(line => {
                    if (line.startsWith('# ')) return `<h1>${line.substring(2)}</h1>`
                    if (line.startsWith('## ')) return `<h2>${line.substring(3)}</h2>`
                    if (line.startsWith('- ')) return `<li>${line.substring(2)}</li>`
                    if (line === '') return '<br/>'
                    return `<p>${line}</p>`
                  }).join('') }} />
                </div>
                
                <div className="mt-8 pt-8 border-t-2 border-black dark:border-white">
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center border-2 border-black dark:border-white px-4 py-2 font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                  >
                    <Video className="mr-2 h-4 w-4" /> Watch on Original Platform
                  </a>
                </div>
              </div>
            </div>
          )}

          {(resource.type === 'idea' || resource.type === 'other') && (
            <div className="border-2 border-black dark:border-white p-8">
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: resource.content.split('\n').map(line => {
                  if (line.startsWith('# ')) return `<h1>${line.substring(2)}</h1>`
                  if (line.startsWith('## ')) return `<h2>${line.substring(3)}</h2>`
                  if (line.startsWith('- ')) return `<li>${line.substring(2)}</li>`
                  if (line === '') return '<br/>'
                  return `<p>${line}</p>`
                }).join('') }} />
              </div>
              
              <div className="mt-8 pt-8 border-t-2 border-black dark:border-white">
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center border-2 border-black dark:border-white px-4 py-2 font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  <FileIcon className="mr-2 h-4 w-4" /> View Full Resource
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 