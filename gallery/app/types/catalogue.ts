export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
  sku?: string;
};

export type CompanyInfo = {
  name: string;
  logo?: string;
  yearEstablished?: string;
  tagline?: string;
  description?: string;
  contact?: {
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
  };
};
