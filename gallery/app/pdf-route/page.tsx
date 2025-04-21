'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CataloguePDF from '@/components/CataloguePDF';
import { Product, CompanyInfo } from '@/app/types/catalogue';

export default function PdfRoutePage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sample company info - in a real app, this could come from an API or config
  const companyInfo: CompanyInfo = {
    name: 'Classic Marble Company',
    logo: '/api/placeholder/200/100',
    description: 'Premium supplier of high-quality marble and stone products.',
    contact: {
      email: 'contact@classicmarble.com',
      phone: '+1 (555) 123-4567',
      address: '123 Stone Ave, Marble City, MC 12345',
    },
  };

  useEffect(() => {
    const productsParam = searchParams.get('products');
    if (productsParam) {
      try {
        const parsedProducts = JSON.parse(productsParam) as Product[];
        setProducts(parsedProducts);
      } catch (error) {
        console.error('Error parsing products:', error);
      }
    }
    setIsLoading(false);
  }, [searchParams]);

  if (isLoading) {
    return <div className="max-w-6xl mx-auto p-6">Loading...</div>;
  }

  if (products.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>No Products Selected</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Please select products to generate a catalogue.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-6 w-6 text-primary" />
            Download Your Catalogue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Your catalogue contains {products.length} selected product
            {products.length > 1 ? 's' : ''}.
          </p>
          <PDFDownloadLink
            document={<CataloguePDF products={products} companyInfo={companyInfo} />}
            fileName="classic-marble-catalogue.pdf"
            className="inline-block"
          >
            {({ loading }) => (
              <Button disabled={loading} className="w-full">
                {loading ? 'Generating PDF...' : 'Download PDF Catalogue'}
              </Button>
            )}
          </PDFDownloadLink>
        </CardContent>
      </Card>
    </div>
  );
}
