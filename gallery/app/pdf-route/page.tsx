'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Loader2, AlertCircle, FileX } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CataloguePDF from '@/components/CataloguePDF';
import { Product, CompanyInfo } from '@/app/types/catalogue';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Import sample data directly as fallback
import { sampleProducts } from '@/app/data/data'; // Make sure this path matches your actual data file location

export default function PdfRoutePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [imageProcessingStatus, setImageProcessingStatus] = useState({
    loading: false,
    progress: 0
  });
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
  const [imageLoadProgress, setImageLoadProgress] = useState(0);
  const [imageLoadStats, setImageLoadStats] = useState({
    total: 0,
    loaded: 0,
    failed: 0
  });

  // Use refs to track image loading without causing re-renders
  const imageLoadingRef = useRef({
    aborted: false,
    loadedImages: new Map(),
    timeout: null as NodeJS.Timeout | null
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

  // Clean up any ongoing processes when component unmounts
  useEffect(() => {
    return () => {
      // Cancel any pending image loading timeouts
      if (imageLoadingRef.current.timeout) {
        clearTimeout(imageLoadingRef.current.timeout);
      }
      imageLoadingRef.current.aborted = true;
    };
  }, []);

  // Fetch products from our API route or use fallback data
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');

        // Check if response is OK before trying to parse JSON
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Lot numbers not found. Please check your product selection.');
          } else {
            throw new Error(`API returned ${response.status}: ${response.statusText}`);
          }
        }

        const data = await response.json();

        if (data.status === 'success' && Array.isArray(data.products)) {
          setProducts(data.products);
          setImageLoadStats(prev => ({...prev, total: data.products.length}));
          // Start loading images once we have the products
          preloadImages(data.products);
        } else {
          throw new Error('Invalid data format received from API');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setFetchError(error instanceof Error ? error.message : 'Failed to fetch products');

        // Fallback to sample data
        console.log('Using fallback sample data');
        setProducts(sampleProducts);
        setImageLoadStats(prev => ({...prev, total: sampleProducts.length}));
        preloadImages(sampleProducts);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Preload all product images before allowing PDF generation
  const preloadImages = (productList: Product[]) => {
    if (!productList.length) return;

    setLoadingImages(true);
    let loadedCount = 0;
    let failedCount = 0;
    const totalImages = productList.length;

    // Reset image loading state
    imageLoadingRef.current = {
      aborted: false,
      loadedImages: new Map(),
      timeout: null
    };

    // Function to update progress
    const updateProgress = () => {
      if (imageLoadingRef.current.aborted) return;

      const completedCount = loadedCount + failedCount;
      const progress = Math.round((completedCount / totalImages) * 100);

      setImageLoadProgress(progress);
      setImageLoadStats({
        total: totalImages,
        loaded: loadedCount,
        failed: failedCount
      });

      // Check if all images are processed
      if (completedCount === totalImages) {
        setImagesLoaded(true);
        setLoadingImages(false);
        console.log(`Image loading complete. Loaded: ${loadedCount}, Failed: ${failedCount}`);
      }
    };

    // Load images in batches of 10 to prevent overwhelming the browser
    const loadImageBatch = (startIndex: number, batchSize: number) => {
      if (imageLoadingRef.current.aborted) return;

      const endIndex = Math.min(startIndex + batchSize, totalImages);

      for (let i = startIndex; i < endIndex; i++) {
        const product = productList[i];

        // Skip if already loaded
        if (imageLoadingRef.current.loadedImages.has(product.image)) continue;

        const img = new Image();
        img.src = product.image;

        // Mark this image as being processed
        imageLoadingRef.current.loadedImages.set(product.image, 'loading');

        img.onload = () => {
          if (imageLoadingRef.current.aborted) return;

          loadedCount++;
          imageLoadingRef.current.loadedImages.set(product.image, 'loaded');
          updateProgress();
        };

        img.onerror = () => {
          if (imageLoadingRef.current.aborted) return;

          failedCount++;
          imageLoadingRef.current.loadedImages.set(product.image, 'failed');
          console.error(`Failed to load image: ${product.image}`);
          updateProgress();
        };
      }

      // Load next batch if there are more images
      if (endIndex < totalImages) {
        imageLoadingRef.current.timeout = setTimeout(() => {
          loadImageBatch(endIndex, batchSize);
        }, 100);
      }
    };

    // Start loading images in batches of 10
    loadImageBatch(0, 10);
  };

  // Handle image processing status changes during PDF generation
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
            <CardTitle className="flex items-center gap-2">
              <FileX className="h-6 w-6 text-destructive" />
              No Products Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>No lot numbers found to generate a catalogue. Please select valid products.</p>
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
          {fetchError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {fetchError.includes('404') || fetchError.includes('Lot numbers not found')
                  ? 'Lot numbers missing or not found. Using sample data instead.'
                  : `Using sample data - ${fetchError}`
                }
              </AlertDescription>
            </Alert>
          )}

          <p className="text-sm text-gray-600 mb-4">
            Your catalogue contains {products.length} selected product
            {products.length > 1 ? 's' : ''}.
          </p>

          {/* Show image preloading progress with detailed stats */}
          {loadingImages && (
            <div className="mb-4">
              <Progress value={imageLoadProgress} className="h-2 mb-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Processing: {imageLoadProgress}%</span>
                <span>
                  {imageLoadStats.loaded}/{imageLoadStats.total} loaded
                  {imageLoadStats.failed > 0 && ` (${imageLoadStats.failed} failed)`}
                </span>
              </div>
              <p className="text-xs text-gray-500 text-center mt-1">
                Loading large images ({Math.round((imageLoadStats.loaded + imageLoadStats.failed) / imageLoadStats.total * 100)}%)
              </p>
            </div>
          )}

          {/* Show PDF processing progress */}
          {imageProcessingStatus.loading && (
            <div className="mb-4">
              <Progress value={imageProcessingStatus.progress} className="h-2 mb-2" />
              <p className="text-xs text-gray-500 text-center">
                Processing PDF: {imageProcessingStatus.progress}%
              </p>
            </div>
          )}

          {/* Only enable PDF download when images are loaded or if we've been loading for more than 45 seconds */}
          {imagesLoaded || (loadingImages && imageLoadProgress > 30) ? (
            <>
              {(loadingImages && imageLoadProgress < 100) && (
                <Alert className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Not all images are fully loaded. PDF generation is available, but some images may be missing.
                  </AlertDescription>
                </Alert>
              )}

              <PDFDownloadLink
                document={
                  <CataloguePDF
                    products={products}
                    companyInfo={companyInfo}
                    onLoadingChange={handleLoadingChange}
                  />
                }
                fileName="classic-marble-catalogue.pdf"
                className="inline-block w-full"
              >
                {({ loading, url }) => (
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
            </>
          ) : (
            <Button disabled className="w-full">
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading Images ({imageLoadProgress}%)...
              </span>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
