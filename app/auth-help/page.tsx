"use client"

import { useState, useEffect } from 'react'
import OffWhiteNav from '@/components/OffWhiteNav'
import Link from 'next/link'
import { Copy, Check, AlertTriangle } from 'lucide-react'

export default function AuthHelpPage() {
  const [baseUrl, setBaseUrl] = useState('')
  const [copied, setCopied] = useState(false)
  
  useEffect(() => {
    // Get the base URL in the client
    setBaseUrl(window.location.origin)
  }, [])
  
  const redirectUri = `${baseUrl}/api/auth/callback/google`
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(redirectUri)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <div className="page-wrapper">
      <OffWhiteNav />
      <div className="min-h-screen bg-white dark:bg-black off-white-grid py-20">
        <div className="container mx-auto px-4 pt-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 industrial-text">GOOGLE OAUTH CONFIGURATION</h1>
            
            <div className="border-2 border-black dark:border-white p-8 mb-8">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 mr-2 text-red-500" />
                <h2 className="text-xl font-bold">Sign-in Error</h2>
              </div>
              
              <p className="mb-4">
                There was a problem signing in with Google. This could be due to one of the following reasons:
              </p>
              
              <ul className="list-disc pl-5 mb-6 space-y-2">
                <li>The Google OAuth configuration is incorrect</li>
                <li>Your email is not in the allowed list</li>
                <li>There's a network issue</li>
                <li>The redirect URI doesn't match what's configured in Google Cloud Console</li>
              </ul>
              
              <h3 className="text-lg font-bold mt-6 mb-2">Your Redirect URI:</h3>
              <div className="flex items-center mb-6">
                <code className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm flex-grow">
                  {redirectUri}
                </code>
                <button 
                  onClick={copyToClipboard}
                  className="ml-2 p-2 border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </button>
              </div>
              
              <h3 className="text-lg font-bold mt-6 mb-2">Steps to fix:</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Go to the <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Google Cloud Console</a></li>
                <li>Select your project</li>
                <li>Go to "Credentials"</li>
                <li>Edit your OAuth 2.0 Client ID</li>
                <li>Add the above URI to "Authorized redirect URIs"</li>
                <li>Click "Save"</li>
              </ol>
              
              <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-500">
                <h4 className="font-bold">Important:</h4>
                <p>Make sure to also add these URIs to your "Authorized JavaScript origins":</p>
                <ul className="list-disc pl-5 mt-2">
                  <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono text-sm">{baseUrl}</code></li>
                  <li>Any other domains where your app will run</li>
                </ul>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500">
                <h4 className="font-bold">Try clearing your cookies:</h4>
                <p>Sometimes authentication issues can be resolved by clearing your browser cookies and cache.</p>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Link 
                href="/"
                className="border-2 border-black dark:border-white px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                Back to Home
              </Link>
              <Link 
                href="/admin"
                className="border-2 border-black dark:border-white px-4 py-2 bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition-colors"
              >
                Try Login Again
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 