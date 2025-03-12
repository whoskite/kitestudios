import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getArticles, getCategories } from '@/lib/strapi';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Articles - Kite Studios Hub',
  description: 'Browse articles and resources from Kite Studios',
};

// Define types for Strapi data
interface StrapiImage {
  data: {
    id: number;
    attributes: {
      url: string;
      width: number;
      height: number;
      alternativeText?: string;
    };
  } | null;
}

interface StrapiCategory {
  data: {
    id: number;
    attributes: {
      name: string;
      slug: string;
    };
  } | null;
}

interface StrapiAuthor {
  data: {
    id: number;
    attributes: {
      name: string;
      email?: string;
      picture?: StrapiImage;
    };
  } | null;
}

interface ArticleAttributes {
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover: StrapiImage;
  category: StrapiCategory;
  author: StrapiAuthor;
  blocks: any[]; // Dynamic zone content
}

interface Article {
  id: number;
  attributes: ArticleAttributes;
}

interface Category {
  id: number | string;
  attributes: {
    name: string;
    slug: string;
  };
}

export default async function ArticlesPage() {
  // Fetch articles and categories
  const articlesData = await getArticles();
  const categoriesData = await getCategories();
  
  const articles = articlesData.data || [] as Article[];
  const categories = categoriesData.data || [] as Category[];
  
  // Add "All" category
  const allCategories: Category[] = [
    { id: 'all', attributes: { name: 'All', slug: 'all' } },
    ...categories,
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Articles</h1>
        <p className="text-muted-foreground">
          Browse our collection of articles and resources
        </p>
      </div>
      
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4 flex flex-wrap h-auto">
          {allCategories.map((category: Category) => (
            <TabsTrigger 
              key={category.id.toString()} 
              value={category.attributes.slug}
              className="mb-2"
            >
              {category.attributes.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {/* All articles tab */}
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.length > 0 ? (
              articles.map((article: Article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No articles found</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Category tabs */}
        {categories.map((category: Category) => (
          <TabsContent key={category.id.toString()} value={category.attributes.slug} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.filter((article: Article) => 
                article.attributes.category?.data?.id === category.id
              ).length > 0 ? (
                articles
                  .filter((article: Article) => article.attributes.category?.data?.id === category.id)
                  .map((article: Article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No articles found in this category</p>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function ArticleCard({ article }: { article: Article }) {
  const { attributes } = article;
  
  // Format date
  const formattedDate = new Date(attributes.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Get image URL
  const imageUrl = attributes.cover?.data?.attributes?.url 
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${attributes.cover.data.attributes.url}`
    : '/Garu Profile Image.png';
  
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative aspect-video">
        <Image
          src={imageUrl}
          alt={attributes.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        {attributes.category?.data && (
          <Badge variant="secondary" className="w-fit">
            {attributes.category.data.attributes.name}
          </Badge>
        )}
        <CardTitle className="line-clamp-2">
          <Link href={`/hub/articles/${article.id}`} className="hover:underline">
            {attributes.title}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center text-xs">
          <CalendarIcon className="h-3 w-3 mr-1" />
          {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {attributes.description}
        </p>
      </CardContent>
      <CardFooter className="mt-auto pt-4">
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link href={`/hub/articles/${article.id}`}>
            Read Article
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
} 