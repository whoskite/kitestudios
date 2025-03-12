"use client"

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from "next-auth/react"
import OffWhiteNav from '@/components/OffWhiteNav'
import { LogIn } from 'lucide-react'
import Link from 'next/link'

// Create a separate component that uses useSearchParams
function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/hub'
  const [isLoading, setIsLoading] = useState(false)

  // Handle login with Google
  const handleLogin = async () => {
    setIsLoading(true)
    await signIn('google', { callbackUrl })
  }

  return (
    <div className="mb-8">
      <p className="mb-6">Sign in to access the KITESTUDIOS Resource Hub.</p>
      
      <button 
        onClick={handleLogin}
        disabled={isLoading}
        className="w-full flex items-center justify-center border-2 border-gray-200 dark:border-zinc-800 px-4 py-3 font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
      >
        {isLoading ? (
          <span>Signing in...</span>
        ) : (
          <>
            <LogIn className="mr-2 h-4 w-4" /> Sign in with Google
          </>
        )}
      </button>
    </div>
  )
}

// Main component with Suspense boundary
export default function LoginPage() {
  return (
    <div className="page-wrapper">
      <OffWhiteNav />
      <div className="min-h-screen bg-white dark:bg-black off-white-grid py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto border-2 border-gray-200 dark:border-zinc-800 p-12">
            <h1 className="text-3xl font-bold mb-8 industrial-text">RESOURCE HUB LOGIN</h1>
            
            <Suspense fallback={<div>Loading...</div>}>
              <LoginForm />
            </Suspense>
            
            <div className="mt-8 pt-8 border-t-2 border-gray-200 dark:border-zinc-800">
              <Link href="/" className="text-sm hover:underline">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 