import qs from 'qs';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

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
    
    // Return a default empty structure that matches Strapi's response format
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 0,
          total: 0
        }
      }
    };
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
  try {
    return await fetchAPI(`resources/${id}`, { populate: '*' });
  } catch (error) {
    // Return empty data structure for a single resource
    return {
      data: null,
      meta: {}
    };
  }
} 