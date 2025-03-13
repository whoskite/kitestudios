import qs from 'qs';
import axios from 'axios';

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
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = '') {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${path}`;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ''}`
  )}`;

  // Trigger API call
  try {
    const response = await axios.get(requestUrl, mergedOptions);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Error fetching from Strapi API: ${error}`);
  }
}

/**
 * Helper to make POST requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} data Data to be posted
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function postAPI(path: string, data = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  // Build request URL
  const requestUrl = getStrapiURL(`/api${path}`);

  // Trigger API call
  try {
    const response = await axios.post(requestUrl, data, mergedOptions);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Error posting to Strapi API: ${error}`);
  }
}

/**
 * Get media URL from Strapi
 * @param {object} media Media object from Strapi
 * @returns {string} URL of the media
 */
export function getStrapiMedia(media: any) {
  if (!media) return null;
  
  const { url } = media.data.attributes;
  const imageUrl = url.startsWith('/') ? getStrapiURL(url) : url;
  return imageUrl;
}

/**
 * Format date from Strapi
 * @param {string} dateString Date string from Strapi
 * @returns {string} Formatted date
 */
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
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
 * Get articles from Strapi
 * @param params - Query parameters for filtering, pagination, etc.
 * @returns Promise with articles data
 */
export async function getArticles(params: Record<string, any> = {}) {
  const defaultParams = {
    populate: {
      cover: {
        fields: ['url', 'width', 'height', 'alternativeText']
      },
      category: {
        populate: true
      },
      author: {
        populate: true
      },
      blocks: {
        populate: '*'
      }
    },
    sort: ['publishedAt:desc'],
    ...params,
  };

  return fetchAPI('articles', defaultParams);
}

/**
 * Get a single article by ID or slug
 * @param idOrSlug - Article ID or slug
 * @returns Promise with article data
 */
export async function getArticleByIdOrSlug(idOrSlug: string) {
  // Check if the parameter is a slug or an ID
  const isSlug = isNaN(Number(idOrSlug));
  
  if (isSlug) {
    // If it's a slug, use the filter parameter
    const params = {
      filters: {
        slug: {
          $eq: idOrSlug
        }
      },
      populate: {
        cover: {
          fields: ['url', 'width', 'height', 'alternativeText']
        },
        category: {
          populate: true
        },
        author: {
          populate: true
        },
        blocks: {
          populate: '*'
        }
      }
    };
    
    const response = await fetchAPI('articles', params);
    
    // Return the first item if found
    if (response.data && response.data.length > 0) {
      return { data: response.data[0] };
    }
    
    // Return empty data if not found
    return { data: null };
  }
  
  // If it's an ID, fetch directly
  return fetchAPI(`articles/${idOrSlug}`, { 
    populate: {
      cover: {
        fields: ['url', 'width', 'height', 'alternativeText']
      },
      category: {
        populate: true
      },
      author: {
        populate: true
      },
      blocks: {
        populate: '*'
      }
    }
  });
}

/**
 * Get categories from Strapi
 * @returns Promise with categories data
 */
export async function getCategories() {
  return fetchAPI('categories', { 
    populate: '*',
    sort: ['name:asc']
  });
}

/**
 * Get authors from Strapi
 * @returns Promise with authors data
 */
export async function getAuthors() {
  return fetchAPI('authors', { 
    populate: '*',
    sort: ['name:asc']
  });
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
  
  // If endpoint is a specific article (articles/1, articles/2, etc.)
  if (endpoint.match(/^articles\/\d+$/)) {
    const id = endpoint.split('/')[1];
    
    // Different content based on ID
    if (id === '1') {
      return {
        data: {
          id: 1,
          attributes: {
            title: 'Getting Started with Web Development',
            description: 'Learn the basics of web development with this comprehensive guide for beginners.',
            slug: 'getting-started-web-development',
            createdAt: '2024-03-01T12:00:00.000Z',
            updatedAt: '2024-03-05T14:30:00.000Z',
            publishedAt: '2024-03-05T15:00:00.000Z',
            blocks: [
              {
                __component: 'shared.rich-text',
                id: 1,
                content: '<h2>Introduction to Web Development</h2><p>Web development is the work involved in developing a website for the Internet or an intranet. Web development can range from developing a simple single static page of plain text to complex web applications, electronic businesses, and social network services.</p><p>In this article, we\'ll cover the basics of web development and provide resources for beginners.</p>'
              },
              {
                __component: 'shared.media',
                id: 2,
                file: {
                  data: {
                    id: 1,
                    attributes: {
                      url: '/Garu Profile Image.png',
                      width: 1200,
                      height: 800,
                      alternativeText: 'Web Development Illustration'
                    }
                  }
                }
              },
              {
                __component: 'shared.rich-text',
                id: 3,
                content: '<h2>Front-end Development</h2><p>Front-end web development is the practice of converting data to a graphical interface, through the use of HTML, CSS, and JavaScript, so that users can view and interact with that data.</p><h3>Key Technologies:</h3><ul><li>HTML - Structure</li><li>CSS - Styling</li><li>JavaScript - Interactivity</li></ul>'
              },
              {
                __component: 'shared.quote',
                id: 4,
                content: 'The best way to learn web development is to build projects. Start small, and gradually take on more complex challenges.',
                author: 'Experienced Developer'
              }
            ],
            cover: {
              data: {
                id: 1,
                attributes: {
                  url: '/Garu Profile Image.png',
                  width: 1200,
                  height: 800,
                  alternativeText: 'Web Development Cover'
                }
              }
            },
            author: {
              data: {
                id: 1,
                attributes: {
                  name: 'Alex Johnson',
                  email: 'alex@example.com',
                  picture: {
                    data: {
                      id: 2,
                      attributes: {
                        url: '/Garu Profile Image.png',
                        width: 400,
                        height: 400,
                        alternativeText: 'Alex Johnson'
                      }
                    }
                  }
                }
              }
            },
            category: {
              data: {
                id: 1,
                attributes: {
                  name: 'Web Development',
                  slug: 'web-development'
                }
              }
            }
          }
        },
        meta: {}
      };
    } else if (id === '2') {
      return {
        data: {
          id: 2,
          attributes: {
            title: 'Design Principles for Developers',
            description: 'Essential design principles every developer should know to create better user experiences.',
            slug: 'design-principles-developers',
            createdAt: '2024-02-15T10:00:00.000Z',
            updatedAt: '2024-02-20T09:45:00.000Z',
            publishedAt: '2024-02-20T10:00:00.000Z',
            blocks: [
              {
                __component: 'shared.rich-text',
                id: 1,
                content: '<h2>Why Developers Should Understand Design</h2><p>As a developer, understanding basic design principles can significantly improve the quality of your work. Good design isn\'t just about aesthetics—it\'s about creating intuitive, accessible, and enjoyable user experiences.</p>'
              },
              {
                __component: 'shared.media',
                id: 2,
                file: {
                  data: {
                    id: 3,
                    attributes: {
                      url: '/Garu Profile Image.png',
                      width: 1200,
                      height: 800,
                      alternativeText: 'Design Principles Illustration'
                    }
                  }
                }
              },
              {
                __component: 'shared.rich-text',
                id: 3,
                content: '<h2>Core Design Principles</h2><h3>1. Hierarchy</h3><p>Visual hierarchy helps users navigate through content by emphasizing important elements and de-emphasizing less important ones.</p><h3>2. Contrast</h3><p>Contrast helps distinguish elements from each other and improves readability and accessibility.</p><h3>3. Consistency</h3><p>Consistent design patterns help users learn how to use your interface more quickly.</p>'
              },
              {
                __component: 'shared.slider',
                id: 4,
                files: {
                  data: [
                    {
                      id: 4,
                      attributes: {
                        url: '/Garu Profile Image.png',
                        width: 1200,
                        height: 800,
                        alternativeText: 'Design Example 1'
                      }
                    },
                    {
                      id: 5,
                      attributes: {
                        url: '/Garu Profile Image.png',
                        width: 1200,
                        height: 800,
                        alternativeText: 'Design Example 2'
                      }
                    }
                  ]
                }
              }
            ],
            cover: {
              data: {
                id: 6,
                attributes: {
                  url: '/Garu Profile Image.png',
                  width: 1200,
                  height: 800,
                  alternativeText: 'Design Principles Cover'
                }
              }
            },
            author: {
              data: {
                id: 2,
                attributes: {
                  name: 'Sarah Chen',
                  email: 'sarah@example.com',
                  picture: {
                    data: {
                      id: 7,
                      attributes: {
                        url: '/Garu Profile Image.png',
                        width: 400,
                        height: 400,
                        alternativeText: 'Sarah Chen'
                      }
                    }
                  }
                }
              }
            },
            category: {
              data: {
                id: 2,
                attributes: {
                  name: 'Design',
                  slug: 'design'
                }
              }
            }
          }
        },
        meta: {}
      };
    }
    
    // Default article response
    return {
      data: {
        id: Number(id),
        attributes: {
          title: 'Sample Article',
          description: 'This is a sample article for demonstration purposes.',
          slug: `sample-article-${id}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publishedAt: new Date().toISOString(),
          blocks: [
            {
              __component: 'shared.rich-text',
              id: 1,
              content: '<p>This is a placeholder for when Strapi is not available.</p>'
            }
          ],
          cover: null,
          author: {
            data: {
              id: 1,
              attributes: {
                name: 'Sample Author',
                email: 'author@example.com',
                picture: null
              }
            }
          },
          category: {
            data: {
              id: 1,
              attributes: {
                name: 'General',
                slug: 'general'
              }
            }
          }
        }
      },
      meta: {}
    };
  }
  
  // If endpoint is articles
  if (endpoint === 'articles') {
    return {
      data: [
        {
          id: 1,
          attributes: {
            title: 'Getting Started with Web Development',
            description: 'Learn the basics of web development with this comprehensive guide for beginners.',
            slug: 'getting-started-web-development',
            createdAt: '2024-03-01T12:00:00.000Z',
            updatedAt: '2024-03-05T14:30:00.000Z',
            publishedAt: '2024-03-05T15:00:00.000Z',
            cover: {
              data: {
                id: 1,
                attributes: {
                  url: '/Garu Profile Image.png',
                  width: 1200,
                  height: 800,
                  alternativeText: 'Web Development Cover'
                }
              }
            },
            author: {
              data: {
                id: 1,
                attributes: {
                  name: 'Alex Johnson',
                  email: 'alex@example.com',
                  picture: {
                    data: {
                      id: 2,
                      attributes: {
                        url: '/Garu Profile Image.png',
                        width: 400,
                        height: 400,
                        alternativeText: 'Alex Johnson'
                      }
                    }
                  }
                }
              }
            },
            category: {
              data: {
                id: 1,
                attributes: {
                  name: 'Web Development',
                  slug: 'web-development'
                }
              }
            }
          }
        },
        {
          id: 2,
          attributes: {
            title: 'Design Principles for Developers',
            description: 'Essential design principles every developer should know to create better user experiences.',
            slug: 'design-principles-developers',
            createdAt: '2024-02-15T10:00:00.000Z',
            updatedAt: '2024-02-20T09:45:00.000Z',
            publishedAt: '2024-02-20T10:00:00.000Z',
            cover: {
              data: {
                id: 6,
                attributes: {
                  url: '/Garu Profile Image.png',
                  width: 1200,
                  height: 800,
                  alternativeText: 'Design Principles Cover'
                }
              }
            },
            author: {
              data: {
                id: 2,
                attributes: {
                  name: 'Sarah Chen',
                  email: 'sarah@example.com',
                  picture: {
                    data: {
                      id: 7,
                      attributes: {
                        url: '/Garu Profile Image.png',
                        width: 400,
                        height: 400,
                        alternativeText: 'Sarah Chen'
                      }
                    }
                  }
                }
              }
            },
            category: {
              data: {
                id: 2,
                attributes: {
                  name: 'Design',
                  slug: 'design'
                }
              }
            }
          }
        },
        {
          id: 3,
          attributes: {
            title: 'Introduction to JavaScript Frameworks',
            description: 'Compare popular JavaScript frameworks and learn which one is right for your project.',
            slug: 'javascript-frameworks-introduction',
            createdAt: '2024-01-20T08:00:00.000Z',
            updatedAt: '2024-01-25T16:15:00.000Z',
            publishedAt: '2024-01-25T17:00:00.000Z',
            cover: {
              data: {
                id: 8,
                attributes: {
                  url: '/Garu Profile Image.png',
                  width: 1200,
                  height: 800,
                  alternativeText: 'JavaScript Frameworks Cover'
                }
              }
            },
            author: {
              data: {
                id: 1,
                attributes: {
                  name: 'Alex Johnson',
                  email: 'alex@example.com',
                  picture: {
                    data: {
                      id: 2,
                      attributes: {
                        url: '/Garu Profile Image.png',
                        width: 400,
                        height: 400,
                        alternativeText: 'Alex Johnson'
                      }
                    }
                  }
                }
              }
            },
            category: {
              data: {
                id: 1,
                attributes: {
                  name: 'Web Development',
                  slug: 'web-development'
                }
              }
            }
          }
        }
      ],
      meta: {
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          total: 3
        }
      }
    };
  }
  
  // If endpoint is categories
  if (endpoint === 'categories') {
    return {
      data: [
        {
          id: 1,
          attributes: {
            name: 'Web Development',
            slug: 'web-development'
          }
        },
        {
          id: 2,
          attributes: {
            name: 'Design',
            slug: 'design'
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
  
  // If endpoint is authors
  if (endpoint === 'authors') {
    return {
      data: [
        {
          id: 1,
          attributes: {
            name: 'Sample Author',
            email: 'author@example.com',
            picture: null
          }
        },
        {
          id: 2,
          attributes: {
            name: 'Another Author',
            email: 'another@example.com',
            picture: null
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