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

export const CompanyDescriptionPage = () => {
  // All data is now static
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const currentYear = new Date().getFullYear();
  const companyLogo = 'https://picsum.photos/200/80';
  const companyName = 'Classic Marble Company';
  const directorImage = 'https://picsum.photos/150/200';
  const companyImage = 'https://picsum.photos/500/250';

  const companyDescription = [
    "For three decades, Classic Marble Company has been the cornerstone of India's marble industry, proudly supplying over 150 million sq. ft. of premium imported marble. With each year, our reach extends further, crossing borders and setting new benchmarks.",
    "From a modest 200 sq. ft. office to the industry titan we are today, our journey has been monumental. As the nation's top marble importer and a pioneer in engineered stones, our growth mirrors the very marbles we craft — diverse, resilient, and ever-expanding.",
    "Our collections, from the high-end 9th Avenue to the innovative Techlam, are a testament to our global partnerships and our commitment to luxury and quality. KalingaStone, our signature engineered marble brand, now graces 67+ countries, while 9th Avenue showcases the opulent designs from over 40 nations."
  ];

  const directorBio = [
    "Mr. Amit Shah, Managing Director of Classic Marble Company (CMC), is a visionary leader with over 30 years of experience in the marble trade. Recognized for his expertise in assessing marble quality and foreseeing market trends, he transformed CMC into India's leading natural stone importer and agglomerated stone manufacturer.",
    "Starting CMC at nineteen, Shah capitalized on the lack of organized players in the stone domain, achieving remarkable success by securing prestigious projects and launching the flagship brand, KalingaStone. Under his leadership, CMC expanded globally, exporting to over sixty-six countries."
  ];

  return (
    <Page size="A4" style={tw('p-10 bg-white')}>
      {/* Header */}
      <View style={tw('flex flex-row justify-between items-center mb-6 pb-2 border-b border-light')}>
        <Image src={companyLogo} style={tw('w-24 h-8 object-contain')} />
        <Text style={tw('text-xs text-muted')}>
          Premium Product Catalogue • {currentDate}
        </Text>
      </View>

      {/* Company Description Section */}
      <Text style={tw('text-lg font-bold text-black mb-5')}>Our Legacy of Excellence</Text>

      <Image src={companyImage} style={tw('w-full h-40 object-cover rounded mb-5')} />

      {companyDescription.map((paragraph, index) => (
        <Text key={index} style={tw('text-xs text-secondary leading-relaxed mb-3')}>
          {paragraph}
        </Text>
      ))}

      {/* Director Section */}
      <View style={tw('mt-6')}>
        <Text style={tw('text-lg font-bold text-black mb-3')}>Leadership</Text>
        <View style={tw('flex flex-row')}>
          <Image src={directorImage} style={tw('w-28 h-36 object-cover rounded mr-4')} />
          <View style={tw('flex-1')}>
            <Text style={tw('text-base font-bold text-black mb-1')}>Mr. Amit Shah</Text>
            <Text style={tw('text-xs text-muted mb-2')}>Managing Director</Text>
            {directorBio.map((paragraph, index) => (
              <Text key={index} style={tw('text-xs text-secondary leading-relaxed mb-2')}>
                {paragraph}
              </Text>
            ))}
          </View>
        </View>
      </View>

      {/* Additional company stats in a box */}
      <View style={tw('mt-6 bg-lightGray p-4 rounded')}>
        <View style={tw('flex flex-row justify-between')}>
          <View style={tw('w-1/3')}>
            <Text style={tw('text-sm font-bold text-primary')}>500+</Text>
            <Text style={tw('text-xs text-secondary')}>Marble Varieties</Text>
          </View>
          <View style={tw('w-1/3')}>
            <Text style={tw('text-sm font-bold text-primary')}>67+</Text>
            <Text style={tw('text-xs text-secondary')}>Countries Served</Text>
          </View>
          <View style={tw('w-1/3')}>
            <Text style={tw('text-sm font-bold text-primary')}>1500+</Text>
            <Text style={tw('text-xs text-secondary')}>Team Members</Text>
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
        2
      </Text>
    </Page>
  );
};
