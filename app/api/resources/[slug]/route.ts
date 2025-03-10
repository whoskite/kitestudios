import { NextRequest, NextResponse } from 'next/server'

// In a real implementation, this would be connected to a database
// For now, we'll use a mock database
const mockResources = [
  {
    slug: 'hello-world',
    title: 'Hello World',
    description: 'A simple Hello World document created in the Hub Dashboard.',
    url: 'https://example.com/hello-world',
    type: 'document',
    tags: ['documentation', 'example'],
    date: '2024-05-15',
    content: `
# Hello World

## Introduction
This is a simple Hello World document created in the KITESTUDIOS Hub Dashboard.

## ASCII Art Globe
\`\`\`
         _____
     ,-:´     \`:-.
   ,´           \`.
  /               \\
 |                 |
 |                 |
 |                 |
  \\               /
   \`.           ,´
     \`-._____.-´
\`\`\`

## Content
Hello, World! This is a test document to demonstrate the document creation functionality in the Hub Dashboard.

## Purpose
This document serves as a basic example of content that can be created and shared within the KITESTUDIOS ecosystem.

## Next Steps
Feel free to edit this document or create new ones to share information, ideas, and resources with the team.
    `,
    author: 'KITESTUDIOS Team',
    size: '1.5 KB'
  },
  {
    slug: 'design-system-overview',
    title: 'KITESTUDIOS Design System Overview',
    description: 'Comprehensive documentation of our design system including typography, colors, and components.',
    url: 'https://example.com/design-system',
    type: 'document',
    tags: ['design', 'documentation'],
    date: '2024-04-15',
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
    author: 'KITESTUDIOS Design Team',
    size: '4.2 MB'
  },
  {
    slug: 'gallery-82-github',
    title: 'Gallery 82 GitHub Repository',
    description: 'Main repository for the Gallery 82 project with all source code and documentation.',
    url: 'https://github.com/kitestudios/gallery82',
    type: 'github',
    tags: ['code', 'repository'],
    date: '2024-04-20',
    content: `
# Gallery 82 Repository

## Overview
This repository contains the source code for the Gallery 82 project, a virtual exhibition space for digital art and design.

## Technology Stack
- Next.js for the frontend framework
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- Vercel for deployment

## Key Features
- Virtual gallery spaces
- Interactive exhibits
- Post-it notes for visitor comments
- Resource hub for design and development assets

## Getting Started
To run this project locally:
1. Clone the repository
2. Install dependencies with \`npm install\`
3. Run the development server with \`npm run dev\`
4. Open http://localhost:3000 in your browser
    `,
    author: 'KITESTUDIOS Development Team',
    size: '15.3 MB'
  },
  {
    slug: 'studio-session-design-process',
    title: 'Studio Session: Design Process',
    description: 'Behind-the-scenes video of our design process for the latest collection.',
    url: 'https://example.com/videos/design-process',
    type: 'video',
    tags: ['video', 'design'],
    date: '2024-04-25',
    content: `
# Studio Session: Design Process

## About This Video
This video provides an inside look at our design process, from initial concept sketches to final implementation.

## Key Moments
- 0:00 - Introduction
- 2:15 - Concept Development
- 8:30 - Sketching and Ideation
- 15:45 - Digital Prototyping
- 23:10 - User Testing
- 30:25 - Refinement and Implementation

## Featured Team Members
- Lead Designer: Alex Chen
- UI Developer: Jordan Smith
- Creative Director: Taylor Wong

## Related Resources
Check out our design system documentation and UI component library for more insights into our design approach.
    `,
    author: 'KITESTUDIOS Media Team',
    size: '128 MB',
    featured_image: '/images/video-thumbnail.jpg'
  },
  {
    slug: 'future-mode-concept',
    title: 'Future Mode Concept',
    description: 'Concept document outlining the vision and implementation of the Future Mode feature.',
    url: 'https://example.com/concepts/future-mode',
    type: 'idea',
    tags: ['concept', 'future'],
    date: '2024-04-22',
    content: `
# Future Mode Concept

## Vision
Future Mode is an alternative UI state that presents content with a futuristic, AI-inspired aesthetic. It's designed to provide users with a glimpse of how our interface might evolve in the coming years.

## Design Elements
- Grid-based backgrounds with subtle animation
- Gradient text effects with cyberpunk-inspired color schemes
- Glitch animations for text and UI elements
- Terminal-inspired typography and layout
- Scan line effects and digital artifacts

## Implementation
Future Mode is implemented as a toggle that users can activate to transform the interface. The implementation uses CSS variables, custom animations, and conditional rendering to switch between standard and future modes.

## User Experience Considerations
- Future Mode should be an opt-in experience
- All functionality must remain accessible in Future Mode
- Performance should not be significantly impacted
- The transition between modes should be smooth and engaging
    `,
    author: 'KITESTUDIOS UX Team',
    size: '1.2 MB'
  }
]

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    
    // In a real implementation, this would query a database
    const resource = mockResources.find(r => r.slug === slug)
    
    if (!resource) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(resource)
  } catch (error) {
    console.error('Error fetching resource:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 