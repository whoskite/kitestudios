import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { getArticleByIdOrSlug } from '@/lib/strapi';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import DynamicZone from '@/components/DynamicZone';

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  try {
    const { data } = await getArticleByIdOrSlug(params.id);
    
    if (!data || !data.attributes) {
      return {
        title: 'Article Not Found - Kite Studios Hub',
        description: 'The requested article could not be found.',
      };
    }
    
    const article = data.attributes;
    
    return {
      title: `${article.title} - Kite Studios Hub`,
      description: article.description.substring(0, 160),
    };
  } catch (error) {
    return {
      title: 'Article - Kite Studios Hub',
      description: 'Article details',
    };
  }
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  try {
    const { data } = await getArticleByIdOrSlug(params.id);
    
    // Handle case where data is null (Strapi not available or article not found)
    if (!data || !data.attributes) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Button variant="ghost" asChild>
              <Link href="/hub/articles" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Articles
              </Link>
            </Button>
          </div>
          
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for is not available or doesn't exist.
            </p>
            <Button asChild>
              <Link href="/hub/articles">
                Browse All Articles
              </Link>
            </Button>
          </div>
        </div>
      );
    }
    
    const article = data.attributes;
    
    const coverImageUrl = article.cover?.data?.attributes?.url 
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${article.cover.data.attributes.url}`
      : '/Garu Profile Image.png';
    
    const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });

    const authorName = article.author?.data?.attributes?.name || 'Unknown Author';
    const authorImageUrl = article.author?.data?.attributes?.picture?.data?.attributes?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${article.author.data.attributes.picture.data.attributes.url}`
      : null;

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/hub/articles" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              {article.category?.data && (
                <Badge className="mb-3">
                  {article.category.data.attributes.name}
                </Badge>
              )}
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{article.title}</h1>
              <div className="flex items-center text-muted-foreground mb-4">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="mr-4">{formattedDate}</span>
                <User className="h-4 w-4 mr-2" />
                <span>{authorName}</span>
              </div>
            </div>
            
            {article.cover?.data && (
              <div className="relative aspect-video overflow-hidden rounded-lg mb-8">
                <Image
                  src={coverImageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            
            <div className="prose dark:prose-invert max-w-none mb-8">
              <p className="text-lg font-medium">{article.description}</p>
            </div>
            
            {article.blocks && article.blocks.length > 0 && (
              <DynamicZone content={article.blocks} />
            )}
          </div>
          
          <div>
            <div className="sticky top-24">
              {authorImageUrl ? (
                <div className="flex items-center mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                    <Image
                      src={authorImageUrl}
                      alt={authorName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{authorName}</p>
                    <p className="text-sm text-muted-foreground">Author</p>
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <p className="font-medium">{authorName}</p>
                  <p className="text-sm text-muted-foreground">Author</p>
                </div>
              )}
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="font-medium mb-4">Related Articles</h3>
                <p className="text-sm text-muted-foreground">
                  Check back soon for related articles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
} 