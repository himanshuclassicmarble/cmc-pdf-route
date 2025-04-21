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

export const ContactPage = () => {
  // Static data
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const currentYear = new Date().getFullYear();
  const companyLogo = 'https://picsum.photos/200/80';
  const companyName = 'Classic Marble Company';
  const companyImage = 'https://picsum.photos/500/250';
  const pageNumber = 3;

  return (
    <Page size="A4" style={tw('p-8 bg-white')}>
      {/* Header */}
      <View style={tw('flex flex-row justify-between items-center mb-6 pb-2 border-b border-light')}>
        <Image src={companyLogo} style={tw('w-24 h-8 object-contain')} />
        <Text style={tw('text-xs text-muted')}>
          Premium Product Catalogue • {currentDate}
        </Text>
      </View>

      {/* Section Title */}
      <Text style={tw('text-xl font-bold text-primary mb-6 text-center')}>
        Connect With Us
      </Text>

      {/* Two Column Layout for Image and Text */}
      <View style={tw('flex flex-row mb-8')}>
        {/* Left Column - Company Image */}
        <View style={tw('w-1/2 pr-4')}>
          <Image
            src={companyImage}
            style={tw('w-full h-48 object-cover rounded')}
          />
          
          {/* Brief Message */}
          <Text style={tw('text-xs text-secondary mt-4 leading-relaxed')}>
            Thank you for exploring our premium marble and stone collections. We invite
            you to visit our showroom to experience the beauty and quality of our
            products firsthand.
          </Text>
        </View>
        
        {/* Right Column - Contact Information */}
        <View style={tw('w-1/2 pl-4')}>
          <View style={tw('bg-lightGray p-4 rounded')}>
            <Text style={tw('text-base font-bold text-primary mb-4')}>
              Contact Information
            </Text>
            
            <View style={tw('mb-2')}>
              <Text style={tw('text-xs text-muted font-semibold')}>
                Headquarters:
              </Text>
              <Text style={tw('text-xs text-secondary')}>
                Classic Marble Company, Mumbai, India
              </Text>
            </View>
            
            <View style={tw('mb-2')}>
              <Text style={tw('text-xs text-muted font-semibold')}>
                Phone:
              </Text>
              <Text style={tw('text-xs text-secondary')}>
                +91 99999 99999
              </Text>
            </View>
            
            <View style={tw('mb-2')}>
              <Text style={tw('text-xs text-muted font-semibold')}>
                Email:
              </Text>
              <Text style={tw('text-xs text-secondary')}>
                info@classicmarble.com
              </Text>
            </View>
            
            <View style={tw('mb-4')}>
              <Text style={tw('text-xs text-muted font-semibold')}>
                Website:
              </Text>
              <Text style={tw('text-xs text-secondary')}>
                www.classicmarble.com
              </Text>
            </View>
          </View>
          
          {/* Showroom Information */}
          <View style={tw('mt-4 bg-primary p-4 rounded')}>
            <Text style={tw('text-sm font-bold text-white mb-2')}>
              Visit Our Showrooms
            </Text>
            <Text style={tw('text-xs text-light')}>
              Experience our expansive display areas across major cities in India showcasing our full range of premium marble and engineered stone collections.
            </Text>
          </View>
        </View>
      </View>

      {/* Global Presence */}
      <View style={tw('mb-4')}>
        <Text style={tw('text-base font-bold text-primary mb-3')}>
          Our Global Presence
        </Text>
        <View style={tw('flex flex-row')}>
          <View style={tw('w-1/3 pr-2')}>
            <View style={tw('bg-lightGray p-3 rounded')}>
              <Text style={tw('text-sm font-bold text-accent mb-1')}>Asia</Text>
              <Text style={tw('text-xs text-secondary')}>
                India • UAE • Singapore • Malaysia • Indonesia
              </Text>
            </View>
          </View>
          <View style={tw('w-1/3 px-2')}>
            <View style={tw('bg-lightGray p-3 rounded')}>
              <Text style={tw('text-sm font-bold text-accent mb-1')}>Europe</Text>
              <Text style={tw('text-xs text-secondary')}>
                UK • Italy • France • Spain • Germany
              </Text>
            </View>
          </View>
          <View style={tw('w-1/3 pl-2')}>
            <View style={tw('bg-lightGray p-3 rounded')}>
              <Text style={tw('text-sm font-bold text-accent mb-1')}>Americas</Text>
              <Text style={tw('text-xs text-secondary')}>
                USA • Canada • Brazil • Mexico • Argentina
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Customer Support */}
      <View style={tw('bg-light p-4 rounded mb-4')}>
        <Text style={tw('text-base font-bold text-primary mb-2')}>
          Customer Support
        </Text>
        <View style={tw('flex flex-row')}>
          <View style={tw('w-1/2 pr-2')}>
            <Text style={tw('text-xs text-secondary mb-1 font-semibold')}>
              Technical Assistance:
            </Text>
            <Text style={tw('text-xs text-secondary')}>
              +91 88888 88888 • support@classicmarble.com
            </Text>
          </View>
          <View style={tw('w-1/2 pl-2')}>
            <Text style={tw('text-xs text-secondary mb-1 font-semibold')}>
              Business Inquiries:
            </Text>
            <Text style={tw('text-xs text-secondary')}>
              +91 77777 77777 • business@classicmarble.com
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={tw('flex flex-row justify-between items-center mt-auto pt-2 border-t border-light')} fixed>
        <Text style={tw('text-xs text-muted')}>
          © {currentYear} {companyName} • All Rights Reserved
        </Text>
        <Image src={companyLogo} style={tw('w-12 h-4 object-contain')} />
      </View>
      <Text style={tw('absolute bottom-5 right-10 text-xs text-muted')} fixed>
        {pageNumber}
      </Text>
    </Page>
  );
};
