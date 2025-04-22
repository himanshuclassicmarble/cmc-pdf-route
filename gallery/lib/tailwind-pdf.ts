import { createTw } from 'react-pdf-tailwind';
import { Font } from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/roboto/v47/KFO7CnqEu92Fr1ME7kSn66aGLdTylUAMa3OUBGEe.woff2',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/roboto/v47/KFO7CnqEu92Fr1ME7kSn66aGLdTylUAMa3KUBGEe.woff2',
      fontWeight: 700,
    },
  ],
});

Font.register({
  family: 'Raleway',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCkIT5lu.woff2',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/raleway/v34/1Ptsg8zYS_SKggPNyCg4QIFqPfE.woff2',
      fontWeight: 700,
    },
  ],
});

// Initialize Tailwind for react-pdf
const tw = createTw({
  theme: {
    fontFamily: {
      sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      heading: ['Raleway', 'Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {
colors: {
  primary: '#1a1a1a',      // Deep black for primary elements
  secondary: '#333333',    // Dark charcoal for secondary text/backgrounds
  accent: '#d4af37',       // Rich gold/yellow for accents
  light: '#f5f5f0',        // Ivory for backgrounds, matching ProductPage
  muted: '#666666',        // Medium gray for subtle text
  white: '#ffffff',        // Pure white
  black: '#000000',        // Pure black
  gray: '#999999',         // Lighter gray for neutral elements
  lightGray: '#e0e0e0',    // Very light gray for subtle backgrounds
}
    },
  },
});

export { tw };
