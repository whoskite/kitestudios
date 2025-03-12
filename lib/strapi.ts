import qs from 'qs';

// Check if we're in a production environment (like Vercel)
const isProduction = process.env.NODE_ENV === 'production' && process.env.VERCEL === '1';

// Use a mock API in production if NEXT_PUBLIC_STRAPI_URL is not set to a real URL
// This prevents trying to connect to localhost in production environments
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

// Determine if we should use mock data instead of trying to connect to Strapi
const useMockData = isProduction && (
  !process.env.NEXT_PUBLIC_STRAPI_URL || 
  process.env.NEXT_PUBLIC_STRAPI_URL.includes('localhost')
);

/**
 * Fetch data from Strapi API
 * @param endpoint - API endpoint
 * @param params - Query parameters
 * @returns Promise with the response data
 */
export async function fetchAPI(
  endpoint: string,
  params: Record<string, any> = {}
) {
  // If we're in production and should use mock data, return mock data immediately
  if (useMockData) {
    console.log('Using mock data for Strapi in production environment');
    return getMockData(endpoint);
  }

  // Build the query string
  const queryString = qs.stringify(params);
  const url = `${STRAPI_URL}/api/${endpoint}${queryString ? `?${queryString}` : ''}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Add authorization header if API token exists
  if (API_TOKEN) {
    headers.Authorization = `Bearer ${API_TOKEN}`;
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`Error fetching from Strapi: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // During build time or when Strapi is not available, return empty data
    console.error('Error fetching from Strapi:', error);
    
    // Return mock data when there's an error
    return getMockData(endpoint);
  }
}

/**
 * Get hub resources from Strapi
 * @param params - Query parameters for filtering, pagination, etc.
 * @returns Promise with resources data
 */
export async function getHubResources(params: Record<string, any> = {}) {
  const defaultParams = {
    populate: '*',
    sort: ['publishedAt:desc'],
    ...params,
  };

  return fetchAPI('resources', defaultParams);
}

/**
 * Get a single resource by ID
 * @param id - Resource ID
 * @returns Promise with resource data
 */
export async function getResourceById(id: string) {
  return fetchAPI(`resources/${id}`, { populate: '*' });
}

/**
 * Get mock data for different endpoints
 * @param endpoint - API endpoint
 * @returns Mock data that matches Strapi's response format
 */
function getMockData(endpoint: string) {
  // If endpoint is a specific resource (resources/1, resources/2, etc.)
  if (endpoint.match(/^resources\/\d+$/)) {
    return {
      data: {
        id: endpoint.split('/')[1],
        attributes: {
          title: 'Sample Resource',
          description: 'This is a sample resource for demonstration purposes.',
          content: '# Sample Resource\n\nThis is a placeholder for when Strapi is not available.',
          slug: 'sample-resource',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publishedAt: new Date().toISOString(),
          resourceType: 'documentation',
          coverImage: null
        }
      },
      meta: {}
    };
  }
  
  // Default response for resources endpoint
  return {
    data: [
      {
        id: 1,
        attributes: {
          title: 'Getting Started Guide',
          description: 'Learn how to get started with Kite Studios.',
          slug: 'getting-started',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publishedAt: new Date().toISOString(),
          resourceType: 'documentation',
          coverImage: null
        }
      },
      {
        id: 2,
        attributes: {
          title: 'Design System Documentation',
          description: 'Comprehensive guide to the Kite Studios design system.',
          slug: 'design-system',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publishedAt: new Date().toISOString(),
          resourceType: 'documentation',
          coverImage: null
        }
      }
    ],
    meta: {
      pagination: {
        page: 1,
        pageSize: 10,
        pageCount: 1,
        total: 2
      }
    }
  };
} 