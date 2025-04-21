import { StyleSheet } from '@react-pdf/renderer';

export const colors = {
  primary: '#2b3440', // Deep navy
  accent: '#c9a963', // Gold
  light: '#f8f5f0', // Off-white
  dark: '#1a1a1a', // Near black
  text: '#333333', // Dark grey
  textLight: '#6e6e6e', // Medium grey
  border: '#e0dcd5', // Light warm grey
};

export const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    backgroundColor: colors.light,
    color: colors.text,
  },
  coverPage: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: colors.primary,
    color: colors.light,
  },
  coverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(43, 52, 64, 0.85)', // Semi-transparent overlay
  },
  coverContent: {
    padding: 60,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  coverLogoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  coverLogo: {
    width: 200,
    height: 80,
    objectFit: 'contain',
  },
  coverTitle: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 20,
    color: colors.light,
    fontWeight: 'bold',
  },
  coverTagline: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    color: colors.accent,
    fontWeight: 'light',
  },
  coverInfoBox: {
    borderWidth: 1,
    borderColor: colors.accent,
    padding: 30,
    margin: 30,
    backgroundColor: 'rgba(201, 169, 99, 0.1)',
  },
  coverInfo: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 1.6,
    color: colors.light,
    marginBottom: 5,
  },
  coverCompanyName: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 60,
    color: colors.accent,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  coverYear: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    color: colors.light,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.accent,
    paddingBottom: 15,
    marginBottom: 30,
  },
  headerLogo: {
    width: 120,
    height: 40,
    objectFit: 'contain',
  },
  headerText: {
    fontSize: 10,
    color: colors.textLight,
  },
  companyDescriptionPage: {
    padding: 60,
    backgroundColor: colors.light,
  },
  sectionTitle: {
    fontSize: 28,
    marginBottom: 30,
    color: colors.primary,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: colors.accent,
    paddingBottom: 10,
  },
  companyImage: {
    width: '100%',
    height: 250,
    objectFit: 'cover',
    marginBottom: 30,
    borderRadius: 3,
  },
  companyDescription: {
    fontSize: 12,
    lineHeight: 1.8,
    color: colors.text,
    marginBottom: 20,
    textAlign: 'justify',
  },
  directorSection: {
    marginTop: 40,
    padding: 30,
    backgroundColor: colors.primary,
    color: colors.light,
    borderRadius: 5,
  },
  directorTitle: {
    fontSize: 22,
    marginBottom: 20,
    color: colors.accent,
    fontWeight: 'bold',
  },
  directorText: {
    fontSize: 12,
    lineHeight: 1.8,
    color: colors.light,
    textAlign: 'justify',
  },
  directorRow: {
    flexDirection: 'row',
    gap: 20,
  },
  directorImage: {
    width: 150,
    height: 200,
    objectFit: 'cover',
    borderRadius: 3,
  },
  directorContent: {
    flex: 1,
  },
  directorName: {
    fontSize: 16,
    marginBottom: 10,
    color: colors.accent,
    fontWeight: 'bold',
  },
  directorPosition: {
    fontSize: 12,
    marginBottom: 15,
    color: colors.light,
    fontWeight: 'light',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: colors.primary,
    fontWeight: 'bold',
  },
  productContainer: {
    marginBottom: 40,
    borderRadius: 5,
    padding: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.primary,
    flex: 1,
  },
  productPrice: {
    fontSize: 16,
    color: colors.accent,
    fontWeight: 'bold',
  },
  productCategory: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  productSku: {
    fontSize: 10,
    color: colors.textLight,
    marginBottom: 15,
  },
  productContent: {
    flexDirection: 'row',
    gap: 30,
  },
  productImageContainer: {
    width: 220,
  },
  productDetailsContainer: {
    flex: 1,
  },
  productDescription: {
    marginBottom: 15,
    lineHeight: 1.8,
    color: colors.text,
    textAlign: 'justify',
  },
  productImage: {
    width: '100%',
    height: 220,
    objectFit: 'cover',
    marginBottom: 10,
    borderRadius: 3,
  },
  productFeatures: {
    marginTop: 20,
  },
  productFeatureTitle: {
    fontSize: 14,
    marginBottom: 10,
    color: colors.primary,
    fontWeight: 'bold',
  },
  productFeatureItem: {
    flexDirection: 'row',
    marginBottom: 5,
    fontSize: 11,
  },
  productFeatureBullet: {
    width: 15,
    color: colors.accent,
    fontWeight: 'bold',
  },
  productFeatureText: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 15,
  },
  footerText: {
    fontSize: 9,
    color: colors.textLight,
  },
  footerLogo: {
    width: 80,
    height: 25,
    objectFit: 'contain',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 40,
    fontSize: 10,
    color: colors.textLight,
  },
  contactBox: {
    marginTop: 30,
    backgroundColor: colors.light,
    padding: 15,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  contactTitle: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactItem: {
    flexDirection: 'row',
    marginBottom: 5,
    fontSize: 10,
  },
  contactLabel: {
    width: 60,
    color: colors.textLight,
  },
  contactValue: {
    flex: 1,
    color: colors.text,
  },
});
