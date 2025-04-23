import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { tw } from '@/lib/tailwind-pdf';

export interface CompanyInfo {
  name: string;
  logo?: string;
  tagline?: string;
}

const styles = StyleSheet.create({
  page: {
    position: 'relative',
    backgroundColor: '#F8F1E9', // Premium ivory background
  },
  accentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 8,
    backgroundColor: '#D4A017', // Gold
    zIndex: 1,
  },
  bottomAccent: {
    position: 'absolute',
    bottom: 0,
    left: 48,
    right: 48,
    height: 1,
    backgroundColor: '#D4A017',
    opacity: 0.4,
    zIndex: 1,
  },
  contentContainer: {
    padding: 48,
    flexDirection: 'column',
    height: '100%',
    zIndex: 2,
  },
  watermark: {
    position: "absolute",
    fontSize: 80,
    color: "#D4A017",
    opacity: 0.04,
    transform: "rotate(-45deg)",
    left: "25%",
    top: "40%",
  },
  productImage: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    padding: 4,
    backgroundColor: '#FFFFFF',
  },
  featureBox: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#D4A017',
    borderLeftStyle: 'solid',
  },
});

export const ProductOverviewPage = ({ companyInfo }: { companyInfo: CompanyInfo }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const currentYear = new Date().getFullYear();
  const companyLogo = companyInfo.logo || '/image/company/CMC-Logo-1-1.png';
  const companyName = companyInfo.name || 'Classic Marble Company';
  const pageNumber = 3;

  return (
    <Page size="A4" style={styles.page}>
      {/* Subtle watermark */}
      <Text style={styles.watermark}>CMC</Text>
      
      {/* Top Gold Accent Bar */}
      <View style={styles.accentBar} />

      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Header */}
        <View style={tw('flex flex-row justify-between items-center mb-8')}>
          <View style={tw('flex flex-row items-center')}>
            <Image src={companyLogo || "/placeholder.svg"} style={tw('w-32 h-12 object-contain')} />
          </View>
          <View style={tw('flex flex-col items-end')}>
            <Text style={tw('text-xs uppercase tracking-widest text-amber-500 font-bold')}>
              Product Collections
            </Text>
            <Text style={tw('text-[8px] text-gray-600 mt-1')}>{currentDate}</Text>
          </View>
        </View>

        {/* Section Title with elegant styling */}
        <View style={tw('mb-8')}>
          <Text style={tw('text-2xl font-bold text-gray-900 uppercase tracking-wide')}>
            Our Exclusive Collections
          </Text>
          <View style={tw('flex flex-row items-center mt-2')}>
            <View style={tw('w-12 h-0.5 bg-amber-500')} />
            <Text style={tw('mx-3 text-xs uppercase tracking-widest text-gray-500')}>
              Crafted Excellence
            </Text>
            <View style={tw('flex-grow h-0.5 bg-amber-500 opacity-30')} />
          </View>
        </View>

        {/* KalingaStone Product */}
        <View style={tw('mb-10')}>
          <View style={tw('mb-3')}>
            <Text style={tw('text-xl font-bold text-gray-900')}>KalingaStone</Text>
            <View style={tw('w-8 h-0.5 bg-amber-500 mt-1')} />
          </View>
          <View style={tw('flex flex-row')}>
            <View style={tw('flex items-center mr-6')}>
              <View style={styles.productImage}>
                <Image src="https://picsum.photos/220/220" style={tw('w-[200px] h-[200px] object-cover rounded')} />
              </View>
            </View>
            <View style={tw('flex-1')}>
              <Text style={tw('text-sm text-gray-700 leading-relaxed mb-4')}>
                Our signature engineered marble brand, now available in over 67 countries worldwide. 
                KalingaStone represents the perfect fusion of natural beauty and technological innovation, 
                offering unparalleled durability and aesthetic appeal for both residential and commercial applications.
              </Text>
              <View style={styles.featureBox}>
                <Text style={tw('text-sm font-bold text-gray-800 mb-3')}>Collection Highlights:</Text>
                {[
                  'Superior stain and scratch resistance',
                  'Consistent patterns and coloration',
                  'Environmentally sustainable production',
                  'Available in large format slabs for seamless installations',
                ].map((feature, index) => (
                  <View key={index} style={tw('flex flex-row mb-2')}>
                    <Text style={tw('w-3 text-sm text-amber-500 font-bold')}>•</Text>
                    <Text style={tw('text-sm text-gray-700 flex-1')}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* 9th Avenue Product */}
        <View style={tw('mb-8')}>
          <View style={tw('mb-3')}>
            <Text style={tw('text-xl font-bold text-gray-900')}>9th Avenue Collection</Text>
            <View style={tw('w-8 h-0.5 bg-amber-500 mt-1')} />
          </View>
          <View style={tw('flex flex-row')}>
            <View style={tw('flex items-center mr-6')}>
              <View style={styles.productImage}>
                <Image src="https://picsum.photos/220/220" style={tw('w-[200px] h-[200px] object-cover rounded')} />
              </View>
            </View>
            <View style={tw('flex-1')}>
              <Text style={tw('text-sm text-gray-700 leading-relaxed mb-4')}>
                Our high-end luxury marble collection sourced from over 40 nations. The 9th Avenue Collection 
                represents the pinnacle of natural stone luxury, featuring rare and exclusive marble varieties 
                that have adorned palaces, museums, and luxury residences worldwide.
              </Text>
              <View style={styles.featureBox}>
                <Text style={tw('text-sm font-bold text-gray-800 mb-3')}>Collection Highlights:</Text>
                {[
                  'Rare and exclusive marble varieties',
                  'Hand-selected for color consistency and unique veining',
                  'Ideal for statement installations and luxury projects',
                  'Available in multiple finishes including polished and honed',
                ].map((feature, index) => (
                  <View key={index} style={tw('flex flex-row mb-2')}>
                    <Text style={tw('w-3 text-sm text-amber-500 font-bold')}>•</Text>
                    <Text style={tw('text-sm text-gray-700 flex-1')}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Collection Availability Box */}
        <View style={tw('mt-6 p-4 bg-amber-50 rounded')}>
          <Text style={tw('text-sm font-bold text-gray-900 mb-3')}>Global Availability</Text>
          <Text style={tw('text-xs text-gray-700 mb-2')}>
            Our collections are available through our exclusive network of distributors and showrooms across 67 countries.
            Visit our website or contact our sales team to find the nearest showroom or to schedule a private consultation.
          </Text>
          <View style={tw('flex flex-row justify-end')}>
            <Text style={tw('text-xs text-amber-500 font-semibold')}>www.classicmarble.com/collections</Text>
          </View>
        </View>
      </View>

      {/* Footer with company info and page number */}
      <View style={tw("absolute bottom-6 left-10 right-10")} fixed>
        <View style={tw("pt-3 flex flex-row justify-between items-center")}>
          <View style={tw("flex flex-col")}>
            <Text style={tw("text-[8px] text-amber-500 font-bold uppercase tracking-wider")}>
              {companyInfo.tagline || "Excellence in Luxury"}
            </Text>
            <Text style={tw("text-[8px] text-gray-500 mt-1")}>
              © {currentYear} {companyName}
            </Text>
          </View>

          <View style={tw("flex flex-row items-center")}>
              <Text style={tw("text-[8px] text-amber-500 mr-3")}>www.classicmarble.com</Text>
              <Text style={tw("text-[8px] text-gray-600")}>77668676</Text>
          </View>

          <View style={tw("flex flex-row items-center")}>
            <View style={tw("w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center mr-1")}>
              <Text style={tw("text-[8px] text-white")}>{pageNumber}</Text>
            </View>
          </View>
        </View>

        {/* Bottom Gold Line */}
        <View style={styles.bottomAccent} />
      </View>
    </Page>
  );
};

