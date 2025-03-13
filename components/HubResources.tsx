'use client';

import { useState, useEffect } from 'react';
import { fetchAPI, formatDate } from '@/lib/strapi';
import Link from 'next/link';

interface Resource {
  id: number;
  attributes: {
    title: string;
    description: string;
    published: string;
    author: string;
    type: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  };
}

export default function HubResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useFallback, setUseFallback] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [apiUrl, setApiUrl] = useState<string>('');

  useEffect(() => {
    // Get the API URL from environment variable
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || '';
    setApiUrl(strapiUrl);
    
    const getResources = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching resources from Strapi at:', strapiUrl);
        
        // Re-enable the actual API call for debugging
        try {
          const response = await fetchAPI('/resources', {
            populate: '*',
            sort: ['published:desc'],
            pagination: {
              page: 1,
              pageSize: 10,
            },
          });
          
          console.log('Strapi response:', response);
          setDebugInfo(response);
          
          if (response.data && response.data.length > 0) {
            console.log('Setting resources from Strapi:', response.data);
            setResources(response.data);
            setUseFallback(false);
          } else {
            console.log('No resources found in Strapi, using fallback data');
            setUseFallback(true);
            // Use fallback data if no resources are returned
            setResources(getFallbackResources());
          }
        } catch (apiError: any) {
          console.error('API call error:', apiError);
          setDebugInfo({
            error: apiError?.message || 'Unknown API error',
            stack: apiError?.stack || 'No stack trace available'
          });
          throw apiError; // Re-throw to be caught by the outer catch
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching resources from Strapi:', error);
        setError('Failed to load resources. Please try again later.');
        setIsLoading(false);
        setUseFallback(true);
        
        // Fallback to hardcoded data if Strapi is not available
        setResources(getFallbackResources());
      }
    };

    getResources();
  }, []);

  // Function to get fallback resources
  const getFallbackResources = (): Resource[] => {
    console.log('Using fallback hardcoded resources');
    return [
      {
        id: 1,
        attributes: {
          title: 'Hello World',
          description: 'A simple Hello World document created in the Hub Dashboard.',
          published: '2024-05-15T00:00:00.000Z',
          author: 'KITESTUDIOS Team',
          type: 'DOCUMENT',
          slug: 'hello-world',
          createdAt: '2024-05-15T00:00:00.000Z',
          updatedAt: '2024-05-15T00:00:00.000Z',
        }
      },
      {
        id: 2,
        attributes: {
          title: 'KITESTUDIOS Design System Overview',
          description: 'Comprehensive documentation of our design system including typography, colors, and components.',
          published: '2024-04-15T00:00:00.000Z',
          author: 'Thomas Kite',
          type: 'DOCUMENT',
          slug: 'design-system-overview',
          createdAt: '2024-04-15T00:00:00.000Z',
          updatedAt: '2024-04-15T00:00:00.000Z',
        }
      }
    ];
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="bg-black p-6 rounded-lg border border-gray-800 animate-pulse">
            <div className="h-6 bg-gray-800 rounded w-1/4 mb-2"></div>
            <div className="h-8 bg-gray-800 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-800 rounded w-2/3 mb-6"></div>
            <div className="h-5 bg-gray-800 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error && resources.length === 0) {
    return (
      <div className="p-4 bg-red-900 text-red-200 rounded-md">
        <p>{error}</p>
        {debugInfo && (
          <div className="mt-4 p-4 bg-gray-900 rounded-md overflow-auto max-h-60">
            <pre className="text-xs text-gray-300">{JSON.stringify(debugInfo, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {useFallback && (
        <div className="col-span-2 mb-4 p-4 bg-yellow-900/50 text-yellow-200 rounded-md">
          <p>⚠️ Using fallback data. Make sure your Strapi server is running and resources are published.</p>
          <p className="mt-1 text-sm">API URL: {apiUrl || 'Not set'}</p>
          {debugInfo && (
            <details className="mt-2">
              <summary className="cursor-pointer text-sm">Show debug info</summary>
              <div className="mt-2 p-2 bg-gray-900 rounded-md overflow-auto max-h-60">
                <pre className="text-xs text-gray-300">{JSON.stringify(debugInfo, null, 2)}</pre>
              </div>
            </details>
          )}
        </div>
      )}
      
      {resources.map((resource) => (
        <Link 
          href={`/resource/${resource.attributes.slug}`} 
          key={resource.id}
          className="bg-black p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-400">{resource.attributes.type}</span>
            </div>
            <span className="text-sm text-gray-400">
              {new Date(resource.attributes.published).toISOString().split('T')[0].replace(/-/g, '-')}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">{resource.attributes.title}</h3>
          <p className="text-gray-300 mb-4">{resource.attributes.description}</p>
          
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-gray-400">{resource.attributes.author}</span>
          </div>
        </Link>
      ))}
    </div>
  );
} 