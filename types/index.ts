export type Category = "men" | "women" | "testers" | "deals";

export interface ProductSize {
  ml: number;
  price: number;
}

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  description: string;
  images: string[];
  sizes: ProductSize[];
  compareAtPrice?: number;
  notes: FragranceNotes;
  longevity: number; // 1 to 5 scale
  projection: string;
  isBestSeller: boolean;
  isNewArrival: boolean;
  createdAt: string;
}

export interface CartItem {
  id: string; // unique key composed of productId + '-' + size.ml
  productId: string;
  product: Product;
  size: ProductSize;
  quantity: number;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  notes?: string;
}

export type OrderStatus = "Pending" | "Shipped" | "Delivered";

export interface Order {
  id: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: "Cash on Delivery";
  createdAt: string;
}

export interface CityOption {
  name: string;
  province: string;
}
