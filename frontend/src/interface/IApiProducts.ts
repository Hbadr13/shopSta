interface ProductDetail {
  label: string;
  value: string;
  _id: string;
}

interface ProductDescription {
  text: string;
  details: ProductDetail[];
}

export interface Product {
  title: string;
  description: ProductDescription;
  shortDescription: string;
  audience: string;
  category: string;
  brand: string;
  price: number;
  salePrice: number;
  quantity: number;
  colors: string[];
  sizes: string[];
  images: string[];
  totalSale: number;

  productID: number;
  averageRating: number,
  totalRating: number

  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IApiProducts {
  seccess: boolean;
  products: Product[];
}
