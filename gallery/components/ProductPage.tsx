"use client"

import { Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer"
import { tw } from "@/lib/tailwind-pdf"
import { useEffect, useState } from "react"


// Custom styles that go beyond Tailwind capabilities
const styles = StyleSheet.create({
  ornamentCorner: {
    position: 'absolute',
    width: 30,
    height: 30,
  },
  topLeft: {
    top: 0,
    left: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    transform: 'rotate(90deg)',
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    transform: 'rotate(-90deg)',
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    transform: 'rotate(180deg)',
  },
})

// Type definitions for our data
export interface Product {
  id : string,
  name: string
  description: string
  image?: string
}

export interface CompanyInfo {
  name: string
  logo?: string
  website?: string
  phone?: string
  tagline?: string
  established?: string
}

// Image compression function using browser's Image API
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

export const ProductPage = ({
  product,
  companyInfo,
  pageNumber,
}: {
  product: Product
  companyInfo: CompanyInfo
  pageNumber: number
}) => {
  // State to hold optimized images
  const [compressedProductImage, setCompressedProductImage] = useState<string>("")
  const [compressedLogoImage, setCompressedLogoImage] = useState<string>("")

  // Get current date for the catalog
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  })
  const currentYear = new Date().getFullYear()

  // Set default images if none provided
  const companyLogo = companyInfo.logo || "/image/company/CMC-Logo-1-1.png"
  const productImage = product.image || "/placeholder.svg?height=800&width=1000"

  // Compress images when component mounts
  useEffect(() => {
    // Start with original images
    setCompressedProductImage(productImage)
    setCompressedLogoImage(companyLogo)

    // Try to compress if in browser environment
    if (typeof window !== "undefined") {
      Promise.all([compressImage(productImage, 1500, 0.9), compressImage(companyLogo, 400, 0.9)])
        .then(([compressedProduct, compressedLogo]) => {
          setCompressedProductImage(compressedProduct)
          setCompressedLogoImage(compressedLogo)
        })
        .catch((error) => {
          console.error("Image compression error:", error)
        })
    }
  }, [productImage, companyLogo])

  return (
    <Page size="A4" style={tw("p-12 bg-ivory")}>
      {/* Gold accent border at top */}
      <View style={tw("absolute top-0 left-0 right-0 h-3 bg-accent")} fixed />
      
      {/* Subtle watermark */}
      <Text style={[styles.watermark, tw("text-accent left-1/4 top-1/2")]}>
        {companyInfo.name || "LUXURY"}
      </Text>

      {/* Header with logo and date */}
      <View style={tw("flex flex-row justify-between items-center mb-10")}>
        <View style={tw("flex flex-row items-center")}>
          <Image src={compressedLogoImage || "/placeholder.svg"} style={tw("w-36 h-12 object-contain")} />
          {companyInfo.established && (
            <Text style={tw("ml-3 text-xs text-muted")}>EST. {companyInfo.established}</Text>
          )}
        </View>
        <View style={tw("flex flex-col items-end")}>
          <Text style={tw("text-xs uppercase tracking-widest text-accent font-bold")}>Royal Collection</Text>
          <Text style={tw("text-xs text-secondary mt-1")}>{currentDate}</Text>
        </View>
      </View>

      {/* Product Name with elegant styling */}
      <View style={tw("mb-8")}>
        <Text style={tw("text-xl w-52 bg-accent p-2 border-2 border-primary font-bold text-secondary uppercase tracking-wide")}>{product.id}</Text>
        <Text style={tw("text-3xl font-bold text-primary uppercase tracking-wide")}>{product.name}</Text>
        <View style={tw("flex flex-row items-center mt-2")}>
          <View style={tw("w-12 h-0.5 bg-accent")} />
          <Text style={tw("mx-3 text-xs uppercase tracking-widest text-muted")}>
            {product.code || "Exclusive Design"}
          </Text>
          <View style={tw("flex-grow h-0.5 bg-accent opacity-30")} />
        </View>
      </View>

      {/* Product Image in royal frame with decorative corners */}
      <View style={tw("mb-10 relative")}>
        {/* Decorative frame */}
        <View style={tw("absolute inset-0 border-2 border-accent opacity-70 m-3")} />
        
        {/* Corner ornaments */}
        <View style={[styles.ornamentCorner, styles.topLeft, tw("m-1")]} />
        <View style={[styles.ornamentCorner, styles.topRight, tw("m-1")]} />
        <View style={[styles.ornamentCorner, styles.bottomLeft, tw("m-1")]} />
        <View style={[styles.ornamentCorner, styles.bottomRight, tw("m-1")]} />
        
        {/* Product image with increased height and 90 degree rotation */}
        <View style={tw("p-4")}>
          <Image 
            src={compressedProductImage || "/placeholder.svg"} 
            style={tw("w-full h-[400px] object-cover")} 
          />
        </View>
      </View>

      {/* Product details in elegant layout */}
      <View style={tw("flex flex-row mb-8")}>
        {product.description && (
          <View style={tw("flex-1 pr-6")}>
            <Text style={tw("text-sm uppercase tracking-wider text-accent mb-2")}>Description</Text>
            <Text style={tw("text-sm text-secondary leading-relaxed")}>{product.description}</Text>
          </View>
        )}
        
        <View style={tw("w-1/3")}>
          <View style={tw("border-l border-accent pl-6")}>
            {product.dimensions && (
              <View style={tw("mb-4")}>
                <Text style={tw("text-xs uppercase tracking-wider text-accent")}>Dimensions</Text>
                <Text style={tw("text-sm text-secondary")}>{product.dimensions}</Text>
              </View>
            )}
            
            {product.finish && (
              <View style={tw("mb-4")}>
                <Text style={tw("text-xs uppercase tracking-wider text-accent")}>Finish</Text>
                <Text style={tw("text-sm text-secondary")}>{product.finish}</Text>
              </View>
            )}
            
            {product.origin && (
              <View style={tw("mb-4")}>
                <Text style={tw("text-xs uppercase tracking-wider text-accent")}>Origin</Text>
                <Text style={tw("text-sm text-secondary")}>{product.origin}</Text>
              </View>
            )}
            
            {product.price && (
              <View style={tw("mt-6")}>
                <Text style={tw("text-xs uppercase tracking-wider text-accent")}>Price</Text>
                <Text style={tw("text-lg font-bold text-primary")}>{product.price}</Text>
              </View>
            )}
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
            {companyInfo.website && (
              <Text style={tw("text-xs text-accent mr-4")}>{companyInfo.website}</Text>
            )}
            {companyInfo.phone && (
              <Text style={tw("text-xs text-secondary")}>{companyInfo.phone}</Text>
            )}
          </View>

          <View style={tw("flex flex-row items-center")}>
            <View style={tw("w-5 h-5 rounded-full bg-accent flex items-center justify-center mr-1")}>
              <Text style={tw("text-xs text-white")}>{pageNumber}</Text>
            </View>
          </View>
        </View>
        
        {/* Bottom gold accent line */}
        <View style={tw("h-0.5 bg-accent mt-2 opacity-50")} />
      </View>
    </Page>
  )
}

