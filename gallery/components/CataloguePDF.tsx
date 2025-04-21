'use client';
import { Document, Font } from '@react-pdf/renderer';
import { CoverPage } from '@/components/cover-page';
import { CompanyDescriptionPage } from '@/components/CompanyDescription';
import { ProductOverviewPage } from '@/components/ProductOverviewPage';
import { ProductPage } from '@/components/ProductPage';
import { ContactPage } from '@/components/ContactPage';
import { Product, CompanyInfo } from '@/app/types/catalogue';


const CataloguePDF = ({
  products,
  companyInfo,
}: {
  products: Product[];
  companyInfo: CompanyInfo;
}) => {
  return (
    <Document>
      <CoverPage companyInfo={companyInfo} />
      <CompanyDescriptionPage companyInfo={companyInfo} />
      <ProductOverviewPage companyInfo={companyInfo} />
      {products.map((product, index) => (
        <ProductPage
          key={product.id}
          product={product}
          companyInfo={companyInfo}
          pageNumber={index + 4}
        />
      ))}
      <ContactPage companyInfo={companyInfo} pageNumber={products.length + 4} />
    </Document>
  );
};

export default CataloguePDF;
