import { tw } from "@/lib/tailwind-pdf";
import { Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";

// Consolidated styling to use just StyleSheet
const styles = StyleSheet.create({
  bottomAccent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#D4A017",
    opacity: 0.4,
    zIndex: 1,
  }
});

export const ContactPage = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const currentYear = new Date().getFullYear();
  const companyLogo = "/image/company/CMC-Logo-1-1.png";
  const companyName = "Classic Marble Company";
  const companyImage = "https://picsum.photos/500/250";

  return (
    <Page size="A4" style={tw("p-8 bg-white")}>
      {/* Header */}
      <View style={tw('flex flex-row justify-between items-center mb-7 pb-2 border-b border-light')}>
        <Image src={companyLogo} style={tw('w-[120px] h-[40px] object-contain')} />
        <Text style={tw('text-xs text-gray-500')}>
          Product Catalogue • {currentDate}
        </Text>
      </View>

      {/* Title */}
      <Text style={tw("text-xl font-bold text-blue-800 text-center mb-8")}>
        Connect With Us
      </Text>

      {/* Two-Column Layout */}
      <View style={tw("flex flex-row gap-4 mb-10")}>
        {/* Left Column */}
        <View style={tw("w-1/2")}>
          <Image
            src={companyImage}
            style={tw("w-full h-48 object-cover rounded")}
          />
          <Text style={tw("text-xs text-gray-700 mt-4 leading-relaxed")}>
            Thank you for exploring our premium marble and stone collections.
            We invite you to visit our showroom to experience the beauty and
            quality of our products firsthand.
          </Text>
        </View>

        {/* Right Column */}
        <View style={tw("w-1/2")}>
          <View style={tw("bg-gray-100 p-4 rounded")}>
            <Text style={tw("text-base font-bold text-blue-800 mb-4")}>
              Contact Information
            </Text>

            <View style={tw("mb-3")}>
              <Text style={tw("text-xs text-gray-500 font-semibold")}>
                Headquarters:
              </Text>
              <Text style={tw("text-xs text-gray-700")}>
                Classic Marble Company, Mumbai, India
              </Text>
            </View>

            <View style={tw("mb-3")}>
              <Text style={tw("text-xs text-gray-500 font-semibold")}>
                Phone:
              </Text>
              <Text style={tw("text-xs text-gray-700")}>
                +91 22 1234 5678
              </Text>
            </View>

            <View style={tw("mb-3")}>
              <Text style={tw("text-xs text-gray-500 font-semibold")}>
                Email:
              </Text>
              <Text style={tw("text-xs text-gray-700")}>
                info@classicmarble.com
              </Text>
            </View>

            <View>
              <Text style={tw("text-xs text-gray-500 font-semibold")}>
                Website:
              </Text>
              <Text style={tw("text-xs text-gray-700")}>
                www.classicmarble.com
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={tw('absolute bottom-8 left-12 right-12')}>
        <View style={tw('pt-4 flex flex-row justify-between items-center')}>
          {/* Left: Branding */}
          <View style={tw('flex flex-col')}>
            <Text style={tw('text-sm text-amber-500 font-bold uppercase tracking-wider')}>
              Excellence in Luxury
            </Text>
            <Text style={tw('text-xs text-gray-600 mt-1')}>
              © {currentYear} {companyName}
            </Text>
          </View>

          {/* Center: Website & Contact */}
          <View style={tw('flex flex-row items-center')}>
            <Text style={tw('text-xs text-amber-500 mr-4')}>www.classicmarble.com</Text>
            <Text style={tw('text-xs text-gray-600')}>+1 (800) 555-0123</Text>
          </View>

        </View>

        {/* Bottom Accent Line */}
        <View style={styles.bottomAccent} />
      </View>
    </Page>
  );
};
