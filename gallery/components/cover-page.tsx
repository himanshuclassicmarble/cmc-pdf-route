import { Page, View, Text, Image } from '@react-pdf/renderer';
import { createTw } from 'react-pdf-tailwind';
import Logo from "../public/Images/company/CMC-Logo-1-1.png"
import coverImage from "../public/Images/company/coverImage.jpg"

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

export const CoverPage = () => {
  // Static data
  const companyLogo = 'https://picsum.photos/200/80';
  const coverBackground = 'https://picsum.photos/1200/1000';
  const companyName = 'Classic Marble Company';
  const yearEstablished = '1990';
  
  return (
    <Page size="A4" style={tw('relative')}>
      {/* Background Image */}
      <Image
        src={coverBackground}
        style={tw('absolute top-0 left-0 w-full h-full object-cover')}
      />
      
      {/* Gradient Overlay */}
      <View style={tw('absolute top-0 left-0 w-full h-full bg-primary opacity-80')} />
      <View style={tw('absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent')} />
      
      {/* Content */}
      <View style={tw('relative flex flex-col justify-between h-full p-10')}>
        {/* Top Section: Logo and Business Credentials */}
        <View style={tw('flex flex-row justify-between items-center')}>
          <View style={tw('mb-8')}>
            <Image src={companyLogo} style={tw('w-40 h-16 object-contain')} />
          </View>
          <View style={tw('bg-white bg-opacity-90 px-4 py-2 rounded')}>
            <Text style={tw('text-xs text-secondary font-bold')}>SINCE {yearEstablished}</Text>
          </View>
        </View>
        
        {/* Middle Section: Main Title and Description */}
        <View style={tw('my-16')}>
          <Text style={tw('text-6xl font-bold text-white mb-4')}>
            LUXURY
          </Text>
          <Text style={tw('text-6xl font-bold text-white mb-6')}>
            COLLECTION
          </Text>
          <View style={tw('w-24 h-1 bg-accent mb-6')} />
          <Text style={tw('text-xl text-light mb-2')}>
            Premium Marble & Stone
          </Text>
          <Text style={tw('text-lg text-light')}>
            2025 Product Catalogue
          </Text>
        </View>
        
        {/* Bottom Section: Highlights Box */}
        <View style={tw('mb-10')}>
          <View style={tw('bg-white bg-opacity-90 p-6 rounded')}>
            <View style={tw('flex flex-row justify-between')}>
              <View style={tw('w-1/3 border-r border-gray pr-4')}>
                <Text style={tw('text-2xl font-bold text-primary mb-1')}>500+</Text>
                <Text style={tw('text-sm text-secondary')}>Premium Varieties</Text>
              </View>
              <View style={tw('w-1/3 border-r border-gray px-4')}>
                <Text style={tw('text-2xl font-bold text-primary mb-1')}>67+</Text>
                <Text style={tw('text-sm text-secondary')}>Global Markets</Text>
              </View>
              <View style={tw('w-1/3 pl-4')}>
                <Text style={tw('text-2xl font-bold text-primary mb-1')}>30+</Text>
                <Text style={tw('text-sm text-secondary')}>Years of Excellence</Text>
              </View>
            </View>
          </View>
          
          {/* Company Name */}
          <View style={tw('mt-8')}>
            <Text style={tw('text-2xl font-bold text-white')}>
              {companyName}
            </Text>
          </View>
        </View>
      </View>
    </Page>
  );
};
