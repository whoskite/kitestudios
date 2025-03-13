import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/');
    const searchParams = request.nextUrl.searchParams.toString();
    const queryString = searchParams ? `?${searchParams}` : '';
    
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
    const apiToken = process.env.STRAPI_API_TOKEN;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (apiToken) {
      headers.Authorization = `Bearer ${apiToken}`;
    }
    
    const response = await fetch(`${strapiUrl}/api/${path}${queryString}`, {
      method: 'GET',
      headers,
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching from Strapi: ${response.statusText}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in Strapi API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Strapi' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/');
    const body = await request.json();
    
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
    const apiToken = process.env.STRAPI_API_TOKEN;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (apiToken) {
      headers.Authorization = `Bearer ${apiToken}`;
    }
    
    const response = await fetch(`${strapiUrl}/api/${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      throw new Error(`Error posting to Strapi: ${response.statusText}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in Strapi API route:', error);
    return NextResponse.json(
      { error: 'Failed to post data to Strapi' },
      { status: 500 }
    );
  }
} 