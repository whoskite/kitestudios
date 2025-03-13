'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/strapi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    content: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

interface ArticleResponse {
  data: Article[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export default function StrapiContent() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setIsLoading(true);
        const response = await fetchAPI('/articles', {
          populate: '*',
          sort: ['publishedAt:desc'],
          pagination: {
            page: 1,
            pageSize: 10,
          },
        });
        setArticles(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Failed to load articles. Please try again later.');
        setIsLoading(false);
      }
    };

    getArticles();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Latest Articles</h2>
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-md">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Latest Articles</h2>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        articles.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <CardTitle>{article.attributes.title}</CardTitle>
              <CardDescription>
                Published on {new Date(article.attributes.publishedAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{article.attributes.description}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
} 