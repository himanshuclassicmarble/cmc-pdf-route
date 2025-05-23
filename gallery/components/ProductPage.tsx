"use client"

import { Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer"
import { tw } from "@/lib/tailwind-pdf"
import { useEffect, useState } from "react"

// Custom styles for advanced design elements
const styles = StyleSheet.create({
  // Modern corner decorations
  cornerDecoration: {
    position: "absolute",
    width: 40,
    height: 40,
  },
  topLeft: {
    top: 10,
    left: 10,
  },
  topRight: {
    top: 10,
    right: 10,
    transform: "rotate(90deg)",
  },
  bottomLeft: {
    bottom: 10,
    left: 10,
    transform: "rotate(-90deg)",
  },
  bottomRight: {
    bottom: 10,
    right: 10,
    transform: "rotate(180deg)",
  },
  // Artistic watermark
  watermark: {
    position: "absolute",
    opacity: 0.04,
    fontSize: 120,
    transform: "rotate(-45deg)",
    fontFamily: "Helvetica-Bold",
  },
  // Diagonal accent line
  diagonalAccent: {
    position: "absolute",
    height: 1,
    backgroundColor: "#D4AF37",
    transform: "rotate(-45deg)",
    transformOrigin: "top left",
  },
  // Image frame with shadow effect
  imageContainer: {
    position: "relative",
    marginBottom: 20,
  },
  imageShadow: {
    position: "absolute",
    top: 8,
    left: 8,
    right: -8,
    bottom: -8,
    backgroundColor: "#00000010",
  },
  // Product ID badge
  productBadge: {
    position: "absolute",
    top: -15,
    right: 30,
    zIndex: 10,
    padding: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#D4AF37",
  },
})

// Type definitions
export interface Product {
  id: string
  name: string
  description: string
  image?: string
  dimensions?: string
  finish?: string
  origin?: string
  price?: string
  code?: string
}

export interface CompanyInfo {
  name: string
  logo?: string
  website?: string
  phone?: string
  tagline?: string
  established?: string
}

/**
 * Convert WebP image to PNG for better PDF compatibility
 * This function handles the conversion with no compression
 */
const convertWebPToPNG = async (url: string): Promise<string> => {
  // Skip processing for local/placeholder images
  if (url.startsWith("/") || url.includes("placeholder")) {
    return url
  }

  try {
    return new Promise((resolve, reject) => {
      const img = new window.Image()
      img.crossOrigin = "Anonymous"

      img.onload = () => {
        // Create canvas with original dimensions
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height

        // Get context
        const ctx = canvas.getContext("2d")
        if (!ctx) {
          console.warn("Canvas context not available, using original image")
          resolve(url)
          return
        }

        // Draw at full resolution
        ctx.fillStyle = "#FFFFFF"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        // Convert to PNG with full quality
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              console.warn("Blob creation failed, using original image")
              resolve(url)
              return
            }

            console.log(`Converted image size: ${(blob.size / (1024 * 1024)).toFixed(2)}MB`)
            resolve(URL.createObjectURL(blob))
          },
          "image/png",
          1.0 // Full quality
        )
      }

      img.onerror = () => {
        console.warn("Image loading failed")
        resolve(url)
      }

      img.src = url
    })
  } catch (error) {
    console.error("Image processing error:", error)
    return url
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
  // State for processed images
  const [processedProductImage, setProcessedProductImage] = useState<string>("")
  const [processedLogoImage, setProcessedLogoImage] = useState<string>("")

  // Format date for display
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  })
  const currentYear = new Date().getFullYear()

  // Default images
  const companyLogo = companyInfo.logo || "/image/company/CMC-Logo-1-1.png"
  const productImage = product.image || "/placeholder.svg?height=800&width=1000"

  // Process images on component mount
  useEffect(() => {
    // Set initial values immediately
    setProcessedProductImage(productImage)
    setProcessedLogoImage(companyLogo)

    if (typeof window !== "undefined") {
      // Process product image - convert WebP to PNG if needed
      convertWebPToPNG(productImage)
        .then(convertedImage => {
          setProcessedProductImage(convertedImage)
        })
        .catch(error => {
          console.error("Error processing product image:", error)
          setProcessedProductImage(productImage)
        })

      // Process logo - convert WebP to PNG if needed
      convertWebPToPNG(companyLogo)
        .then(convertedLogo => {
          setProcessedLogoImage(convertedLogo)
        })
        .catch(error => {
          console.error("Error processing logo:", error)
          setProcessedLogoImage(companyLogo)
        })
    }

    // Cleanup function to prevent memory leaks
    return () => {
      if (processedProductImage && processedProductImage.startsWith("blob:")) {
        URL.revokeObjectURL(processedProductImage)
      }
      if (processedLogoImage && processedLogoImage.startsWith("blob:")) {
        URL.revokeObjectURL(processedLogoImage)
      }
    }
  }, [productImage, companyLogo])

  return (
    <Page size="A4" style={tw("p-14 bg-white")} wrap={false}>
      {/* Artistic background elements */}
      <View style={tw("absolute top-0 left-0 right-0 h-1.5 bg-accent opacity-80")} fixed />
      <View style={tw("absolute bottom-0 left-0 right-0 h-1.5 bg-accent opacity-80")} fixed />
      <View style={[styles.diagonalAccent, tw("w-[1000px] opacity-10")]} fixed />

      {/* Subtle artistic watermark */}
      <Text style={[styles.watermark, tw("text-accent left-1/4 top-1/3")]} fixed>{companyInfo.name || "LUXURY"}</Text>

      {/* Modern header with logo and date */}
      <View style={tw("flex flex-row justify-between items-center mb-12")}>
        <View style={tw("flex flex-row items-center")}>
          <Image src={processedLogoImage || "/placeholder.svg"} style={tw("w-40 h-14 object-contain")} />
          {companyInfo.established && (
            <Text style={tw("ml-4 text-xs text-muted font-light tracking-widest")}>
              SINCE {companyInfo.established}
            </Text>
          )}
        </View>
        <View style={tw("flex flex-col items-end")}>
          <Text style={tw("text-xs uppercase tracking-[0.3em] text-accent font-bold")}>Exclusive Collection</Text>
          <Text style={tw("text-xs text-secondary mt-1.5 tracking-wide")}>{currentDate}</Text>
        </View>
      </View>

      {/* Product title section with artistic layout */}
      <View style={tw("mb-10 relative")}>
        <View style={tw("absolute -left-4 top-0 bottom-0 w-1 bg-accent opacity-30")} />
        <View style={tw("pl-6")}>
          <Text style={tw("text-4xl font-bold text-primary uppercase tracking-wide leading-tight")}>
            {product.name}
          </Text>
        </View>
        <View style={styles.productBadge}>
          <Text style={tw("text-sm font-bold text-accent tracking-widest")}>{product.id}</Text>
        </View>
      </View>

      {/* Product image with modern artistic frame */}
      <View style={[styles.imageContainer, tw("mb-12")]}>
        {/* Shadow effect */}
        <View style={styles.imageShadow} />

        {/* Image with border */}
        <View style={tw("border border-accent border-opacity-40")}>
          <Image
            src={processedProductImage || "/placeholder.svg"}
            style={tw("w-full h-[400px] object-cover")}
          />
        </View>

        {/* Decorative corner elements */}
        <View
          style={[styles.cornerDecoration, styles.topLeft, tw("border-t-2 border-l-2 border-accent border-opacity-60")]}
        />
        <View
          style={[
            styles.cornerDecoration,
            styles.topRight,
            tw("border-t-2 border-r-2 border-accent border-opacity-60"),
          ]}
        />
        <View
          style={[
            styles.cornerDecoration,
            styles.bottomLeft,
            tw("border-b-2 border-l-2 border-accent border-opacity-60"),
          ]}
        />
        <View
          style={[
            styles.cornerDecoration,
            styles.bottomRight,
            tw("border-b-2 border-r-2 border-accent border-opacity-60"),
          ]}
        />
      </View>

      {/* Product details with modern layout */}
      <View style={tw("flex flex-row mb-10")}>
        {product.description && (
          <View style={tw("flex-1 pr-8")}>
            <Text style={tw("text-sm uppercase tracking-[0.15em] text-accent mb-3 font-medium")}>
              About the Product
            </Text>
            <Text style={tw("text-sm text-secondary leading-relaxed")}>{product.description}</Text>
          </View>
        )}

        {/* Product specifications section */}
        <View style={tw("flex-1")}>
          <Text style={tw("text-sm uppercase tracking-[0.15em] text-accent mb-3 font-medium")}>
            Specifications
          </Text>

          <View style={tw("flex flex-col gap-2")}>
            {product.dimensions && (
              <View style={tw("flex flex-row")}>
                <Text style={tw("text-sm font-medium text-primary w-24")}>Dimensions</Text>
                <Text style={tw("text-sm text-secondary flex-1")}>{product.dimensions}</Text>
              </View>
            )}

            {product.finish && (
              <View style={tw("flex flex-row")}>
                <Text style={tw("text-sm font-medium text-primary w-24")}>Finish</Text>
                <Text style={tw("text-sm text-secondary flex-1")}>{product.finish}</Text>
              </View>
            )}

            {product.origin && (
              <View style={tw("flex flex-row")}>
                <Text style={tw("text-sm font-medium text-primary w-24")}>Origin</Text>
                <Text style={tw("text-sm text-secondary flex-1")}>{product.origin}</Text>
              </View>
            )}

            {product.price && (
              <View style={tw("flex flex-row")}>
                <Text style={tw("text-sm font-medium text-primary w-24")}>Price</Text>
                <Text style={tw("text-sm text-accent font-medium flex-1")}>{product.price}</Text>
              </View>
            )}

            {product.code && (
              <View style={tw("flex flex-row")}>
                <Text style={tw("text-sm font-medium text-primary w-24")}>Product Code</Text>
                <Text style={tw("text-sm text-secondary flex-1")}>{product.code}</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Modern footer with company info and page number */}
      <View style={tw("absolute bottom-10 left-14 right-14")} fixed>
        <View style={tw("h-0.5 bg-accent opacity-20 mb-4")} />
        <View style={tw("flex flex-row justify-between items-center")}>
          <View style={tw("flex flex-col")}>
            <Text style={tw("text-xs text-accent font-medium uppercase tracking-[0.15em]")}>
              {companyInfo.tagline || "Craftsmanship & Excellence"}
            </Text>
            <Text style={tw("text-xs text-muted mt-1.5")}>
              © {currentYear} {companyInfo.name}
            </Text>
          </View>

          <View style={tw("flex flex-row items-center")}>
            {companyInfo.website && (
              <Text style={tw("text-xs text-accent mr-5 tracking-wide")}>{companyInfo.website}</Text>
            )}
            {companyInfo.phone && <Text style={tw("text-xs text-secondary tracking-wide")}>{companyInfo.phone}</Text>}
          </View>

          <View style={tw("flex flex-row items-center")}>
            <View style={tw("w-7 h-7 rounded-full border border-accent flex items-center justify-center")}>
              <Text style={tw("text-xs text-accent font-medium")}>{pageNumber}</Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  )
}