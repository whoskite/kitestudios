"use client";

import { useState, useEffect } from "react";
import { fetchAPI } from "@/lib/strapi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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
        const response = await fetchAPI("/articles", {
          populate: "*",
          sort: ["publishedAt:desc"],
          pagination: {
            page: 1,
            pageSize: 10,
          },
        });
        setArticles(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError("Failed to load articles. Please try again later.");
        setIsLoading(false);
      }
    };

    getArticles();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4" data-oid="uifxw75">
        <h2 className="text-2xl font-bold" data-oid="54ewqey">
          Latest Articles
        </h2>
        {[1, 2, 3].map((i) => (
          <Card key={i} data-oid="5mh8b-d">
            <CardHeader data-oid="4ia:qvj">
              <Skeleton className="h-6 w-3/4" data-oid="pjg1lj2" />
              <Skeleton className="h-4 w-1/2" data-oid="dd9kozw" />
            </CardHeader>
            <CardContent data-oid="m6bxni0">
              <Skeleton className="h-20 w-full" data-oid="ysokv97" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-md" data-oid="qsyzrk_">
        <p data-oid="l_eqvtk">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-oid="2g0obtu">
      <h2 className="text-2xl font-bold" data-oid="ucxtae-">
        Latest Articles
      </h2>
      {articles.length === 0 ? (
        <p data-oid="mgz.n-5">No articles found.</p>
      ) : (
        articles.map((article) => (
          <Card key={article.id} data-oid="6qo71ua">
            <CardHeader data-oid="g9fu_-k">
              <CardTitle data-oid="4:xm06t">
                {article.attributes.title}
              </CardTitle>
              <CardDescription data-oid="3s6-:08">
                Published on{" "}
                {new Date(article.attributes.publishedAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent data-oid="cf0z7j7">
              <p data-oid="gg8_t2o">{article.attributes.description}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
