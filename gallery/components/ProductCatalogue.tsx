'use client';
import { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CataloguePDF from './CataloguePDF';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
};

// Define CompanyInfo type if not already imported
type CompanyInfo = {
  name: string;
  logo?: string;
  yearEstablished?: string;
  // Add other properties as needed
};

const ProductCatalogue = ({ products }: { products: Product[] }) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  
  // Define company info
  const companyInfo: CompanyInfo = {
    name: "Classic Marble Company",
    logo: "/api/placeholder/200/80", // Use a placeholder or actual logo path
    yearEstablished: "1990"
  };
  
  const toggleProduct = (product: Product) => {
    setSelectedProducts((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Product Catalogue</h1>
      {/* Product Selection */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Select Products (1-100)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedProducts.some((p) => p.id === product.id)
                  ? 'bg-blue-100 border-blue-500'
                  : 'bg-white border-gray-300'
              }`}
              onClick={() => toggleProduct(product)}
            >
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-sm font-semibold">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Generate PDF Button */}
      <div className="text-center">
        {selectedProducts.length > 0 && selectedProducts.length <= 100 ? (
          <PDFDownloadLink
            document={<CataloguePDF products={selectedProducts} companyInfo={companyInfo} />}
            fileName="product-catalogue.pdf"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {({ loading }) => (loading ? 'Generating PDF...' : 'Download Catalogue PDF')}
          </PDFDownloadLink>
        ) : (
          <p className="text-red-500">
            {selectedProducts.length === 0
              ? 'Please select at least one product.'
              : 'Maximum 100 products allowed.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCatalogue;
