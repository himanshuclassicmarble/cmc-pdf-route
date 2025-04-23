import { Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer"
import { tw } from "@/lib/tailwind-pdf"

// Define styles using StyleSheet for precise PDF rendering
const styles = StyleSheet.create({
  page: {
    position: "relative",
    backgroundColor: "#F8F1E9", // Ivory background for luxury feel
  },
  accentBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 8, // Reduced height
    backgroundColor: "#D4A017", // Gold accent
    zIndex: 1,
  },
  bottomAccent: {
    position: "absolute",
    bottom: 0,
    left: 40,
    right: 40,
    height: 1,
    backgroundColor: "#D4A017",
    opacity: 0.4,
    zIndex: 1,
  },
  contentContainer: {
    padding: 40, // Reduced padding
    flexDirection: "column",
    height: "100%",
    zIndex: 2,
  },
  watermark: {
    position: "absolute",
    fontSize: 50, // Smaller watermark
    color: "#D4A017",
    opacity: 0.08, // Less opacity
    transform: "rotate(-45deg)",
    left: "30%",
    top: "45%",
  },
  mapOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(212, 160, 23, 0.1)", // Gold tint
    zIndex: 2,
  },
})

export const ContactPage = () => {
  // Get current date and year
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const currentYear = new Date().getFullYear()

  // Static data
  const companyLogo = "/image/company/CMC-Logo-1-1.png"
  const companyImage = "https://picsum.photos/500/250"
  const companyName = "Classic Marble Company"
  const pageNumber = 4 // Assuming this is the 4th page in the catalog

  return (
    <Page size="A4" style={styles.page}>
      {/* Subtle watermark */}
      <Text style={styles.watermark}>CMC</Text>

      {/* Top accent bar */}
      <View style={styles.accentBar} fixed />

      {/* Main content container */}
      <View style={styles.contentContainer}>
        {/* Header with logo and date - matching ProductPage pattern */}
        <View style={tw("flex flex-row justify-between items-center mb-8")}>
          <View style={tw("flex flex-row items-center")}>
            <Image src={companyLogo || "/placeholder.svg"} style={tw("w-32 h-12 object-contain")} />
          </View>
          <View style={tw("flex flex-col items-end")}>
            <Text style={tw("text-xs uppercase tracking-widest text-amber-500 font-bold")}>Contact Information</Text>
            <Text style={tw("text-[8px] text-gray-600 mt-1")}>{currentDate}</Text>
          </View>
        </View>

        {/* Title with elegant styling - inspired by ProductPage */}
        <View style={tw("mb-6")}>
          <Text style={tw("text-2xl font-bold text-gray-900 uppercase tracking-wide")}>Connect With Us</Text>
          <View style={tw("flex flex-row items-center mt-2")}>
            <View style={tw("w-12 h-0.5 bg-amber-500")} />
            <Text style={tw("mx-3 text-xs uppercase tracking-widest text-gray-500")}>Experience Luxury</Text>
            <View style={tw("flex-grow h-0.5 bg-amber-500 opacity-30")} />
          </View>
        </View>

        {/* Two-column layout for better space utilization */}
        <View style={tw("flex flex-row mb-8")}>
          {/* Left column with company image and description */}
          <View style={tw("w-1/2 pr-4")}>
            <View style={tw("relative")}>
              <Image src={companyImage || "/placeholder.svg"} style={tw("h-48 w-full object-cover rounded shadow")} />
              {/* Subtle gold overlay */}
              <View style={styles.mapOverlay} />
            </View>

            <View style={tw("mt-4")}>
              <Text style={tw("text-sm font-bold text-gray-900 mb-2")}>Visit Our Showroom</Text>
              <Text style={tw("text-xs text-gray-700 leading-relaxed")}>
                Thank you for exploring our premium marble and stone collections. We invite you to visit our showroom to
                experience the beauty and quality of our products firsthand. Our expert consultants are ready to assist
                you in selecting the perfect marble for your project.
              </Text>
            </View>

            <View style={tw("mt-4 p-3 bg-white rounded shadow")}>
              <Text style={tw("text-xs font-bold text-gray-900 mb-2")}>Showroom Hours</Text>
              <View style={tw("flex flex-row justify-between mb-1")}>
                <Text style={tw("text-xs text-gray-700")}>Monday - Friday</Text>
                <Text style={tw("text-xs text-gray-700")}>10:00 AM - 7:00 PM</Text>
              </View>
              <View style={tw("flex flex-row justify-between mb-1")}>
                <Text style={tw("text-xs text-gray-700")}>Saturday</Text>
                <Text style={tw("text-xs text-gray-700")}>10:00 AM - 5:00 PM</Text>
              </View>
              <View style={tw("flex flex-row justify-between")}>
                <Text style={tw("text-xs text-gray-700")}>Sunday</Text>
                <Text style={tw("text-xs text-gray-700")}>By Appointment</Text>
              </View>
            </View>
          </View>

          {/* Right column with contact information */}
          <View style={tw("w-1/2 pl-4")}>
            <View style={tw("p-6 bg-white rounded shadow mb-6")}>
              <Text style={tw("text-base font-bold text-gray-900 mb-4")}>Contact Information</Text>

              <View style={tw("mb-4")}>
                <Text style={tw("text-xs text-amber-500 font-semibold uppercase tracking-wide mb-1")}>
                  Headquarters
                </Text>
                <Text style={tw("text-xs text-gray-700")}>Classic Marble Company</Text>
                <Text style={tw("text-xs text-gray-700")}>15, Global Marble House, Shah Industrial Estate</Text>
                <Text style={tw("text-xs text-gray-700")}>Mumbai, Maharashtra 400064, India</Text>
              </View>

              <View style={tw("mb-4")}>
                <Text style={tw("text-xs text-amber-500 font-semibold uppercase tracking-wide mb-1")}>Phone</Text>
                <Text style={tw("text-xs text-gray-700")}>+91 22 1234 5678</Text>
                <Text style={tw("text-xs text-gray-700")}>+91 98765 43210 (Sales)</Text>
              </View>

              <View style={tw("mb-4")}>
                <Text style={tw("text-xs text-amber-500 font-semibold uppercase tracking-wide mb-1")}>Email</Text>
                <Text style={tw("text-xs text-gray-700")}>info@classicmarble.com</Text>
                <Text style={tw("text-xs text-gray-700")}>sales@classicmarble.com</Text>
              </View>

              <View>
                <Text style={tw("text-xs text-amber-500 font-semibold uppercase tracking-wide mb-1")}>Website</Text>
                <Text style={tw("text-xs text-gray-700")}>www.classicmarble.com</Text>
              </View>
            </View>

            {/* Global Presence */}
            <View style={tw("p-5 bg-amber-50 rounded")}>
              <Text style={tw("text-sm font-bold text-gray-900 mb-3")}>Global Presence</Text>
              <View style={tw("flex flex-row flex-wrap")}>
                <View style={tw("w-1/2 flex flex-row items-start mb-2")}>
                  <Text style={tw("text-xs text-amber-500 mr-1")}>•</Text>
                  <Text style={tw("text-xs text-gray-700")}>Mumbai (HQ)</Text>
                </View>
                <View style={tw("w-1/2 flex flex-row items-start mb-2")}>
                  <Text style={tw("text-xs text-amber-500 mr-1")}>•</Text>
                  <Text style={tw("text-xs text-gray-700")}>Delhi</Text>
                </View>
                <View style={tw("w-1/2 flex flex-row items-start mb-2")}>
                  <Text style={tw("text-xs text-amber-500 mr-1")}>•</Text>
                  <Text style={tw("text-xs text-gray-700")}>Bangalore</Text>
                </View>
                <View style={tw("w-1/2 flex flex-row items-start mb-2")}>
                  <Text style={tw("text-xs text-amber-500 mr-1")}>•</Text>
                  <Text style={tw("text-xs text-gray-700")}>Dubai</Text>
                </View>
                <View style={tw("w-1/2 flex flex-row items-start mb-2")}>
                  <Text style={tw("text-xs text-amber-500 mr-1")}>•</Text>
                  <Text style={tw("text-xs text-gray-700")}>Singapore</Text>
                </View>
                <View style={tw("w-1/2 flex flex-row items-start mb-2")}>
                  <Text style={tw("text-xs text-amber-500 mr-1")}>•</Text>
                  <Text style={tw("text-xs text-gray-700")}>London</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Social Media Section */}
        <View style={tw("mt-2 p-4 bg-white rounded shadow")}>
          <Text style={tw("text-sm font-bold text-gray-900 mb-3 text-center")}>Follow Our Journey</Text>
          <View style={tw("flex flex-row justify-center")}>
            <View style={tw("mx-4 items-center")}>
              <Text style={tw("text-xs text-amber-500 font-semibold")}>Instagram</Text>
              <Text style={tw("text-[8px] text-gray-600")}>@classicmarble</Text>
            </View>
            <View style={tw("mx-4 items-center")}>
              <Text style={tw("text-xs text-amber-500 font-semibold")}>LinkedIn</Text>
              <Text style={tw("text-[8px] text-gray-600")}>Classic Marble Company</Text>
            </View>
            <View style={tw("mx-4 items-center")}>
              <Text style={tw("text-xs text-amber-500 font-semibold")}>Facebook</Text>
              <Text style={tw("text-[8px] text-gray-600")}>@ClassicMarbleCo</Text>
            </View>
            <View style={tw("mx-4 items-center")}>
              <Text style={tw("text-xs text-amber-500 font-semibold")}>YouTube</Text>
              <Text style={tw("text-[8px] text-gray-600")}>Classic Marble Channel</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Footer with company info and page number */}
      <View style={tw("absolute bottom-6 left-10 right-10")} fixed>
        <View style={tw("pt-3 flex flex-row justify-between items-center")}>
          <View style={tw("flex flex-col")}>
            <Text style={tw("text-[8px] text-amber-500 font-bold uppercase tracking-wider")}>Excellence in Luxury</Text>
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

        {/* Bottom accent line */}
        <View style={styles.bottomAccent} />
      </View>
    </Page>
  )
}

