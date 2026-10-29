export type Category = "men" | "women" | "testers" | "deals";

export interface ProductSize {
  ml: number;
  price: number;
  compareAtPrice?: number;
  stock?: number;
  label?: string;
  sku?: string;
}

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface MajorIngredient {
  name: string;
  percentage: string;
}

export interface ProductReview {
  author: string;
  city: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
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
  sizeLabel?: string;
  badge?: string;
  stock?: number;
  rating?: number;
  reviewCount?: number;
  createdAt: string;

  // Rich luxury olfactory & performance fields
  subtitle?: string;
  shortDescription?: string; // 1-2 sentence concise teaser for PDP intro
  story?: string; // Detailed atelier inspiration story
  longevityHours?: string; // e.g. "12+ Hours" (TODO: Store owner to confirm real values)
  inspiration?: string;
  accords?: string[];
  gender?: "Men" | "Women" | "Unisex";
  season?: string;
  occasion?: string;
  concentration?: string;
  macerationDays?: number;
  majorIngredients?: MajorIngredient[];
  reviews?: ProductReview[];
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
  emailStatus?: "pending" | "sent" | "failed" | "unconfigured" | "skipped";
  emailError?: string;
  idempotencyKey?: string;
}

export interface CityOption {
  name: string;
  province: string;
}
