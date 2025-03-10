"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"
import OffWhiteNav from '@/components/OffWhiteNav'
import { FileText, Github, Video, FileIcon, Plus, Edit, Trash2, LogOut, LogIn } from 'lucide-react'
import Link from 'next/link'

// Mock resources (in a real app, fetch from API)
interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'github' | 'document' | 'idea' | 'other' | 'audio';
  slug: string;
  date: string;
  author: string;
}

export default function AdminPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [resources, setResources] = useState<Resource[]>([])
  const [isAddingResource, setIsAddingResource] = useState(false)
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    type: 'document' as const,
    slug: '',
    content: ''
  })

  // Fetch resources when session is available
  useEffect(() => {
    if (status === 'loading') {
      setIsLoading(true)
      return
    }
    
    if (status === 'authenticated' && session?.user) {
      // Fetch resources (mock for now)
      setResources([
        {
          id: '1',
          title: 'KITESTUDIOS Design System Overview',
          description: 'Comprehensive documentation of our design system.',
          type: 'document',
          slug: 'design-system-overview',
          date: '2024-04-15',
          author: 'KITESTUDIOS Design Team'
        },
        {
          id: '2',
          title: 'Gallery 82 GitHub Repository',
          description: 'Main repository for the Gallery 82 project.',
          type: 'github',
          slug: 'gallery-82-github',
          date: '2024-04-20',
          author: 'KITESTUDIOS Development Team'
        },
        {
          id: '3',
          title: 'Studio Session: Design Process',
          description: 'Behind-the-scenes video of our design process.',
          type: 'video',
          slug: 'studio-session-design-process',
          date: '2024-04-25',
          author: 'KITESTUDIOS Media Team'
        }
      ])
    }
    
    setIsLoading(false)
  }, [status, session])

  // Handle login with Google
  const handleLogin = async () => {
    await signIn('google', { callbackUrl: '/admin' })
  }

  // Handle logout
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/admin' })
  }

  // Mock resource creation (in a real app, call API)
  const handleCreateResource = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!newResource.title || !newResource.description || !newResource.type || !newResource.slug) {
      alert('Please fill out all required fields')
      return
    }
    
    // In a real app, this would call an API endpoint
    const newId = (resources.length + 1).toString()
    const createdResource: Resource = {
      id: newId,
      title: newResource.title,
      description: newResource.description,
      type: newResource.type,
      slug: newResource.slug,
      date: new Date().toISOString().split('T')[0],
      author: session?.user?.name || 'Unknown'
    }
    
    setResources([...resources, createdResource])
    setIsAddingResource(false)
    setNewResource({
      title: '',
      description: '',
      type: 'document',
      slug: '',
      content: ''
    })
  }

  // Mock resource deletion (in a real app, call API)
  const handleDeleteResource = async (id: string) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      // In a real app, this would call an API endpoint
      setResources(resources.filter(r => r.id !== id))
    }
  }

  // Loading state
  if (isLoading || status === 'loading') {
    return (
      <div className="page-wrapper">
        <OffWhiteNav />
        <div className="min-h-screen bg-white dark:bg-black off-white-grid py-20">
          <div className="container mx-auto px-4">
            <div className="border-2 border-black dark:border-white p-12 flex items-center justify-center">
              <div className="text-2xl font-bold">Loading...</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Not authenticated
  if (status === 'unauthenticated' || !session) {
    return (
      <div className="page-wrapper">
        <OffWhiteNav />
        <div className="min-h-screen bg-white dark:bg-black off-white-grid py-20">
          <div className="container mx-auto px-4">
            <div className="border-2 border-black dark:border-white p-12">
              <h1 className="text-3xl font-bold mb-8 industrial-text">RESOURCE HUB ADMIN</h1>
              
              <div className="mb-8">
                <p className="mb-4">You need to be authenticated to access the admin panel.</p>
                
                <button 
                  onClick={handleLogin}
                  className="flex items-center border-2 border-black dark:border-white px-4 py-2 font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  <LogIn className="mr-2 h-4 w-4" /> Sign in with Google
                </button>
              </div>
              
              <div className="mt-8 pt-8 border-t-2 border-black dark:border-white">
                <Link href="/hub" className="text-sm hover:underline">
                  Return to Resource Hub
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Admin interface
  return (
    <div className="page-wrapper">
      <OffWhiteNav />
      <div className="min-h-screen bg-white dark:bg-black off-white-grid py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold mb-4 md:mb-0 industrial-text">RESOURCE HUB ADMIN</h1>
            
            <div className="flex items-center">
              <div className="mr-4 flex items-center">
                <img 
                  src={session.user.image || 'https://via.placeholder.com/40'} 
                  alt={session.user.name || 'User'} 
                  className="w-8 h-8 rounded-full mr-2 border-2 border-black dark:border-white"
                />
                <span className="text-sm font-bold">{session.user.name}</span>
              </div>
              
              <button 
                onClick={handleLogout}
                className="border-2 border-black dark:border-white p-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Resources</h2>
              
              <button 
                onClick={() => setIsAddingResource(!isAddingResource)}
                className="flex items-center border-2 border-black dark:border-white px-3 py-1 text-sm font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                {isAddingResource ? 'Cancel' : <><Plus className="mr-1 h-4 w-4" /> Add Resource</>}
              </button>
            </div>
            
            {isAddingResource && (
              <div className="border-2 border-black dark:border-white p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">Add New Resource</h3>
                
                <form onSubmit={handleCreateResource}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-bold mb-2">Title</label>
                      <input 
                        type="text" 
                        value={newResource.title}
                        onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                        className="w-full border-2 border-black dark:border-white bg-transparent p-2"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold mb-2">Slug</label>
                      <input 
                        type="text" 
                        value={newResource.slug}
                        onChange={(e) => setNewResource({...newResource, slug: e.target.value})}
                        className="w-full border-2 border-black dark:border-white bg-transparent p-2"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold mb-2">Type</label>
                      <select 
                        value={newResource.type}
                        onChange={(e) => setNewResource({...newResource, type: e.target.value as any})}
                        className="w-full border-2 border-black dark:border-white bg-transparent p-2"
                        required
                      >
                        <option value="document">Document</option>
                        <option value="github">GitHub</option>
                        <option value="video">Video</option>
                        <option value="idea">Idea</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold mb-2">Description</label>
                      <input 
                        type="text" 
                        value={newResource.description}
                        onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                        className="w-full border-2 border-black dark:border-white bg-transparent p-2"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Content (Markdown)</label>
                    <textarea 
                      value={newResource.content}
                      onChange={(e) => setNewResource({...newResource, content: e.target.value})}
                      className="w-full border-2 border-black dark:border-white bg-transparent p-2 h-40"
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      type="submit"
                      className="flex items-center border-2 border-black dark:border-white px-4 py-2 font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Create Resource
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            <div className="border-2 border-black dark:border-white">
              <div className="grid grid-cols-12 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase py-2 px-4">
                <div className="col-span-1">Type</div>
                <div className="col-span-3">Title</div>
                <div className="col-span-3">Slug</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2">Author</div>
                <div className="col-span-1">Actions</div>
              </div>
              
              {resources.length === 0 ? (
                <div className="p-8 text-center">
                  <p>No resources found. Add your first resource to get started.</p>
                </div>
              ) : (
                resources.map((resource) => (
                  <div key={resource.id} className="grid grid-cols-12 items-center py-3 px-4 border-t border-black dark:border-white">
                    <div className="col-span-1">
                      {resource.type === 'document' && <FileText className="h-5 w-5" />}
                      {resource.type === 'github' && <Github className="h-5 w-5" />}
                      {resource.type === 'video' && <Video className="h-5 w-5" />}
                      {resource.type === 'idea' && <FileIcon className="h-5 w-5" />}
                    </div>
                    <div className="col-span-3 font-bold truncate">{resource.title}</div>
                    <div className="col-span-3 text-sm truncate">{resource.slug}</div>
                    <div className="col-span-2 text-sm">{resource.date}</div>
                    <div className="col-span-2 text-sm truncate">{resource.author}</div>
                    <div className="col-span-1 flex space-x-2">
                      <Link 
                        href={`/admin/edit/${resource.id}`}
                        className="p-1 hover:text-[#ffff00]"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button 
                        onClick={() => handleDeleteResource(resource.id)}
                        className="p-1 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t-2 border-black dark:border-white">
            <Link href="/hub" className="text-sm hover:underline">
              Return to Resource Hub
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 