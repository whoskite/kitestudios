"use client"

import { useState, useEffect } from 'react'
import { Search, FileIcon, Github, FileText, Video, FolderIcon, ChevronDown, ChevronRight, Grid, List, Plus, User, X } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from 'next-themes'

// Define resource types and interfaces
type ResourceType = 'video' | 'github' | 'document' | 'idea' | 'other' | 'audio';

// Define categories
type CategoryType = 'all' | 'design' | 'code' | 'media' | 'concepts';

interface Resource {
  title: string;
  description: string;
  url: string;
  type: ResourceType;
  tags: string[];
  date: string;
  size?: string;
  modified?: string;
  slug?: string;
  category: CategoryType;
  author: string;
  content?: string; // Add content field for document view
}

// Interface for folder structure
interface FolderStructure {
  [key: string]: string[];
}

interface LinkHubProps {
  isDarkMode: boolean;
}

export default function LinkHub({ isDarkMode }: LinkHubProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'file'>('grid');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(["DOCUMENTS"]);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Resource | null>(null);
  
  // Define UI colors based on dark mode
  const uiColors = {
    bg: isDarkMode ? 'bg-black' : 'bg-white',
    text: isDarkMode ? 'text-white' : 'text-black',
    border: isDarkMode ? 'border-white/20' : 'border-black/20',
    hoverBg: isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5',
    activeBg: isDarkMode ? 'bg-white' : 'bg-black',
    activeText: isDarkMode ? 'text-black' : 'text-white',
  };
  
  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // State for resources - keep only one document
  const [resources, setResources] = useState<Resource[]>([
    {
      title: "KITESTUDIOS Design System Overview",
      description: "Comprehensive documentation of our design system including typography, colors, and components.",
      url: "https://example.com/design-system",
      type: "document",
      tags: ["design", "documentation", "typography", "colors"],
      date: "2024-04-15",
      size: "4.2 MB",
      modified: "2024-04-15",
      slug: "design-system-overview",
      category: "design",
      author: "Thomas Kite",
      content: `# KITESTUDIOS Design System

## Overview
This document provides a comprehensive overview of the KITESTUDIOS design system, including typography, colors, components, and usage guidelines.

## Typography
KITESTUDIOS uses a combination of Helvetica Neue for body text and JetBrains Mono for code and technical elements.

### Headings
- H1: 48px/56px, Helvetica Neue Bold
- H2: 36px/44px, Helvetica Neue Bold
- H3: 24px/32px, Helvetica Neue Bold
- H4: 18px/28px, Helvetica Neue Bold

### Body Text
- Body: 16px/24px, Helvetica Neue Regular
- Small: 14px/20px, Helvetica Neue Regular
- Caption: 12px/16px, Helvetica Neue Regular

## Color Palette
Our color system is designed to be bold, industrial, and accessible.

### Primary Colors
- Black (#000000): Primary text, borders, and UI elements
- White (#FFFFFF): Backgrounds and text on dark surfaces
- Yellow (#FFFF00): Accent color, highlights, and call-to-action elements

### Secondary Colors
- Gray Scale: A range from #F5F5F5 to #333333 for various UI elements
- Error Red: #FF3B30 for error states and destructive actions
- Success Green: #34C759 for success states and confirmations

## Components
Our component library follows industrial design principles with sharp edges, bold typography, and high contrast.

### Buttons
- Primary: Black background, white text, no border radius
- Secondary: White background, black border, black text
- Accent: Yellow background, black text
- Disabled: Gray background, light gray text

### Cards
- Standard: White background, black border, 0px border radius
- Hover: Subtle shadow effect
- Active: Black background, white text

### Navigation
- Desktop: Horizontal menu with uppercase labels
- Mobile: Off-canvas menu with bold typography
- Active State: Yellow underline or background

## Usage Guidelines
- Maintain high contrast for accessibility
- Use yellow sparingly for emphasis
- Prefer uppercase for labels and short headings
- Maintain the industrial aesthetic with sharp edges and bold typography
- Incorporate "OFF-WHITE" inspired elements like quotation marks and strikethrough text where appropriate`
    }
  ]);

  // Define folder structure - simplified with just one folder
  const folderStructure: FolderStructure = {
    "DOCUMENTS": ["design-system-overview"]
  };

  // Function to toggle folder expansion
  const toggleFolder = (folderName: string) => {
    if (expandedFolders.includes(folderName)) {
      setExpandedFolders(expandedFolders.filter(name => name !== folderName));
    } else {
      setExpandedFolders([...expandedFolders, folderName]);
    }
  };

  // Function to get icon based on resource type
  const getResourceIcon = (type: ResourceType) => {
    switch (type) {
      case 'video':
        return <Video size={16} />;
      case 'github':
        return <Github size={16} />;
      case 'document':
        return <FileText size={16} />;
      default:
        return <FileIcon size={16} />;
    }
  };

  // Function to handle adding a new resource (placeholder for now)
  const handleAddResource = () => {
    // This function won't be called when the button is disabled
    alert("Add new resource functionality will be implemented here");
    // In a real implementation, this would open a modal or form to add a new resource
  };

  // Filter resources based on active filter and search query
  const filteredResources = resources.filter(resource => {
    // Filter by category
    const categoryMatch = activeFilter === 'all' || resource.category === activeFilter;
    
    // Filter by search query
    const searchMatch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      resource.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  // Function to handle opening a document
  const handleOpenDocument = (resource: Resource) => {
    setSelectedDocument(resource);
  };

  // Function to close document view
  const handleCloseDocument = () => {
    setSelectedDocument(null);
  };

  return (
    <section className={`h-full ${uiColors.bg} ${uiColors.text}`}>
      <div className="container mx-auto px-4 h-full py-6">
        {selectedDocument ? (
          // Document View
          <div className={`${uiColors.bg} border ${uiColors.border} h-full`}>
            <div className={`border-b ${uiColors.border} p-4 flex justify-between items-center`}>
              <div>
                <h2 className="text-2xl font-bold">{selectedDocument.title}</h2>
                <div className="flex items-center mt-1 text-sm">
                  <User size={14} className="mr-2" />
                  <span>{selectedDocument.author}</span>
                  <span className="mx-2">•</span>
                  <span>{selectedDocument.date}</span>
                </div>
              </div>
              <button 
                onClick={handleCloseDocument}
                className={`border ${uiColors.border} p-2 ${uiColors.hoverBg} transition-colors`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
              <div className={`prose ${isDarkMode ? 'prose-invert' : ''} max-w-none`}>
                {selectedDocument.content?.split('\n').map((line, index) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={index} className="text-3xl font-bold mt-6 mb-4">{line.substring(2)}</h1>;
                  } else if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl font-bold mt-5 mb-3">{line.substring(3)}</h2>;
                  } else if (line.startsWith('### ')) {
                    return <h3 key={index} className="text-xl font-bold mt-4 mb-2">{line.substring(4)}</h3>;
                  } else if (line.startsWith('- ')) {
                    return <li key={index} className="ml-6 mb-1">{line.substring(2)}</li>;
                  } else if (line === '') {
                    return <br key={index} />;
                  } else {
                    return <p key={index} className="mb-4">{line}</p>;
                  }
                })}
              </div>
              <div className={`mt-8 pt-6 border-t ${uiColors.border}`}>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedDocument.tags.map((tag) => (
                    <span key={tag} className={`text-xs px-2 py-1 border ${uiColors.border}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-bold">Last modified:</span> {selectedDocument.modified}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Hub Dashboard View
          <>
            {/* Filter Buttons, Search, and View Toggle */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
              {/* Search Input - At the top on mobile, in the middle on desktop */}
              <div className="relative w-full md:w-64 order-first mb-4 md:mb-0">
                <input
                  type="text"
                  placeholder="Search dashboard..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full border ${uiColors.border} bg-transparent px-3 py-2 pl-10 focus:outline-none focus:border-${isDarkMode ? 'white' : 'black'}`}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
              </div>
              
              {/* Category Filter Buttons */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-start">
                <button 
                  className={`px-3 py-1 text-xs font-bold uppercase ${activeFilter === 'all' ? `${uiColors.activeBg} ${uiColors.activeText}` : `border ${uiColors.border}`}`}
                  onClick={() => setActiveFilter('all')}
                >
                  ALL
                </button>
                <button 
                  className={`px-3 py-1 text-xs font-bold uppercase ${activeFilter === 'design' ? `${uiColors.activeBg} ${uiColors.activeText}` : `border ${uiColors.border}`}`}
                  onClick={() => setActiveFilter('design')}
                >
                  DESIGN
                </button>
                <button 
                  className={`px-3 py-1 text-xs font-bold uppercase ${activeFilter === 'code' ? `${uiColors.activeBg} ${uiColors.activeText}` : `border ${uiColors.border}`}`}
                  onClick={() => setActiveFilter('code')}
                >
                  CODE
                </button>
                <button 
                  className={`px-3 py-1 text-xs font-bold uppercase ${activeFilter === 'media' ? `${uiColors.activeBg} ${uiColors.activeText}` : `border ${uiColors.border}`}`}
                  onClick={() => setActiveFilter('media')}
                >
                  MEDIA
                </button>
                <button 
                  className={`px-3 py-1 text-xs font-bold uppercase ${activeFilter === 'concepts' ? `${uiColors.activeBg} ${uiColors.activeText}` : `border ${uiColors.border}`}`}
                  onClick={() => setActiveFilter('concepts')}
                >
                  CONCEPTS
                </button>
              </div>
              
              {/* View Toggle */}
              <div className={`flex border ${uiColors.border} w-full md:w-auto justify-center md:justify-start mt-4 md:mt-0`}>
                <button 
                  className={`p-2 flex-1 md:flex-auto ${viewMode === 'grid' ? `${uiColors.activeBg} ${uiColors.activeText}` : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid View"
                >
                  <Grid className="h-5 w-5 mx-auto" />
                </button>
                <button 
                  className={`p-2 flex-1 md:flex-auto ${viewMode === 'file' ? `${uiColors.activeBg} ${uiColors.activeText}` : ''}`}
                  onClick={() => setViewMode('file')}
                  aria-label="File View"
                >
                  <List className="h-5 w-5 mx-auto" />
                </button>
              </div>
            </div>

            {/* Resources Display */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <div 
                    key={resource.slug}
                    onClick={() => handleOpenDocument(resource)}
                    className={`border ${uiColors.border} ${uiColors.hoverBg} transition-colors p-6 flex flex-col h-full cursor-pointer`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        {getResourceIcon(resource.type)}
                        <span className="text-xs font-bold uppercase ml-2">{resource.type}</span>
                      </div>
                      <div className="text-xs opacity-70">{resource.date}</div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                    <p className="text-sm mb-4 flex-grow opacity-80">{resource.description}</p>
                    
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {resource.tags.map((tag) => (
                          <span key={tag} className={`text-xs px-2 py-1 border ${uiColors.border}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Author information */}
                      <div className={`flex items-center mt-3 pt-3 border-t ${uiColors.border}`}>
                        <User size={14} className="mr-2" />
                        <span className="text-xs font-medium">{resource.author}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`file-system-container border ${uiColors.border}`}>
                {/* File System Header */}
                <div className="file-system-header">
                  <div className="file-system-column name-column">NAME</div>
                  <div className="file-system-column date-column">DATE ADDED</div>
                  <div className="file-system-column size-column">SIZE</div>
                  <div className="file-system-column kind-column">KIND</div>
                  <div className="file-system-column author-column">AUTHOR</div>
                </div>
                
                {/* File System Content */}
                <div className="file-system-content">
                  {/* Folders */}
                  {Object.keys(folderStructure).map((folderName) => (
                    <div key={folderName}>
                      {/* Folder Row */}
                      <div 
                        className="file-system-row folder-row"
                        onClick={() => toggleFolder(folderName)}
                      >
                        <div className="file-system-column name-column">
                          {expandedFolders.includes(folderName) ? 
                            <ChevronDown size={16} className="mr-1" /> : 
                            <ChevronRight size={16} className="mr-1" />
                          }
                          <FolderIcon size={16} className="mr-2" />
                          {folderName}
                        </div>
                        <div className="file-system-column date-column">-</div>
                        <div className="file-system-column size-column">-</div>
                        <div className="file-system-column kind-column">Folder</div>
                        <div className="file-system-column author-column">-</div>
                      </div>
                      
                      {/* Folder Contents */}
                      {expandedFolders.includes(folderName) && 
                        folderStructure[folderName].map((resourceSlug) => {
                          const resource = resources.find(r => r.slug === resourceSlug);
                          if (!resource) return null;
                          
                          return (
                            <div 
                              key={resource.slug}
                              onClick={() => handleOpenDocument(resource)}
                              className="file-system-row file-row cursor-pointer"
                            >
                              <div className="file-system-column name-column">
                                <div className="ml-6 flex items-center">
                                  {getResourceIcon(resource.type)}
                                  <span className="ml-2">{resource.title}</span>
                                </div>
                              </div>
                              <div className="file-system-column date-column">{resource.date}</div>
                              <div className="file-system-column size-column">{resource.size || '-'}</div>
                              <div className="file-system-column kind-column">{resource.type}</div>
                              <div className="file-system-column author-column">{resource.author}</div>
                            </div>
                          );
                        })
                      }
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
} 