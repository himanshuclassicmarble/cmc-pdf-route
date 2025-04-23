import { NextRequest, NextResponse } from 'next/server';
import { sampleProducts } from '@/app/data/data'; // Adjust the import path as needed
import fetch from 'node-fetch';

// Define the Product interface (based on your previous messages)
interface Product {
  id: string;
  name: string;
  description: string;
  image?: string;
}

// Function to check if an image URL is valid by making a HEAD request
async function checkImage(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    if (!response.ok) {
      console.warn(`Image not accessible: ${url} (Status: ${response.status})`);
      return false;
    }
    // Optionally check content-type to ensure it's an image
    const contentType = response.headers.get('content-type');
    return contentType?.startsWith('image/') ?? false;
  } catch (error) {
    console.error(`Error checking image ${url}:`, error);
    return false;
  }
}

// Function to preload images and filter products with valid images
async function preloadImages(products: Product[]): Promise<Product[]> {
  const validProducts: Product[] = [];

  // Process images sequentially to avoid overwhelming the server
  for (const product of products) {
    if (!product.image || product.image.includes('placeholder')) {
      // Include products with no image or placeholder images
      validProducts.push(product);
      continue;
    }

    const isValid = await checkImage(product.image);
    if (isValid) {
      validProducts.push(product);
    } else {
      console.warn(`Skipping product ${product.id} due to invalid image: ${product.image}`);
    }
  }

  return validProducts;
}

export async function GET(request: NextRequest) {
  try {
    // Preload images and filter products
    const validProducts = await preloadImages(sampleProducts);

    if (validProducts.length === 0) {
      console.warn('No valid products with accessible images found.');
      return NextResponse.json({
        products: [],
        status: 'success',
        warning: 'No products with valid images found'
      }, { status: 200 });
    }

    return NextResponse.json({
      products: validProducts,
      status: 'success',
      totalProducts: validProducts.length
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products or preloading images:', error);
    return NextResponse.json({
      error: 'Failed to fetch products or preload images',
      status: 'error'
    }, { status: 500 });
  }
}

// Placeholder POST endpoint (unchanged)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // In the future, this would handle creating a new product in the database

    return NextResponse.json({
      message: 'Product creation endpoint (placeholder for database implementation)',
      receivedData: body,
      status: 'success'
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to process request',
      status: 'error'
    }, { status: 400 });
  }
}