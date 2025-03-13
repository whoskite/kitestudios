import StrapiContent from '@/components/StrapiContent';

export const metadata = {
  title: 'Strapi Test | KITE Studios',
  description: 'Testing Strapi CMS integration',
};

export default function StrapiTestPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Strapi CMS Integration Test</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <StrapiContent />
      </div>
    </div>
  );
} 