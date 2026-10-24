import { Product, Category } from "@/types";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "fn-001",
    slug: "urban-legend",
    name: "Urban Legend",
    category: "men",
    description:
      "A magnetic modern masterpiece engineered for the ambitious metropolitan man navigating Pakistan's vibrant cities. Opening with an electrifying surge of sun-drenched Calabrian bergamot and fiery pink pepper, Urban Legend commands immediate attention without overpowering the room. As the brisk citrus opening settles, an intriguing core of crushed Sichuan pepper, herbaceous lavender, and crisp geranium emerges, lending refined structure and crystalline depth. The drydown reveals the true soul of this extrait: an opulent bed of warm mineral ambroxan, dry smoky cedarwood, and earthy Haitian vetiver enveloped in rich labdanum resins. Handcrafted with a concentrated 35% oil formulation, it effortlessly withstands humid afternoons in Karachi and crisp evenings in Islamabad, leaving an unforgettable trail of modern masculinity and quiet prestige everywhere you walk.",
    images: ["/images/urban-legend-bottle.jpg", "/images/noir-box.jpg"],
    sizes: [
      { ml: 50, price: 2950 },
    ],
    compareAtPrice: 5200,
    sizeLabel: "50 ml",
    badge: "Best Seller",
    notes: {
      top: ["Calabrian Bergamot", "Pink Pepper", "Fresh Elemi"],
      heart: ["Sichuan Pepper", "Lavender", "Geranium"],
      base: ["Ambroxan", "Cedarwood", "Haitian Vetiver", "Labdanum"],
    },
    longevity: 5,
    projection: "Strong & Radiant (8-10 Hours)",
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
      "A poetic, soulful harmony of royal oriental tradition and contemporary olfactory finesse, inspired by the nocturnal literary symposiums of old Lahore and Delhi. Ghalib unfolds with an aromatic prelude of freshly crushed green cardamom, sun-warmed coriander seeds, and dark cypress leaves that immediately evoke historic courtyard gardens. The heart yields an intoxicating romance between smoldering vintage Cambodian oud and velvety crimson Damascus roses, balanced with resinous cistus incanus. Grounding this majestic journey is a decadent base of glove-soft Tuscan leather, creamy Mysore sandalwood, rich benzoin tears, and aged ambergris. Formulated as a non-alcoholic Extrait de Parfum, Ghalib radiates a regal presence for 8–12+ hours, making it the definitive choice for formal cultural celebrations, festive wedding receptions, and momentous evenings where enduring elegance is non-negotiable.",
    images: ["/images/ghalib-bottle.jpg", "/images/noir-box.jpg"],
    sizes: [
      { ml: 50, price: 3450 },
    ],
    compareAtPrice: 6000,
    sizeLabel: "50 ml",
    badge: "Best Seller",
    notes: {
      top: ["Green Cardamom", "Coriander", "Cypress Leaves"],
      heart: ["Damascus Rose", "Smoked Oud", "Cistus Incanus"],
      base: ["Tuscan Leather", "Sandalwood", "Benzoin", "Rare Amber"],
    },
    longevity: 5,
    projection: "Enveloping & Majestic (8-12+ Hours)",
    isBestSeller: true,
    isNewArrival: false,
    createdAt: "2025-01-15T12:00:00Z",
  },
  {
    id: "fn-003",
    slug: "aqua-mist",
    name: "Aqua Mist",
    category: "men",
    description:
      "An exhilarating plunge into the crashing azure waves along the Arabian Sea coastline, Aqua Mist delivers vibrant freshness specifically formulated to triumph over soaring subcontinental heat. The fragrance explodes with sparkling ruby grapefruit, crisp Italian mandarin, and an invigorating sea salt mineral spray that instantly cools the senses. As the marine breeze unfurls, aromatic coastal rosemary, delicate sea kelp accord, and bitter neroli petals introduce sophisticated complexity rarely found in aquatic perfumes. The finish rests upon sun-bleached coastal driftwood, clean white musk, and radiant solar amber that cling tenaciously to skin and fabrics alike. Unlike transient European colognes, this concentrated extrait boasts a 35% oil concentration, providing 8–12+ hours of breezy, clean, and energizing projection across bustling city streets and humid coastal afternoons.",
    images: ["/images/aqua-mist-bottle.jpg", "/images/noir-box.jpg"],
    sizes: [
      { ml: 50, price: 2450 },
    ],
    compareAtPrice: 4800,
    sizeLabel: "50 ml",
    notes: {
      top: ["Sea Salt Spray", "Ruby Grapefruit", "Italian Mandarin"],
      heart: ["Coastal Rosemary", "Seaweed Essence", "Neroli"],
      base: ["Sun-Bleached Driftwood", "White Musk", "Solar Amber"],
    },
    longevity: 4,
    projection: "Crisp & Refreshing (8-10 Hours)",
    isBestSeller: false,
    isNewArrival: false,
    createdAt: "2025-02-01T08:30:00Z",
  },
  {
    id: "fn-004",
    slug: "noir-oud",
    name: "Noir Oud",
    category: "men",
    description:
      "A brooding, enigmatic Extrait de Parfum conceived for true connoisseurs of pure oriental perfumery. Noir Oud opens with a dark whisper of rare Iranian saffron threads, bitter Valencian almonds, and freshly grated nutmeg, sparking immediate fascination. The scent swiftly plunges into a nocturnal heart dominated by wild Cambodian agarwood and smoldering birch tar, sweetened ever so delicately with dark roasted praline. As hours progress, the drydown emerges with earthy Indonesian patchouli, rich bourbon vanilla bean, and an opulent smoky amberwood accord that clings with hypnotic tenacity. Formulated without denatured alcohol, Noir Oud interacts intimately with your skin's natural warmth, releasing velvety ribbons of deep agarwood that project with authoritative poise for 8–12+ hours during winter gatherings, black-tie galas, and intimate celebratory dinners.",
    images: ["/images/noir-oud-bottle.jpg", "/images/noir-box.jpg"],
    sizes: [
      { ml: 50, price: 3850 },
    ],
    compareAtPrice: 6800,
    sizeLabel: "50 ml",
    notes: {
      top: ["Iranian Saffron", "Bitter Almond", "Nutmeg"],
      heart: ["Cambodian Agarwood", "Smoked Birch", "Dark Praline"],
      base: ["Indonesian Patchouli", "Bourbon Vanilla", "Castoreum Accord"],
    },
    longevity: 5,
    projection: "Deep & Enveloping (8-12+ Hours)",
    isBestSeller: false,
    isNewArrival: false,
    createdAt: "2025-01-20T14:15:00Z",
  },
  {
    id: "fn-005",
    slug: "royal-amber",
    name: "Royal Amber",
    category: "women",
    description:
      "Liquid golden sophistication captured in an artisanal flacon, Royal Amber is a decadent gourmand-amber Extrait de Parfum crafted for those who embrace uninhibited luxury. The fragrance introduces itself with succulent golden pear nectar, sparkling bergamot zest, and delicate pink pepper beads that shimmer with effervescent charm. The heart blossoms into an opulent bouquet of night-blooming white jasmine, creamy cashmeran, and roasted tonka bean that feels like liquid velvet draped over the skin. Finally, a lush foundation of rare Baltic amber resin, aged Madagascar vanilla caviar, and creamy sandalwood anchors the composition with irresistible warmth and seductive longevity. Non-alcoholic and concentrated at 35% fragrance oils, Royal Amber leaves a mesmerizing 8–12+ hour sillage that garners compliments at festive family reunions and milestone celebrations.",
    images: ["/images/royal-amber-bottle.jpg", "/images/noir-box.jpg"],
    sizes: [
      { ml: 50, price: 3250 },
    ],
    compareAtPrice: 5800,
    sizeLabel: "50 ml",
    badge: "Best Seller",
    notes: {
      top: ["Golden Pear", "Pink Pepper", "Bergamot Zest"],
      heart: ["Night-Blooming Jasmine", "Cashmeran", "Roasted Tonka"],
      base: ["Baltic Amber", "Madagascar Vanilla", "Creamy Sandalwood"],
    },
    longevity: 5,
    projection: "Warm & Seductive (8-10 Hours)",
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
      "Inspired by the regal architecture and dignified pageantry of subcontinental royal courts, Sultan is an authoritative woody-spicy extrait created for leaders who command effortless respect. The opening radiates nobility through crisp blood orange, aromatic juniper berries, and crushed cardamom seeds. The composition deepens into a sacred heart of smoldering Omani frankincense, fiery pimento pepper, and wild geranium petals, delivering complex warmth and distinguished character. A stately foundation of Virginia cedarwood, damp oakmoss, and rich green patchouli leaves completes the drydown with profound grounding strength. Formulated with zero denatured alcohol, Sultan provides a dignified 8–12+ hour aura that thrives in professional boardroom presentations, executive negotiations, and evening banquets where poise, heritage, and distinction define your personal signature.",
    images: ["/images/sultan-bottle.jpg", "/images/noir-box.jpg"],
    sizes: [
      { ml: 50, price: 3200 },
    ],
    compareAtPrice: 5600,
    sizeLabel: "50 ml",
    notes: {
      top: ["Blood Orange", "Cardamom Seed", "Juniper Berry"],
      heart: ["Omani Frankincense", "Geranium", "Pimento"],
      base: ["Virginia Cedar", "Oakmoss", "Patchouli Leaf"],
    },
    longevity: 4,
    projection: "Dignified & Strong (8-10 Hours)",
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
      "The pinnacle of understated luxury and bespoke tailoring, Imperial Leather translates the timeless tactile pleasure of handcrafted black suede into an unforgettable olfactory experience. The opening combines aromatic wild mountain thyme with ripe wild raspberries and spicy Persian saffron, creating an intriguing sweet-savory duality. The scent transitions gracefully into a refined heart of powdery Florentine iris, balsamic olibanum tears, and subtle night jasmine that softens the leather core. The drydown delivers a rich harmony of supple black suede, smoky birch leather, and warm amberwood that feels like slipping into a custom tailored leather jacket. Designed with 35% oil concentration, this non-alcoholic masterpiece maintains a sophisticated, smooth 8–12+ hour presence ideal for private club gatherings and evening receptions.",
    images: ["/images/imperial-leather-bottle.jpg", "/images/noir-box.jpg"],
    sizes: [
      { ml: 50, price: 3600 },
    ],
    compareAtPrice: 6200,
    sizeLabel: "50 ml",
    notes: {
      top: ["Wild Thyme", "Raspberry", "Saffron"],
      heart: ["Tuscan Iris", "Olibanum", "Night Jasmine"],
      base: ["Supple Black Suede", "Smoked Leather", "Amberwood"],
    },
    longevity: 5,
    projection: "Smooth & Sophisticated (8-11 Hours)",
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
      "An intoxicating modern interpretation of classic subcontinental floral grandeur, Velvet Rose wraps the senses in an opulent cocoon of romantic luxury. The fragrance commences with a burst of crisp dew-drenched lychee fruit, zesty Italian bergamot, and tangy pink rhubarb that dances with youthful vibrancy. At its radiant core lies a lavish bouquet of Bulgarian Damascena roses, delicate pink peonies, and sweet petalia blossoms interwoven with decadent melted praline. The perfume settles gently upon a comforting base of silky cashmeran woods, sensual white musk, and blond cedar, ensuring the floral sweetness remains sophisticated rather than cloying. With 35% pure fragrance oil, Velvet Rose guarantees an ethereal 8–12+ hour sillage that enchants wedding guests and elevates special occasions across Pakistan.",
    images: ["/images/noir-women.jpg", "/images/noir-box.jpg"],
    sizes: [
      { ml: 50, price: 2950 },
    ],
    compareAtPrice: 5300,
    sizeLabel: "50 ml",
    notes: {
      top: ["Lychee", "Bergamot", "Rhubarb"],
      heart: ["Bulgarian Damascena Rose", "Petalia", "Peony"],
      base: ["Praline Accord", "Cashmeran", "White Musk", "Cedar"],
    },
    longevity: 5,
    projection: "Radiant & Alluring (8-10 Hours)",
    isBestSeller: false,
    isNewArrival: false,
    createdAt: "2025-01-28T16:00:00Z",
  },
  {
    id: "fn-009",
    slug: "safwa",
    name: "Safwa",
    category: "women",
    description:
      "Meaning pure clarity and refined serenity, Safwa is a crystalline white floral Extrait de Parfum embodying timeless grace and effortless elegance. The fragrance awakens with crisp Williams pear slices, sparkling green mandarin flower, and aquatic lotus blossom that glisten like early morning dew. The composition gently blossoms into an immaculate white floral bouquet featuring sun-drenched Tunisian orange blossom, delicate lily of the valley, and creamy gardenia petals. Grounding the airy florals is a velvety bed of cashmere woods, translucent white musk, and soft solar amber that lingers intimately against warm skin. Non-alcoholic and gentle for daily wear, Safwa offers 8–12+ hours of peaceful, clean projection perfect for office professionals, university wear, and tranquil daytime gatherings.",
    images: ["/images/safwa-bottle.jpg", "/images/noir-box.jpg"],
    sizes: [
      { ml: 50, price: 2800 },
    ],
    compareAtPrice: 4900,
    sizeLabel: "50 ml",
    notes: {
      top: ["Williams Pear", "Mandarin Flower", "Lotus"],
      heart: ["Tunisian Orange Blossom", "Lily of the Valley", "Gardenia"],
      base: ["Cashmere Wood", "Clean Musk", "White Amber"],
    },
    longevity: 4,
    projection: "Clean & Serene (8-10 Hours)",
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
      "An enchanting, mysterious tribute to the bustling cultural spirit, vibrant culinary aromas, and midnight revelry of Lahore's historic walled city. Lahore Nights opens with an invigorating clash of roasted espresso coffee beans, bitter Mediterranean almond, and bright bergamot zest. The heart soon unveils a narcotic floral intensity powered by intoxicating tuberose absolute, night-blooming sambac jasmine, and sweet orange blossom. The drydown is deeply gourmand and seductive, weaving rich dark cocoa powder, caramelized roasted tonka beans, nutty praline, and earthy honeyed patchouli into an addictive trail. Engineered with high-concentration extrait oils, Lahore Nights endures for 8–12+ hours, making it the premier choice for nocturnal gatherings, winter festivities, and glamorous wedding after-parties.",
    images: ["/images/lahore-nights-bottle.jpg", "/images/noir-box.jpg"],
    sizes: [
      { ml: 50, price: 3500 },
    ],
    compareAtPrice: 6200,
    sizeLabel: "50 ml",
    notes: {
      top: ["Almond", "Coffee Bean", "Bergamot"],
      heart: ["Narcotic Tuberose", "Jasmine Sambac", "Orange Blossom"],
      base: ["Roasted Tonka Bean", "Dark Cocoa", "Praline", "Patchouli"],
    },
    longevity: 5,
    projection: "Sensual & Intoxicating (8-12 Hours)",
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
      "The definitive introductory experience for fragrance enthusiasts exploring artisanal Pakistani perfumery. The Grand Discovery Set houses five deluxe travel spray atomizers (10ml each) representing our most celebrated signature creations: Urban Legend, Ghalib, Noir Oud, Royal Amber, and Aqua Mist. Each extrait in this discovery flight features an authentic 35% oil concentration, allowing you to sample and wear our diverse olfactory profiles through full daily cycles. Whether you crave the crisp coastal vitality of Aqua Mist, the regal smoked rose oud of Ghalib, or the radiant amber sweetness of Royal Amber, this set helps you discover your signature fragrance at home before committing to a full flacon. Includes complimentary testing strips and a luxury gold-embossed presentation box.",
    images: ["/images/noir-testers.jpg", "/images/noir-box.jpg"],
    sizes: [
      { ml: 50, price: 1950 },
    ],
    compareAtPrice: 3500,
    sizeLabel: "Discovery Set", // TODO: 5 x 10ml travel spray atomizers (Urban Legend, Ghalib, Noir Oud, Royal Amber, Aqua Mist)
    badge: "Best Seller",
    notes: {
      top: ["Bergamot", "Cardamom", "Grapefruit", "Pear"],
      heart: ["Damascus Rose", "Jasmine", "Marine Accord", "Agarwood"],
      base: ["Amber", "Sandalwood", "Tuscan Leather", "Musk"],
    },
    longevity: 5,
    projection: "Varies by Fragrance (8-12+ Hours)",
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
      "A bespoke collector's tasting flight dedicated to the revered heritage of agarwood in subcontinental perfumery. The Oud Explorer Box contains four deluxe 10ml travel spray atomizers showcasing our diverse agarwood expressions: Noir Oud, Ghalib, Sultan, and Amber Oud Reserve. Handcrafted with genuine Cambodian and Assamese agarwood accords enriched with rare resins, frankincense, Damascus rose, and wild saffron, each travel flacon provides dozens of luxurious applications. With concentrated 35% non-alcoholic oil formulations, every selection delivers 8–12+ hours of enveloping oriental projection. This curated flight is the ideal gifting set for discerning gentlemen and connoisseurs who wish to experience the nuanced interplay between dark woods, smoky leathers, and exotic spices across different seasons and formal occasions.",
    images: ["/images/noir-testers.jpg", "/images/noir-box.jpg"],
    sizes: [
      { ml: 50, price: 2200 },
    ],
    compareAtPrice: 3900,
    sizeLabel: "Discovery Set", // TODO: 4 x 10ml travel spray atomizers (Noir Oud, Ghalib, Sultan, Amber Oud Reserve)
    notes: {
      top: ["Saffron", "Pink Pepper", "Nutmeg"],
      heart: ["Cambodian Oud", "Frankincense", "Smoked Rose"],
      base: ["Leather", "Patchouli", "Benzoin", "Amber"],
    },
    longevity: 5,
    projection: "Rich Oriental (8-12+ Hours)",
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
      "A sacred, pristine trio of artisanal concentrated perfume oils (attar rollers, 12ml each) celebrated for their velvety skin-scent intimacy and serene purity. The Musk Tahara Collection features three unique interpretations: Royal White Musk, Purity Rose Musk, and Royal Golden Musk. Thick, silky, and 100% non-alcoholic, each blend glides effortlessly onto pulse points, releasing soft whispers of powdery lotus, delicate Bulgarian rose petals, sweet lilac, and velvety tahara musk cream over warm sandalwood. Unlike spray perfumes that radiate loudly into a room, these dense extrait oils create a close, private scented halo that clings to skin and clothing for 8–12+ hours. Pure, gentle, and prayer-safe, they represent the absolute height of traditional subcontinental perfumed refinement.",
    images: ["/images/noir-testers.jpg", "/images/noir-box.jpg"],
    sizes: [
      { ml: 50, price: 1850 },
    ],
    compareAtPrice: 3200,
    sizeLabel: "Discovery Set", // TODO: 3 x 12ml non-alcoholic artisanal attar rollers (White, Rose, Golden Musk)
    notes: {
      top: ["White Lotus", "Powdery Violet", "Lilac"],
      heart: ["Honeyed Jasmine", "White Rose Petals"],
      base: ["Tahara Pure Musk", "Sandalwood Cream", "White Amber"],
    },
    longevity: 5,
    projection: "Intimate Skin-Scent (8-12+ Hours)",
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
      "The ultimate his-and-hers luxury perfume pairing presented in a custom gold-embossed gift box. The Royal Duo Pack combines full 50ml flacons of our two most beloved signature extraits: Ghalib (Smoked Damascus Rose, Cambodian Oud, and Glove Leather) and Velvet Rose (Bulgarian Rose, Sweet Praline, Lychee, and White Musk). Formulated with 35% pure perfume oil concentrations, both fragrances are completely non-alcoholic and deliver 8–12+ hours of magnetic, sophisticated sillage across subcontinental weather conditions. Whether purchased as an exquisite wedding gift, an anniversary celebration, or a shared couple's luxury collection, this curated duo provides unparalleled value and olfactory distinction. Includes complimentary discovery sample vials and nationwide doorstep Cash on Delivery delivery across Pakistan.",
    images: ["/images/noir-bundles.jpg", "/images/noir-women.jpg"],
    sizes: [
      { ml: 50, price: 4999 },
    ],
    compareAtPrice: 9800,
    sizeLabel: "Bundle", // TODO: 2 x 50ml flacons (Ghalib + Velvet Rose)
    notes: {
      top: ["Cardamom", "Lychee", "Bergamot"],
      heart: ["Damascena Rose", "Smoked Oud", "Praline"],
      base: ["Tuscan Leather", "White Musk", "Amber"],
    },
    longevity: 5,
    projection: "Enormous Sillage (8-12+ Hours)",
    isBestSeller: false,
    isNewArrival: false,
    createdAt: "2025-02-10T12:00:00Z",
  },
  {
    id: "fn-015",
    slug: "twin-pack",
    name: "Signature Twin Pack",
    category: "deals",
    description:
      "The definitive masculine power combination created for the man who demands versatile olfactory excellence day and night. The Signature Twin Pack includes two full 50ml flacons of our highest-rated masculine extraits: Urban Legend for daytime business meetings and crisp metropolitan energy, paired with Noir Oud for nighttime dinners, formal celebrations, and black-tie galas. Both fragrances feature concentrated 35% perfume oil formulations engineered to maintain 8–12+ hours of captivating projection even in peak summer heat. By bundling our two most iconic masculine extraits together, you enjoy exceptional savings while securing a complete olfactory wardrobe capable of mastering every business meeting, casual outing, and grand celebration on your calendar.",
    images: ["/images/noir-bundles.jpg", "/images/urban-legend-bottle.jpg"],
    sizes: [
      { ml: 50, price: 5499 },
    ],
    compareAtPrice: 10500,
    sizeLabel: "Bundle", // TODO: 2 x 50ml flacons (Urban Legend + Noir Oud)
    notes: {
      top: ["Calabrian Bergamot", "Pink Pepper", "Iranian Saffron"],
      heart: ["Sichuan Pepper", "Cambodian Oud", "Smoked Birch"],
      base: ["Ambroxan", "Patchouli", "Bourbon Vanilla"],
    },
    longevity: 5,
    projection: "Exceptional Endurance (8-12+ Hours)",
    isBestSeller: false,
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
