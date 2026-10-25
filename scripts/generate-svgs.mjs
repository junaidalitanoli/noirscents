import fs from 'fs';
import path from 'path';

const targetDir = path.resolve('public/images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function createProductSvg(title, subtitle, angle = 1) {
  const isAngle2 = angle === 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F7F7F8" />
      <stop offset="100%" stop-color="#EBECEF" />
    </linearGradient>
    <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#E2E4E8" stop-opacity="0.6" />
    </linearGradient>
    <filter id="softShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#000000" flood-opacity="0.08" />
    </filter>
  </defs>

  <!-- Soft Grey Studio Background -->
  <rect width="600" height="800" fill="url(#bgGrad)" />

  <!-- Pedestal / Floor Shadow -->
  <ellipse cx="300" cy="650" rx="160" ry="20" fill="#000000" opacity="0.06" />
  <ellipse cx="300" cy="648" rx="100" ry="10" fill="#000000" opacity="0.04" />

  <!-- Perfume Bottle Silhouette Assembly -->
  <g filter="url(#softShadow)" transform="${isAngle2 ? 'translate(10, 0) scale(0.98)' : ''}">
    <!-- Cap -->
    <rect x="255" y="200" width="90" height="85" rx="3" fill="#18181B" />
    <rect x="260" y="205" width="80" height="4" rx="1" fill="#FFFFFF" opacity="0.15" />
    
    <!-- Atomizer Collar -->
    <rect x="276" y="285" width="48" height="24" rx="2" fill="#D4AF37" opacity="0.9" />
    <line x1="276" y1="297" x2="324" y2="297" stroke="#997C1E" stroke-width="1.5" />

    <!-- Glass Shoulder & Body -->
    <rect x="185" y="308" width="230" height="320" rx="8" fill="url(#glassGrad)" stroke="#D1D5DB" stroke-width="1.5" />
    
    <!-- Inner Fluid Silhouette -->
    <rect x="200" y="328" width="200" height="280" rx="4" fill="#DCDFE5" opacity="0.45" />

    <!-- Bottle Label -->
    <rect x="220" y="400" width="160" height="150" rx="2" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1" />
    <line x1="235" y1="415" x2="365" y2="415" stroke="#18181B" stroke-width="0.8" opacity="0.4" />
    
    <text x="300" y="445" font-family="Montserrat, -apple-system, sans-serif" font-size="11" font-weight="600" letter-spacing="3" fill="#18181B" text-anchor="middle">NOIR SCENT</text>
    <text x="300" y="468" font-family="Montserrat, -apple-system, sans-serif" font-size="13" font-weight="700" letter-spacing="1" fill="#18181B" text-anchor="middle">${title.toUpperCase()}</text>
    <text x="300" y="488" font-family="Montserrat, -apple-system, sans-serif" font-size="9" font-weight="500" letter-spacing="2" fill="#71717A" text-anchor="middle">EXTRAIT DE PARFUM</text>
    <text x="300" y="520" font-family="Montserrat, -apple-system, sans-serif" font-size="9" font-weight="400" letter-spacing="1.5" fill="#A1A1AA" text-anchor="middle">50ML - 1.7 FL. OZ.</text>
    
    <!-- Vertical Highlight Line -->
    <line x1="205" y1="320" x2="205" y2="615" stroke="#FFFFFF" stroke-width="3" opacity="0.6" />
  </g>

  <!-- Perspective Note Badge on Angle 2 -->
  ${isAngle2 ? `
  <g transform="translate(420, 240)">
    <circle cx="0" cy="0" r="22" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1" />
    <text x="0" y="4" font-family="Montserrat, sans-serif" font-size="9" font-weight="600" fill="#71717A" text-anchor="middle">SIDE</text>
  </g>` : ''}

  <!-- Caption text at bottom -->
  <text x="300" y="740" font-family="Montserrat, sans-serif" font-size="11" font-weight="500" letter-spacing="2" fill="#9CA3AF" text-anchor="middle">${title} &#8226; ${isAngle2 ? 'View 2' : 'View 1'} (3:4)</text>
</svg>`;
}

function createHeroBannerSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 800" width="1920" height="800">
  <defs>
    <linearGradient id="heroBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181B" />
      <stop offset="50%" stop-color="#121214" />
      <stop offset="100%" stop-color="#09090B" />
    </linearGradient>
    <linearGradient id="accentGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.1" />
      <stop offset="50%" stop-color="#D4AF37" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#D4AF37" stop-opacity="0.0" />
    </linearGradient>
  </defs>

  <rect width="1920" height="800" fill="url(#heroBg)" />
  <rect x="0" y="0" width="1920" height="800" fill="url(#accentGlow)" />

  <!-- Subtle Minimal Geometric Line Art -->
  <line x1="100" y1="120" x2="600" y2="120" stroke="#FFFFFF" stroke-width="0.5" opacity="0.2" />
  <line x1="100" y1="680" x2="600" y2="680" stroke="#FFFFFF" stroke-width="0.5" opacity="0.2" />

  <!-- Perfume Silhouette on Right -->
  <g transform="translate(1320, 150) scale(0.9)">
    <ellipse cx="200" cy="550" rx="160" ry="25" fill="#000000" opacity="0.5" />
    <rect x="155" y="70" width="90" height="80" rx="3" fill="#27272A" stroke="#3F3F46" stroke-width="1.5" />
    <rect x="175" y="150" width="50" height="24" rx="2" fill="#D4AF37" opacity="0.8" />
    <rect x="90" y="174" width="220" height="340" rx="8" fill="#18181B" stroke="#52525B" stroke-width="2" />
    <rect x="120" y="260" width="160" height="160" rx="2" fill="#09090B" stroke="#3F3F46" stroke-width="1" />
    <text x="200" y="310" font-family="Montserrat, sans-serif" font-size="12" font-weight="600" letter-spacing="3" fill="#D4AF37" text-anchor="middle">NOIR SCENT</text>
    <text x="200" y="345" font-family="Montserrat, sans-serif" font-size="16" font-weight="700" letter-spacing="2" fill="#FFFFFF" text-anchor="middle">HAUTE PARFUM</text>
    <text x="200" y="375" font-family="Montserrat, sans-serif" font-size="10" font-weight="500" letter-spacing="2" fill="#A1A1AA" text-anchor="middle">EXTRAIT DE PARFUM</text>
  </g>

  <!-- Left Content Silhouette Graphic Placeholder Label -->
  <text x="180" y="320" font-family="Montserrat, sans-serif" font-size="14" font-weight="600" letter-spacing="5" fill="#D4AF37">OFFICIAL LUXURY STOREFRONT</text>
  <text x="180" y="400" font-family="Montserrat, sans-serif" font-size="56" font-weight="700" letter-spacing="2" fill="#FFFFFF">TIMELESS SCENTS</text>
  <text x="180" y="470" font-family="Montserrat, sans-serif" font-size="56" font-weight="700" letter-spacing="2" fill="#FFFFFF">UNCOMPROMISING LUXURY</text>
  <text x="180" y="530" font-family="Montserrat, sans-serif" font-size="18" font-weight="400" letter-spacing="1" fill="#A1A1AA">Handcrafted long-lasting concentrated extraits for the modern connoisseur.</text>
  
  <text x="180" y="730" font-family="Montserrat, sans-serif" font-size="13" font-weight="500" letter-spacing="2" fill="#71717A">HERO BANNER PLACEHOLDER (1920 &#215; 800 PX)</text>
</svg>`;
}

function createCategorySvg(title, subtitle) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800">
  <defs>
    <linearGradient id="catBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F2F3F5" />
      <stop offset="100%" stop-color="#E2E4E8" />
    </linearGradient>
  </defs>

  <rect width="600" height="800" fill="url(#catBg)" />
  <ellipse cx="300" cy="560" rx="140" ry="18" fill="#000000" opacity="0.06" />

  <g transform="translate(180, 180) scale(0.8)">
    <rect x="95" y="70" width="90" height="80" rx="3" fill="#18181B" opacity="0.8" />
    <rect x="115" y="150" width="50" height="24" rx="2" fill="#D4AF37" opacity="0.8" />
    <rect x="30" y="174" width="220" height="310" rx="8" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" />
    <rect x="60" y="240" width="160" height="150" rx="2" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" />
    <text x="140" y="315" font-family="Montserrat, sans-serif" font-size="12" font-weight="600" letter-spacing="2" fill="#18181B" text-anchor="middle">NOIR SCENT</text>
    <text x="140" y="340" font-family="Montserrat, sans-serif" font-size="10" font-weight="500" letter-spacing="2" fill="#71717A" text-anchor="middle">${title.toUpperCase()}</text>
  </g>

  <rect x="50" y="620" width="500" height="120" rx="4" fill="#FFFFFF" opacity="0.9" stroke="#E5E7EB" stroke-width="1" />
  <text x="300" y="670" font-family="Montserrat, sans-serif" font-size="20" font-weight="700" letter-spacing="2" fill="#18181B" text-anchor="middle">${title.toUpperCase()}</text>
  <text x="300" y="700" font-family="Montserrat, sans-serif" font-size="12" font-weight="500" letter-spacing="1" fill="#71717A" text-anchor="middle">${subtitle}</text>
</svg>`;
}

function createPromoBannerSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 600" width="1440" height="600">
  <defs>
    <linearGradient id="promoBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181B" />
      <stop offset="100%" stop-color="#09090B" />
    </linearGradient>
  </defs>
  <rect width="1440" height="600" fill="url(#promoBg)" />
  <rect x="40" y="40" width="1360" height="520" fill="none" stroke="#27272A" stroke-width="1.5" />
  
  <text x="720" y="240" font-family="Montserrat, sans-serif" font-size="14" font-weight="600" letter-spacing="4" fill="#D4AF37" text-anchor="middle">LIMITED EDITION RESERVE</text>
  <text x="720" y="310" font-family="Montserrat, sans-serif" font-size="44" font-weight="700" letter-spacing="2" fill="#FFFFFF" text-anchor="middle">THE ROYAL DUO COLLECTION</text>
  <text x="720" y="365" font-family="Montserrat, sans-serif" font-size="16" font-weight="400" letter-spacing="1" fill="#A1A1AA" text-anchor="middle">Experience unparalleled sillage &amp; longevity with our masterfully curated twin bundles.</text>
  <text x="720" y="480" font-family="Montserrat, sans-serif" font-size="12" font-weight="500" letter-spacing="2" fill="#71717A" text-anchor="middle">PROMOTIONAL BANNER PLACEHOLDER (1440 &#215; 600 PX)</text>
</svg>`;
}

function createLogoSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80" width="300" height="80">
  <text x="150" y="42" font-family="Montserrat, -apple-system, sans-serif" font-size="24" font-weight="700" letter-spacing="4" fill="#18181B" text-anchor="middle">NOIR SCENT</text>
  <text x="150" y="62" font-family="Montserrat, -apple-system, sans-serif" font-size="8" font-weight="600" letter-spacing="3" fill="#71717A" text-anchor="middle">HAUTE PARFUMERIE</text>
</svg>`;
}

const products = [
  { slug: 'urban-legend', name: 'Urban Legend' },
  { slug: 'ghalib', name: 'Ghalib' },
  { slug: 'aqua-mist', name: 'Aqua Mist' },
  { slug: 'noir-oud', name: 'Noir Oud' },
  { slug: 'royal-amber', name: 'Royal Amber' },
  { slug: 'sultan', name: 'Sultan' },
  { slug: 'imperial-leather', name: 'Imperial Leather' },
  { slug: 'velvet-rose', name: 'Velvet Rose' },
  { slug: 'safwa', name: 'Safwa' },
  { slug: 'lahore-nights', name: 'Lahore Nights' },
  { slug: 'grand-discovery', name: 'Grand Discovery Set' },
  { slug: 'oud-explorer', name: 'Oud Explorer Box' },
  { slug: 'musk-tahara', name: 'Musk Tahara Set' },
  { slug: 'royal-duo', name: 'The Royal Duo' },
  { slug: 'twin-pack', name: 'Signature Twin Pack' }
];

console.log('Generating product SVG placeholders...');
for (const p of products) {
  fs.writeFileSync(path.join(targetDir, `${p.slug}-1.svg`), createProductSvg(p.name, 'Front View', 1), 'utf8');
  fs.writeFileSync(path.join(targetDir, `${p.slug}-2.svg`), createProductSvg(p.name, 'Side Angle', 2), 'utf8');
}

console.log('Generating banner and category placeholders...');
fs.writeFileSync(path.join(targetDir, 'hero-banner.svg'), createHeroBannerSvg(), 'utf8');
fs.writeFileSync(path.join(targetDir, 'promo-banner.svg'), createPromoBannerSvg(), 'utf8');
fs.writeFileSync(path.join(targetDir, 'logo.svg'), createLogoSvg(), 'utf8');
fs.writeFileSync(path.join(targetDir, 'category-men.svg'), createCategorySvg('Men', 'Masculine Oriental &amp; Woody Signatures'), 'utf8');
fs.writeFileSync(path.join(targetDir, 'category-women.svg'), createCategorySvg('Women', 'Velvety Florals &amp; Sweet Ambers'), 'utf8');
fs.writeFileSync(path.join(targetDir, 'category-deals.svg'), createCategorySvg('Bundles', 'Curated Sets &amp; Exclusive Duos'), 'utf8');
fs.writeFileSync(path.join(targetDir, 'category-testers.svg'), createCategorySvg('Testers', 'Discovery Flights &amp; Travel Atomizers'), 'utf8');

console.log('All neutral placeholders created successfully!');
