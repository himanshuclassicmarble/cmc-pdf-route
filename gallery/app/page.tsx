'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, sampleProducts } from './data/data';

export default function Home() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const toggleProduct = (product: Product) => {
    setSelectedProducts((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Classic Marble Company</h1>
        <p className="text-gray-600">Premium Marble & Stone Collections</p>
      </header>

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Select Products for Your Catalogue</h2>
        {selectedProducts.length > 0 && (
          <Link 
            href={{
              pathname: '/pdf-route',
              query: { products: JSON.stringify(selectedProducts) }
            }}
            className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Create PDF ({selectedProducts.length})
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleProducts.map((product) => (
          <div 
            key={product.id}
            className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
              selectedProducts.some(p => p.id === product.id)
                ? 'ring-2 ring-blue-500 shadow-lg'
                : 'hover:shadow-md'
            }`}
            onClick={() => toggleProduct(product)}
          >
            <div className="relative h-48">
<Image
  src={product.image}
  alt={product.name}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized={true}
  quality={75}
/>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-600 text-sm mt-2">{product.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">ID: {product.id}</span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedProducts.some(p => p.id === product.id)
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-300'
                }`}>
                  {selectedProducts.some(p => p.id === product.id) && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProducts.length > 0 && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Selected Products: {selectedProducts.length}</h3>
          <ul className="text-sm space-y-1">
            {selectedProducts.map(product => (
              <li key={product.id} className="flex justify-between">
                <span>{product.name}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-right">
            <Link 
              href={{
                pathname: '/pdf-route',
                query: { products: JSON.stringify(selectedProducts) }
              }}
              className="bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              Create PDF Catalogue
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

