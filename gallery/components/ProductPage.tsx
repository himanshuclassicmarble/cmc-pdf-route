import { Page, View, Text, Image } from '@react-pdf/renderer';
import { createTw } from 'react-pdf-tailwind';

// Initialize Tailwind for react-pdf
const tw = createTw({
  theme: {
    fontFamily: {
      sans: ['Helvetica'],
    },
    extend: {
      colors: {
        primary: '#1a365d',
        secondary: '#2d3748',
        accent: '#3182ce',
        light: '#e2e8f0',
        muted: '#718096',
        white: '#ffffff',
        black: '#000000',
        gray: '#a0aec0',
        lightGray: '#edf2f7',
      },
    },
  },
});

// Type definitions
export interface Product {
  name: string;
  description: string;
  image?: string;
}

export interface CompanyInfo {
  name: string;
  logo?: string;
}

export const ProductPage = ({
  product,
  companyInfo,
  pageNumber,
}: {
  product: Product;
  companyInfo: CompanyInfo;
  pageNumber: number;
}) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const currentYear = new Date().getFullYear();
  const companyLogo = companyInfo.logo || 'https://picsum.photos/200/80';
  const productImage = product.image || 'https://picsum.photos/600/400';

  return (
    <Page size="A4" style={tw('p-10 bg-white')}>
      {/* Header */}
      <View style={tw('flex flex-row justify-between items-center mb-6 pb-2 border-b border-light')}>
        <Image src={companyLogo} style={tw('w-24 h-8 object-contain')} />
        <Text style={tw('text-xs text-muted')}>
          Premium Product Catalogue • {currentDate}
        </Text>
      </View>

      {/* Main Content */}
      <View style={tw('flex-1 mb-6')}>
        {/* Product Name */}
        <View style={tw('mb-6')}>
          <Text style={tw('text-3xl font-bold text-primary text-center')}>
            {product.name}
          </Text>
        </View>

        {/* Product Image */}
        <View style={tw('flex items-center mb-6')}>
          <Image src={productImage} style={tw('w-full h-64 object-cover rounded')} />
        </View>

        {/* Product Description */}
        <View style={tw('bg-lightGray p-4 rounded')}>
          <Text style={tw('text-sm text-secondary leading-relaxed font-light text-center')}>
            {product.description}
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={tw('flex flex-row justify-between items-center mt-auto pt-2 border-t border-light')} fixed>
        <Text style={tw('text-xs text-muted')}>
          © {currentYear} {companyInfo.name} • All Rights Reserved
        </Text>
        <Image src={companyLogo} style={tw('w-12 h-4 object-contain')} />
      </View>

      {/* Page Number */}
      <Text style={tw('absolute bottom-5 right-10 text-xs text-muted')} fixed>
        {pageNumber}
      </Text>
    </Page>
  );
};

