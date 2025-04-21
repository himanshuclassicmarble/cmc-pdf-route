import { Page, View, Text, Image } from '@react-pdf/renderer';
import { createTw } from 'react-pdf-tailwind';

// Initialize Tailwind for react-pdf
const tw = createTw({
  theme: {
    fontFamily: {
      sans: ['Helvetica', 'Arial', 'sans-serif'],
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
export interface CompanyInfo {
  name: string;
  logo?: string;
}

export const ProductOverviewPage = ({ companyInfo }: { companyInfo: CompanyInfo }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const currentYear = new Date().getFullYear();
  const companyLogo = companyInfo.logo || 'https://picsum.photos/200/80';

  return (
    <Page size="A4" style={tw('p-10 bg-white')}>
      {/* Header */}
      <View style={tw('flex flex-row justify-between items-center mb-7 pb-2 border-b border-light')}>
        <Image src={companyLogo} style={tw('w-[120px] h-[40px] object-contain')} />
        <Text style={tw('text-[10px] text-muted')}>
          Premium Product Catalogue • {currentDate}
        </Text>
      </View>

      {/* Section Title */}
      <Text style={tw('text-xl font-bold text-black mb-6')}>Our Exclusive Collections</Text>

      {/* KalingaStone Product */}
      <View style={tw('mb-8')}>
        <View style={tw('mb-2')}>
          <Text style={tw('text-2xl font-bold text-black')}>KalingaStone</Text>
        </View>
        <View style={tw('flex flex-row')}>
          <View style={tw('flex items-center mr-6')}>
            <Image src="https://picsum.photos/220/220" style={tw('w-[220px] h-[220px] object-cover rounded')} />
          </View>
          <View style={tw('flex-1')}>
            <Text style={tw('text-sm text-secondary leading-relaxed mb-4')}>
              Our signature engineered marble brand, now available in over 67 countries worldwide. KalingaStone represents the pinnacle of innovation in engineered stone, combining natural beauty with enhanced durability and performance characteristics.
            </Text>
            <View style={tw('p-4 bg-lightGray rounded')}>
              <Text style={tw('text-sm font-bold text-secondary mb-2')}>Collection Highlights:</Text>
              {[
                'Superior stain and scratch resistance',
                'Consistent patterns and coloration',
                'Environmentally sustainable production',
                'Available in large format slabs for seamless installations',
              ].map((feature, index) => (
                <View key={index} style={tw('flex flex-row mb-1')}>
                  <Text style={tw('w-3 text-sm text-accent')}>•</Text>
                  <Text style={tw('text-sm text-secondary flex-1')}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* 9th Avenue Collection Product */}
      <View style={tw('mb-8')}>
        <View style={tw('mb-2')}>
          <Text style={tw('text-2xl font-bold text-black')}>9th Avenue Collection</Text>
        </View>
        <View style={tw('flex flex-row')}>
          <View style={tw('flex items-center mr-6')}>
            <Image src="https://picsum.photos/220/220" style={tw('w-[220px] h-[220px] object-cover rounded')} />
          </View>
          <View style={tw('flex-1')}>
            <Text style={tw('text-sm text-secondary leading-relaxed mb-4')}>
              Our high-end luxury marble collection sourced from over 40 nations. Every piece in the 9th Avenue Collection is unique, offering opulent, never-alike designs that showcase the natural beauty and rarity of premium marble varieties.
            </Text>
            <View style={tw('p-4 bg-lightGray rounded')}>
              <Text style={tw('text-sm font-bold text-secondary mb-2')}>Collection Highlights:</Text>
              {[
                'Rare and exclusive marble varieties',
                'Hand-selected for color consistency and unique veining',
                'Ideal for statement installations and luxury projects',
                'Available in multiple finishes including polished and honed',
              ].map((feature, index) => (
                <View key={index} style={tw('flex flex-row mb-1')}>
                  <Text style={tw('w-3 text-sm text-accent')}>•</Text>
                  <Text style={tw('text-sm text-secondary flex-1')}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={tw('flex flex-row justify-between items-center mt-auto pt-2 border-t border-light')} fixed>
        <Text style={tw('text-[8px] text-muted')}>
          © {currentYear} {companyInfo.name} • All Rights Reserved
        </Text>
        <Image src={companyLogo} style={tw('w-[60px] h-[20px] object-contain')} />
      </View>
      <Text style={tw('absolute bottom-5 right-10 text-[10px] text-muted')} fixed>
        3
      </Text>
    </Page>
  );
};
