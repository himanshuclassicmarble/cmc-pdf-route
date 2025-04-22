"use client"

import { Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer"
import { tw } from "@/lib/tailwind-pdf"
import { useEffect, useState } from "react"

// Define styles using StyleSheet for better PDF rendering
const styles = StyleSheet.create({
  page: {
    position: "relative",
    backgroundColor: "#0f172a", // Dark background color
  },
  accentBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 12,
    backgroundColor: "#3182ce",
    zIndex: 1,
  },
  bottomAccent: {
    position: "absolute",
    bottom: 0, 
    left: 48,
    right: 48,
    height: 2,
    backgroundColor: "#3182ce",
    opacity: 0.5,
    zIndex: 1,
  },
  contentContainer: {
    padding: 48,
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    zIndex: 2,
  }
})

export const CoverPage = () => {
  // State for compressed image
  const [compressedLogo, setCompressedLogo] = useState("")
  
  // Static data
  const companyLogo = "/image/company/CMC-Logo-1-1.png"
  const companyName = "Classic Marble Company"
  const yearEstablished = "1990"
  
  // Get current date for the catalog
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  })
  const currentYear = new Date().getFullYear()

  // Image compression handler (reused from ProductPage component)
  const compressImage = async (url: string, maxWidth = 1200, quality = 0.8): Promise<string> => {
    // Skip compression for local files or placeholders
    if (url.startsWith("/") || url.includes("placeholder")) {
      return url
    }

    try {
      // Create a promise that resolves with compressed image
      return new Promise((resolve, reject) => {
        const img = new window.Image()
        img.crossOrigin = "Anonymous" // Prevent CORS issues

        img.onload = () => {
          // Setup canvas for image processing
          const canvas = document.createElement("canvas")
          const scale = Math.min(maxWidth / img.width, 1)
          canvas.width = img.width * scale
          canvas.height = img.height * scale

          // Draw image to canvas at new size
          const ctx = canvas.getContext("2d")
          if (!ctx) {
            resolve(url) // Fallback if canvas fails
            return
          }

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

          // Convert to compressed JPEG
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolve(url)
                return
              }
              resolve(URL.createObjectURL(blob))
            },
            "image/jpeg",
            quality,
          )
        }

        img.onerror = () => resolve(url) // Fallback on error
        img.src = url
      })
    } catch (error) {
      console.error("Image compression failed:", error)
      return url // Return original as fallback
    }
  }

  // Compress images when component mounts
  useEffect(() => {
    setCompressedLogo(companyLogo)

    if (typeof window !== "undefined") {
      compressImage(companyLogo, 400, 0.9)
        .then(compressedImage => {
          setCompressedLogo(compressedImage)
        })
        .catch(error => {
          console.error("Logo compression error:", error)
        })
    }
  }, [companyLogo])

  return (
    <Page size="A4" style={styles.page}>
      {/* Top accent bar */}
      <View style={styles.accentBar} fixed />
      
      {/* Main content container */}
      <View style={styles.contentContainer}>
        {/* Header with logo and date */}
        <View style={tw("flex flex-row justify-between items-center")}>
          <View style={tw("flex flex-row items-center")}>
            <Image 
              src={compressedLogo || "/placeholder.svg"} 
              style={tw("w-36 h-12 object-contain")} 
            />
            <Text style={tw("ml-3 text-xs text-gray-400")}>EST. {yearEstablished}</Text>
          </View>
          <View style={tw("flex flex-col items-end")}>
            <Text style={tw("text-xs uppercase tracking-widest text-blue-500 font-bold")}>Product Catalogue</Text>
            <Text style={tw("text-xs text-gray-400 mt-1")}>{currentDate}</Text>
          </View>
        </View>

        {/* Middle Section: Main Title and Description */}
        <View style={tw("my-auto")}>
          <View style={tw("mb-8")}>
            <Text style={tw("text-sm text-blue-500 font-bold tracking-widest mb-2")}>2025 PRODUCT CATALOGUE</Text>
            <View style={tw("mb-1")}>
              <Text style={tw("text-7xl font-bold text-white tracking-tight")}>LUXURY</Text>
            </View>
            <View>
              <Text style={tw("text-7xl font-bold text-white tracking-tight")}>COLLECTION</Text>
            </View>
          </View>

          <View style={tw("w-24 h-0.5 bg-blue-500 mb-8")} />

          <View style={tw("mb-4 max-w-md")}>
            <Text style={tw("text-xl text-gray-200 mb-2")}>Premium Marble & Stone</Text>
            <Text style={tw("text-sm text-gray-300 leading-relaxed")}>
              Curated selection of the world's finest marble and stone materials for architectural excellence and
              timeless design.
            </Text>
          </View>
        </View>

        {/* Bottom Section: Highlights Box */}
        <View style={tw("mt-12")}>
          <View style={tw("flex flex-row justify-between mb-12")}>
            <View style={tw("w-1/3 pr-6")}>
              <Text style={tw("text-3xl font-bold text-blue-500 mb-1")}>500+</Text>
              <Text style={tw("text-xs text-white uppercase tracking-wider")}>Premium Varieties</Text>
              <View style={tw("w-12 h-0.5 bg-white bg-opacity-20 mt-2")} />
            </View>
            <View style={tw("w-1/3 px-6")}>
              <Text style={tw("text-3xl font-bold text-blue-500 mb-1")}>67+</Text>
              <Text style={tw("text-xs text-white uppercase tracking-wider")}>Global Markets</Text>
              <View style={tw("w-12 h-0.5 bg-white bg-opacity-20 mt-2")} />
            </View>
            <View style={tw("w-1/3 pl-6")}>
              <Text style={tw("text-3xl font-bold text-blue-500 mb-1")}>30+</Text>
              <Text style={tw("text-xs text-white uppercase tracking-wider")}>Years of Excellence</Text>
              <View style={tw("w-12 h-0.5 bg-white bg-opacity-20 mt-2")} />
            </View>
          </View>

          {/* Footer with company info - similar to ProductPage footer */}
          <View style={tw("flex flex-row justify-between items-center")}>
            <View style={tw("flex flex-col")}>
              <Text style={tw("text-xs text-blue-500 font-bold uppercase tracking-wider")}>
                Excellence in Luxury
              </Text>
              <Text style={tw("text-xs text-gray-400 mt-1")}>
                © {currentYear} {companyName}
              </Text>
            </View>

            <View style={tw("flex flex-row items-center")}>
              <Text style={tw("text-xs text-blue-500 mr-4")}>www.classicmarble.com</Text>
              <Text style={tw("text-xs text-gray-400")}>+1 (800) 555-0123</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom accent line */}
      <View style={styles.bottomAccent} fixed />
    </Page>
  )
}
