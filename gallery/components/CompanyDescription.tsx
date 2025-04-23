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
    fontSize: 80,
    color: "#D4A017",
    opacity: 0.04,
    transform: "rotate(-45deg)",
    left: "25%",
    top: "40%",
  },
  imageFrame: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    padding: 4,
    backgroundColor: '#FFFFFF',
  },
  directorImageFrame: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    padding: 3,
    backgroundColor: '#FFFFFF',
  },
  statsBox: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  achievementBox: {
    padding: 16,
    backgroundColor: '#FEF7E9',
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#D4A017',
    borderLeftStyle: 'solid',
  },
})

export const CompanyDescriptionPage = () => {
  // Get current date and year
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const currentYear = new Date().getFullYear()

  // Static data
  const companyLogo = "/image/company/CMC-Logo-1-1.png"
  const directorImage = "https://picsum.photos/150/200"
  const companyImage = "https://picsum.photos/500/250"
  const companyName = "Classic Marble Company"
  const pageNumber = 2

  // Company information content
  const companyDescription = [
    "For three decades, Classic Marble Company has been the cornerstone of India's marble industry, proudly supplying over 150 million sq. ft. of premium imported marble.",
    "From a modest 200 sq. ft. office to the industry titan we are today, our journey has been monumental. As the nation's top marble importer and a pioneer in engineered stones, our growth mirrors the very marbles we craft — diverse, resilient, and ever-expanding.",
    "Our collections, from the high-end 9th Avenue to the innovative Techlam, are a testament to our global partnerships and our commitment to luxury and quality.",
  ]

  const directorBio = [
    "Mr. Amit Shah, Managing Director of Classic Marble Company (CMC), is a visionary leader with over 30 years of experience in the marble trade.",
    "Starting CMC at nineteen, Shah capitalized on the lack of organized players in the stone domain, achieving remarkable success by securing prestigious projects and launching the flagship brand, KalingaStone.",
  ]

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
            <Image 
              src={companyLogo || "/placeholder.svg"} 
              style={tw("w-32 h-12 object-contain")} 
            />
          </View>
          <View style={tw("flex flex-col items-end")}>
            <Text style={tw("text-xs uppercase tracking-widest text-amber-500 font-bold")}>
              Company Profile
            </Text>
            <Text style={tw("text-[8px] text-gray-600 mt-1")}>{currentDate}</Text>
          </View>
        </View>

        {/* Title with elegant styling - inspired by ProductPage */}
        <View style={tw("mb-6")}>
          <Text style={tw("text-2xl font-bold text-gray-900 uppercase tracking-wide")}>
            Our Legacy of Excellence
          </Text>
          <View style={tw("flex flex-row items-center mt-2")}>
            <View style={tw("w-12 h-0.5 bg-amber-500")} />
            <Text style={tw("mx-3 text-xs uppercase tracking-widest text-gray-500")}>
              Since 1990
            </Text>
            <View style={tw("flex-grow h-0.5 bg-amber-500 opacity-30")} />
          </View>
        </View>

        {/* Two-column layout for better space utilization */}
        <View style={tw("flex flex-row mb-6")}>
          {/* Left column with company image */}
          <View style={tw("w-1/2 pr-4")}>
            <View style={styles.imageFrame}>
              <Image src={companyImage || "/placeholder.svg"} style={tw("h-40 w-full object-cover rounded")} />
            </View>
          </View>
          
          {/* Right column with company description */}
          <View style={tw("w-1/2 pl-2")}>
            {companyDescription.map((text, i) => (
              <Text key={i} style={tw("text-xs text-gray-700 leading-relaxed mb-3")}>
                {text}
              </Text>
            ))}
          </View>
        </View>

        {/* Leadership Section - with styled heading */}
        <View style={tw("mt-4 mb-4")}>
          <Text style={tw("text-lg font-bold text-gray-900 uppercase tracking-wide")}>
            Leadership
          </Text>
          <View style={tw("w-10 h-0.5 bg-amber-500 mt-1 mb-4")} />
        </View>
        
        <View style={tw("flex flex-row mb-8")}>
          <View style={styles.directorImageFrame}>
            <Image src={directorImage || "/placeholder.svg"} style={tw("w-24 h-32 object-cover rounded")} />
          </View>
          <View style={tw("flex-1 ml-4")}>
            <Text style={tw("text-base font-bold text-gray-900 mb-1")}>
              Mr. Amit Shah
            </Text>
            <Text style={tw("text-xs text-amber-500 mb-2")}>Managing Director</Text>
            {directorBio.map((text, i) => (
              <Text key={i} style={tw("text-xs text-gray-700 leading-relaxed mb-2")}>
                {text}
              </Text>
            ))}
            <View style={tw("flex flex-row mt-2")}>
              <Text style={tw("text-[8px] text-amber-500 italic")}>
                "Our vision is to make India the global epicenter of premium marble and stone products."
              </Text>
            </View>
          </View>
        </View>

        {/* Stats Section with modern styling */}
        <View style={styles.statsBox}>
          <View style={tw("flex flex-row justify-between")}>
            <View style={tw("items-center")}>
              <Text style={tw("text-2xl font-bold text-amber-500 mb-1")}>500+</Text>
              <Text style={tw("text-xs uppercase tracking-wider text-gray-600")}>
                Marble Varieties
              </Text>
            </View>
            <View style={tw("items-center")}>
              <Text style={tw("text-2xl font-bold text-amber-500 mb-1")}>67+</Text>
              <Text style={tw("text-xs uppercase tracking-wider text-gray-600")}>
                Countries Served
              </Text>
            </View>
            <View style={tw("items-center")}>
              <Text style={tw("text-2xl font-bold text-amber-500 mb-1")}>1500+</Text>
              <Text style={tw("text-xs uppercase tracking-wider text-gray-600")}>
                Team Members
              </Text>
            </View>
          </View>
        </View>
        
        {/* Additional Company Facts */}
        <View style={tw("mt-6")}>
          <View style={styles.achievementBox}>
            <Text style={tw("text-sm font-bold text-gray-900 mb-3")}>Milestones & Achievements</Text>
            <View style={tw("flex flex-row flex-wrap")}>
              <View style={tw("w-1/2 flex flex-row items-start mb-2")}>
                <Text style={tw("w-3 text-xs text-amber-500 font-bold")}>•</Text>
                <Text style={tw("text-xs text-gray-700")}>ISO 9001:2015 Certified</Text>
              </View>
              <View style={tw("w-1/2 flex flex-row items-start mb-2")}>
                <Text style={tw("w-3 text-xs text-amber-500 font-bold")}>•</Text>
                <Text style={tw("text-xs text-gray-700")}>150M+ sq. ft. supplied</Text>
              </View>
              <View style={tw("w-1/2 flex flex-row items-start mb-2")}>
                <Text style={tw("w-3 text-xs text-amber-500 font-bold")}>•</Text>
                <Text style={tw("text-xs text-gray-700")}>Launched KalingaStone in 2009</Text>
              </View>
              <View style={tw("w-1/2 flex flex-row items-start mb-2")}>
                <Text style={tw("w-3 text-xs text-amber-500 font-bold")}>•</Text>
                <Text style={tw("text-xs text-gray-700")}>5 showrooms nationwide</Text>
              </View>
              <View style={tw("w-1/2 flex flex-row items-start mb-2")}>
                <Text style={tw("w-3 text-xs text-amber-500 font-bold")}>•</Text>
                <Text style={tw("text-xs text-gray-700")}>Export to 67+ countries</Text>
              </View>
              <View style={tw("w-1/2 flex flex-row items-start mb-2")}>
                <Text style={tw("w-3 text-xs text-amber-500 font-bold")}>•</Text>
                <Text style={tw("text-xs text-gray-700")}>Industry Innovation Award 2023</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Footer with company info and page number */}
      <View style={tw("absolute bottom-6 left-10 right-10")} fixed>
        <View style={tw("pt-3 flex flex-row justify-between items-center")}>
          <View style={tw("flex flex-col")}>
            <Text style={tw("text-[8px] text-amber-500 font-bold uppercase tracking-wider")}>
              Excellence in Luxury
            </Text>
            <Text style={tw("text-[8px] text-gray-500 mt-1")}>
              © {currentYear} Classic Marble Company
            </Text>
          </View>

          <View style={tw("flex flex-row items-center")}>
              <Text style={tw("text-[8px] text-amber-500 mr-3")}>www.classicmarble.com</Text>
              <Text style={tw("text-[8px] text-gray-600")}>77668676</Text>
          </View>

          <View style={tw("flex flex-row items-center")}>
            <View style={tw("w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center mr-1")}>
              <Text style={tw("text-[8px] text-white")}>2</Text>
            </View>
          </View>
        </View>
        
        {/* Bottom accent line */}
        <View style={styles.bottomAccent} />
      </View>
    </Page>
  )
}

