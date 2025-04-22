'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Loader2 } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CataloguePDF from '@/components/CataloguePDF';
import { Product, CompanyInfo } from '@/app/types/catalogue';
import { Progress } from '@/components/ui/progress';

export default function PdfRoutePage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageProcessingStatus, setImageProcessingStatus] = useState({
    loading: false,
    progress: 0
  });
  
  // Sample company info - in a real app, this could come from an API or config
  const companyInfo: CompanyInfo = {
    name: 'Classic Marble Company',
    logo: '/image/company/CMC-Logo-1-1.png',
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

  // Handle image processing status changes
  const handleLoadingChange = (loading: boolean, progress: number = 0) => {
    setImageProcessingStatus({
      loading: loading,
      progress: progress
    });
  };
  
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
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
          
          {/* Show progress bar when processing images */}
          {imageProcessingStatus.loading && (
            <div className="mb-4">
              <Progress value={imageProcessingStatus.progress} className="h-2 mb-2" />
              <p className="text-xs text-gray-500 text-center">
                Processing images: {imageProcessingStatus.progress}%
              </p>
            </div>
          )}
          
          {/* PDFDownloadLink stays the same, but we pass our loading handler to CataloguePDF */}
          <PDFDownloadLink
            document={
              <CataloguePDF 
                products={products} 
                companyInfo={companyInfo} 
                onLoadingChange={handleLoadingChange} 
              />
            }
            fileName="classic-marble-catalogue.pdf"
            className="inline-block"
          >
            {({ loading }) => (
              <Button 
                disabled={loading || imageProcessingStatus.loading} 
                className="w-full"
              >
                {loading || imageProcessingStatus.loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {loading ? 'Generating PDF...' : 'Processing Images...'}
                  </span>
                ) : (
                  'Download PDF Catalogue'
                )}
              </Button>
            )}
          </PDFDownloadLink>
        </CardContent>
      </Card>
    </div>
  );
}
