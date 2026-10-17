import { Product, Category } from "@/types";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "fn-001",
    slug: "urban-legend",
    name: "Urban Legend",
    category: "men",
    description:
      "A magnetic modern masterpiece engineered for the charismatic metropolitan man. Opens with zesty bergamot and fiery pink pepper, before sinking into smoky ambergris, mineral woods, and Haitian vetiver.",
    images: [DEFAULT_PRODUCT_IMAGE],
    sizes: [
      { ml: 50, price: 2950 },
    ],
    compareAtPrice: 5200,
    notes: {
      top: ["Calabrian Bergamot", "Pink Pepper", "Fresh Elemi"],
      heart: ["Sichuan Pepper", "Lavender", "Geranium"],
      base: ["Ambroxan", "Cedarwood", "Haitian Vetiver", "Labdanum"],
    },
    longevity: 5,
    projection: "Strong (8-10 Hours)",
    isBestSeller: true,
    isNewArrival: false,
    createdAt: "2025-01-10T10:00:00Z",
  },
  {
    id: "fn-002",
    slug: "ghalib",
    name: "Ghalib",
    category: "men",
    description:
      "A poetic, soulful harmony of royal oriental tradition and contemporary finesse. Inspired by nocturnal poetic symposiums of Lahore and Delhi, blending smoked vintage oud, crimson Damascus rose, cardamom, and soft glove leather.",
    images: [DEFAULT_PRODUCT_IMAGE],
    sizes: [
      { ml: 50, price: 3450 },
    ],
    compareAtPrice: 6000,
    notes: {
      top: ["Green Cardamom", "Coriander", "Cypress Leaves"],
      heart: ["Damascus Rose", "Smoked Oud", "Cistus Incanus"],
      base: ["Tuscan Leather", "Sandalwood", "Benzoin", "Rare Amber"],
    },
    longevity: 5,
    projection: "Enormous (10-12+ Hours)",
    isBestSeller: true,
    isNewArrival: false,
    createdAt: "2025-01-15T12:00:00Z",
  },
  {
    id: "fn-003",
    slug: "aqua-mist",
    name: "Aqua Mist",
    category: "deals",
    description:
      "An invigorating plunge into crashing Arabian Sea waves. Crisp mineral sea salt and sparkling grapefruit blend into aromatics and sun-bleached driftwood. Clean, non-cloying, and ultra-refreshing in Pakistani heat.",
    images: [DEFAULT_PRODUCT_IMAGE],
    sizes: [
      { ml: 50, price: 2450 },
    ],
    compareAtPrice: 4800,
    notes: {
      top: ["Sea Salt Spray", "Ruby Grapefruit", "Italian Mandarin"],
      heart: ["Coastal Rosemary", "Seaweed Essence", "Neroli"],
      base: ["Sun-Bleached Driftwood", "White Musk", "Solar Amber"],
    },
    longevity: 4,
    projection: "Moderate to Strong (6-8 Hours)",
    isBestSeller: true,
    isNewArrival: false,
    createdAt: "2025-02-01T08:30:00Z",
  },
  {
    id: "fn-004",
    slug: "noir-oud",
    name: "Noir Oud",
    category: "men",
    description:
      "A dark, brooding Extrait de Parfum for true oriental connoisseurs. Pure wild Cambodian agarwood enriched with fiery Iranian saffron, bitter almond, earthy patchouli, and bourbon vanilla.",
    images: [DEFAULT_PRODUCT_IMAGE],
    sizes: [
      { ml: 50, price: 3850 },
    ],
    compareAtPrice: 6800,
    notes: {
      top: ["Iranian Saffron", "Bitter Almond", "Nutmeg"],
      heart: ["Cambodian Agarwood", "Smoked Birch", "Dark Praline"],
      base: ["Indonesian Patchouli", "Bourbon Vanilla", "Castoreum Accord"],
    },
    longevity: 5,
    projection: "Heavy Beast Mode (12+ Hours)",
    isBestSeller: true,
    isNewArrival: false,
    createdAt: "2025-01-20T14:15:00Z",
  },
  {
    id: "fn-005",
    slug: "royal-amber",
    name: "Royal Amber",
    category: "women",
    description:
      "Liquid gold in an artisanal decanter. A velvety, comforting, yet strikingly seductive cocktail of golden amber crystals, warm Madagascar vanilla caviar, and blooming night jasmine.",
    images: [DEFAULT_PRODUCT_IMAGE],
    sizes: [
      { ml: 50, price: 3250 },
    ],
    compareAtPrice: 5800,
    notes: {
      top: ["Golden Pear", "Pink Pepper", "Bergamot Zest"],
      heart: ["Night-Blooming Jasmine", "Cashmeran", "Roasted Tonka"],
      base: ["Baltic Amber", "Madagascar Vanilla", "Creamy Sandalwood"],
    },
    longevity: 5,
    projection: "Strong & Enveloping (8-10 Hours)",
    isBestSeller: true,
    isNewArrival: false,
    createdAt: "2025-02-05T11:00:00Z",
  },
  {
    id: "fn-006",
    slug: "sultan",
    name: "Sultan",
    category: "men",
    description:
      "Inspired by royal courtyards and majestic palaces. Sparkling blood orange and roasted nutmeg transition into frankincense, Virginia cedarwood, and rich earthy moss.",
    images: [DEFAULT_PRODUCT_IMAGE],
    sizes: [
      { ml: 50, price: 3200 },
    ],
    compareAtPrice: 5600,
    notes: {
      top: ["Blood Orange", "Cardamom Seed", "Juniper Berry"],
      heart: ["Omani Frankincense", "Geranium", "Pimento"],
      base: ["Virginia Cedar", "Oakmoss", "Patchouli Leaf"],
    },
    longevity: 4,
    projection: "Strong (7-9 Hours)",
    isBestSeller: false,
    isNewArrival: true,
    createdAt: "2025-02-18T09:00:00Z",
  },
  {
    id: "fn-007",
    slug: "imperial-leather",
    name: "Imperial Leather",
    category: "men",
    description:
      "The quintessence of quiet luxury. Handcrafted suede and smoky leather infused with powdery Tuscan iris, thyme, and roasted tonka bean.",
    images: [DEFAULT_PRODUCT_IMAGE],
    sizes: [
      { ml: 50, price: 3600 },
    ],
    compareAtPrice: 6200,
    notes: {
      top: ["Wild Thyme", "Raspberry", "Saffron"],
      heart: ["Tuscan Iris", "Olibanum", "Night Jasmine"],
      base: ["Supple Black Suede", "Smoked Leather", "Amberwood"],
    },
    longevity: 5,
    projection: "Strong (8-11 Hours)",
    isBestSeller: false,
    isNewArrival: true,
    createdAt: "2025-02-20T15:30:00Z",
  },
  {
    id: "fn-008",
    slug: "velvet-rose",
    name: "Velvet Rose",
    category: "women",
    description:
      "An opulent bouquet of dew-drenched Bulgarian roses sweet-spun with juicy lychee, crisp peony, and decadent praline, dried down on a bed of sensual white musk.",
    images: [DEFAULT_PRODUCT_IMAGE],
    sizes: [
      { ml: 50, price: 2950 },
    ],
    compareAtPrice: 5300,
    notes: {
      top: ["Lychee", "Bergamot", "Rhubarb"],
      heart: ["Bulgarian Damascena Rose", "Petalia", "Peony"],
      base: ["Praline Accord", "Cashmeran", "White Musk", "Cedar"],
    },
    longevity: 5,
    projection: "Radiant & Alluring (8-10 Hours)",
    isBestSeller: true,
    isNewArrival: false,
    createdAt: "2025-01-28T16:00:00Z",
  },
  {
    id: "fn-009",
    slug: "safwa",
    name: "Safwa",
    category: "women",
    description:
      "A serene and crystalline white floral fragrance embodying graceful elegance. Crisp Williams pear and orange blossom petals floating over Cashmere woods and clean solar musk.",
    images: [DEFAULT_PRODUCT_IMAGE],
    sizes: [
      { ml: 50, price: 2800 },
    ],
    compareAtPrice: 4900,
    notes: {
      top: ["Williams Pear", "Mandarin Flower", "Lotus"],
      heart: ["Tunisian Orange Blossom", "Lily of the Valley", "Gardenia"],
      base: ["Cashmere Wood", "Clean Musk", "White Amber"],
    },
    longevity: 4,
    projection: "Delicate & Lingering (6-8 Hours)",
    isBestSeller: false,
    isNewArrival: true,
    createdAt: "2025-02-22T10:00:00Z",
  },
  {
    id: "fn-010",
    slug: "lahore-nights",
    name: "Lahore Nights",
    category: "women",
    description:
      "An unforgettable gourmand-floral night scent echoing festive evenings in the old walled city. Sensual narcotic tuberose laced with bitter cocoa, roasted tonka, and golden honeyed patchouli.",
    images: [DEFAULT_PRODUCT_IMAGE],
    sizes: [
      { ml: 50, price: 3500 },
    ],
    compareAtPrice: 6200,
    notes: {
      top: ["Almond", "Coffee Bean", "Bergamot"],
      heart: ["Narcotic Tuberose", "Jasmine Sambac", "Orange Blossom"],
      base: ["Roasted Tonka Bean", "Dark Cocoa", "Praline", "Patchouli"],
    },
    longevity: 5,
    projection: "Sensual & Intoxicating (9-12 Hours)",
    isBestSeller: false,
    isNewArrival: true,
    createdAt: "2025-02-24T18:00:00Z",
  },
  {
    id: "fn-011",
    slug: "grand-discovery",
    name: "Grand Discovery Set",
    category: "testers",
    description:
      "The quintessential sampling set for fragrance lovers. Includes 5 deluxe 10ml travel spray atomizers of our top iconic signatures: Urban Legend, Ghalib, Noir Oud, Royal Amber, and Aqua Mist. Comes in a gift box with smelling strips.",
    images: [DEFAULT_PRODUCT_IMAGE],
    sizes: [
      { ml: 50, price: 1950 },
    ],
    compareAtPrice: 3500,
    notes: {
      top: ["Bergamot", "Cardamom", "Grapefruit", "Pear"],
      heart: ["Damascus Rose", "Jasmine", "Marine Accord", "Agarwood"],
      base: ["Amber", "Sandalwood", "Tuscan Leather", "Musk"],
    },
    longevity: 5,
    projection: "Varies by Fragrance (6-12 Hours)",
    isBestSeller: true,
    isNewArrival: false,
    createdAt: "2025-01-05T09:00:00Z",
  },
  {
    id: "fn-012",
    slug: "oud-explorer",
    name: "Oud Explorer Box",
    category: "testers",
    description:
      "A hand-picked collector's flight of 4 x 10ml concentrated oriental extraits: Noir Oud, Ghalib, Sultan, and Amber Oud Reserve. Pure unadulterated woods, resins, and spices.",
    images: [DEFAULT_PRODUCT_IMAGE],
    sizes: [
      { ml: 50, price: 2200 },
    ],
    compareAtPrice: 3900,
    notes: {
      top: ["Saffron", "Pink Pepper", "Nutmeg"],
      heart: ["Cambodian Oud", "Frankincense", "Smoked Rose"],
      base: ["Leather", "Patchouli", "Benzoin", "Amber"],
    },
    longevity: 5,
    projection: "Heavy Oriental (10-14 Hours)",
    isBestSeller: false,
    isNewArrival: true,
    createdAt: "2025-02-12T14:00:00Z",
  },
  {
    id: "fn-013",
    slug: "musk-tahara",
    name: "Musk Tahara Collection",
    category: "testers",
    description:
      "A set of 3 pure non-alcoholic artisanal attar rollers (12ml each): Royal White Musk, Purity Rose Musk, and Royal Golden Musk. Thick, silky, skin-scent formulas that last for days on clothing.",
    images: [DEFAULT_PRODUCT_IMAGE],
    sizes: [
      { ml: 50, price: 1850 },
    ],
    compareAtPrice: 3200,
    notes: {
      top: ["White Lotus", "Powdery Violet", "Lilac"],
      heart: ["Honeyed Jasmine", "White Rose Petals"],
      base: ["Tahara Pure Musk", "Sandalwood Cream", "White Amber"],
    },
    longevity: 5,
    projection: "Intimate Skin-Scent & Eternal (24+ Hours)",
    isBestSeller: false,
    isNewArrival: false,
    createdAt: "2025-01-18T11:00:00Z",
  },
  {
    id: "fn-014",
    slug: "royal-duo",
    name: "The Royal Duo Pack",
    category: "deals",
    description:
      "His & Hers ultimate luxury bundle. Includes full bottles of Ghalib (Smoked Rose Oud) and Velvet Rose (Damascena & Praline). Packed in our signature gold-embossed gift box with complimentary samples.",
    images: [DEFAULT_PRODUCT_IMAGE],
    sizes: [
      { ml: 50, price: 4999 },
    ],
    compareAtPrice: 9800,
    notes: {
      top: ["Cardamom", "Lychee", "Bergamot"],
      heart: ["Damascena Rose", "Smoked Oud", "Praline"],
      base: ["Tuscan Leather", "White Musk", "Amber"],
    },
    longevity: 5,
    projection: "Enormous (10-12 Hours)",
    isBestSeller: true,
    isNewArrival: false,
    createdAt: "2025-02-10T12:00:00Z",
  },
  {
    id: "fn-015",
    slug: "twin-pack",
    name: "Signature Twin Pack",
    category: "deals",
    description:
      "The definitive masculine power combo. Pair the crisp versatile magnetism of Urban Legend with the deep nighttime gravity of Noir Oud at an unbeatable 35% discount.",
    images: [DEFAULT_PRODUCT_IMAGE],
    sizes: [
      { ml: 50, price: 5499 },
    ],
    compareAtPrice: 10500,
    notes: {
      top: ["Calabrian Bergamot", "Pink Pepper", "Iranian Saffron"],
      heart: ["Sichuan Pepper", "Cambodian Oud", "Smoked Birch"],
      base: ["Ambroxan", "Patchouli", "Bourbon Vanilla"],
    },
    longevity: 5,
    projection: "Maximum Endurance (12+ Hours)",
    isBestSeller: true,
    isNewArrival: false,
    createdAt: "2025-02-14T17:00:00Z",
  },
];

/**
 * Returns all base catalog products
 */
export function getAllProducts(): Product[] {
  return INITIAL_PRODUCTS;
}

/**
 * Finds a product by its URL slug
 */
export function getProductBySlug(slug: string): Product | undefined {
  return INITIAL_PRODUCTS.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

/**
 * Filters products by category ("men" | "women" | "testers" | "deals")
 */
export function getProductsByCategory(category: Category): Product[] {
  return INITIAL_PRODUCTS.filter((p) => p.category === category);
}

/**
 * Searches products by name, description, category, and notes
 */
export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return INITIAL_PRODUCTS.filter((p) => {
    const matchName = p.name.toLowerCase().includes(q);
    const matchDesc = p.description.toLowerCase().includes(q);
    const matchCat = p.category.toLowerCase().includes(q);
    const matchNotes = [
      ...p.notes.top,
      ...p.notes.heart,
      ...p.notes.base,
    ].some((n) => n.toLowerCase().includes(q));
    return matchName || matchDesc || matchCat || matchNotes;
  });
}
