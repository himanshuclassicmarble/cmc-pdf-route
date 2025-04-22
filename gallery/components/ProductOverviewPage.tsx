import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { tw } from '@/lib/tailwind-pdf';

export interface CompanyInfo {
  name: string;
  logo?: string;
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
    height: 10,
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
});

export const ProductOverviewPage = ({ companyInfo }: { companyInfo: CompanyInfo }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const currentYear = new Date().getFullYear();
  const companyLogo = companyInfo.logo || '/image/company/CMC-Logo-1-1.png';
  const companyName = companyInfo.name;

  return (
    <Page size="A4" style={styles.page}>
      {/* Top Gold Accent Bar */}
      <View style={styles.accentBar} />

      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Header */}
        <View style={tw('flex flex-row justify-between items-center mb-7 pb-2 border-b border-light')}>
          <Image src={companyLogo} style={tw('w-[120px] h-[40px] object-contain')} />
          <Text style={tw('text-[10px] text-muted')}>
            Product Catalogue • {currentDate}
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
                Our signature engineered marble brand, now available in over 67 countries worldwide...
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

        {/* 9th Avenue Product */}
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
                Our high-end luxury marble collection sourced from over 40 nations...
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
      </View>

      {/* Footer with company info and page number */}
      <View style={tw("absolute bottom-8 left-12 right-12")} fixed>
        <View style={tw("pt-4 flex flex-row justify-between items-center")}>
          <View style={tw("flex flex-col")}>
            <Text style={tw("text-xs text-accent font-bold uppercase tracking-wider")}>
              {companyInfo.tagline || "Excellence in Luxury"}
            </Text>
            <Text style={tw("text-xs text-muted mt-1")}>
              © {currentYear} {companyInfo.name}
            </Text>
          </View>

          <View style={tw("flex flex-row items-center")}>
              <Text style={tw("text-xs text-accent mr-4")}>www.classicmarble.com</Text>
              <Text style={tw("text-xs text-secondary")}>77668676</Text>
          </View>

          <View style={tw("flex flex-row items-center")}>
            <View style={tw("w-5 h-5 rounded-full bg-accent flex items-center justify-center mr-1")}>
              <Text style={tw("text-xs text-white")}>3</Text>
            </View>
          </View>
        </View>

        {/* Bottom Gold Line */}
        <View style={styles.bottomAccent} />
      </View>
    </Page>
  );
};

