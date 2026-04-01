const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();

console.log('--- SEED SCRIPT STARTING ---');
console.log('CWD:', process.cwd());
console.log('DIRECT_URL exists:', !!process.env.DIRECT_URL);

if (process.env.DIRECT_URL) {
  process.env.DATABASE_URL = process.env.DIRECT_URL;
}
const prisma = new PrismaClient();

// ─── Catalog Data ─────────────────────────────────────────────────────────────
const catalogData = {
  household: {
    items: [
      { name: 'Abaya Wash', features: ['Premium Care', 'Maintain Richness'], desc: 'Elegant Care. Royal Freshness. Lending Confidence. Specially formulated to preserve black elegance and fine texture. Leaves your abaya feeling fresh, soft, and radiant.', image: '/products/Abaya wash.png' },
      { name: 'Dish Washing Liquid', features: ['Tough on Grease', 'Gentle on Hands'], desc: 'Sparkling dishes. Powerful grease-cutting formula removes tough stains and food residues while being exceptionally gentle on your hands.', image: '/products/Dish Washing Liquid.png' },
      { name: 'Fabric Softener', features: ['Lasting Freshness', 'Lovable Comfort'], desc: 'Feather Touch. Wrap your clothes in luxurious softness. Its unique formula gives fabrics a gentle, feather-like feel, making them incredibly smooth and fresh.', image: '/products/Fabric softener.png' },
      { name: 'Floor Cleaner', features: ['Multipurpose', 'Refreshing Fragrance'], desc: 'Multipurpose freshness for all surfaces. Advanced formula removes tough stains effortlessly while leaving behind a long-lasting, inviting scent.', image: '/products/Floor Cleaner.png' },
      { name: 'Hand Wash (500ml)', features: ['500 ml', 'Soft Hands'], desc: 'Gentle Protection. Formulated with skin-friendly ingredients that remove dirt proactively while ensuring your hands remain soft and hydrated.', image: '/products/Hand wash 500ml.png' },
      { name: 'Luxury Hand Wash', features: ['Premium Formula', 'Gentle Cleanse'], desc: 'Silky smooth cleansing that nourishes your skin while actively eliminating germs and delivering a sophisticated fragrance.', image: '/products/Hand wash.png' },
      { name: 'Liquid Detergent', features: ['Deep Clean', 'Fabric Protection'], desc: "Gentle Care yet Deep Clean. Advanced liquid formula penetrates deep into fibers, lifting tough stains while preserving your garment's brightness.", image: '/products/Liquid detergent.png' },
    ],
  },
  industrial: {
    items: [
      { name: 'Abaya Wash (25L)', features: ['25 L', 'Industrial Grade'], desc: 'Industrial-strength elegance preservation perfectly crafted for large-scale operations handling black and dark delicate garments.', image: '/products/Abaya wash 25L.png' },
      { name: 'Fabric Softener (25L)', features: ['25 L', 'Bulk Comfort'], desc: 'Commercial-grade fabric conditioning. Reduces static, enhances fabric smoothness, and imparts an enduring pleasant fragrance optimized for bulk use.', image: '/products/Fabric softener 25L.png' },
      { name: 'Fabric Stiffener (Starch)', features: ['Professional Finish'], desc: 'Achieve a crisp, immaculate look. Restores fabric body and adds a smooth, firm texture to garments. Essential for uniforms and fine linens.', image: '/products/Fabric stiffener.png' },
      { name: 'Floor Cleaner (25L)', features: ['25 L', 'Heavy Duty'], desc: 'Maximum coverage industrial floor cleaner. Vigorously cuts through commercial footprint grime while maintaining surface integrity.', image: '/products/Floor Cleaner 25 L.png' },
      { name: 'Concentrated Liquid Powder Gel', features: ['Fast Dissolving', 'High Yield'], desc: 'Designed for professional machinery. Dissolves rapidly, penetrates heavy textile layers, and eliminates severe grease without leaving residue.', image: '/products/Liquid powder gel.png' },
      { name: 'Premium Detergent Powder', features: ['25 kg', 'Heavy Stain Prep'], desc: "Heavy-weight performance delivered in a bulk 25kg sack. Conquers the toughest commercial stains while remaining surprisingly gentle.", image: '/products/Sack 25kg.png' },
      { name: 'Washing Soda', features: ['Alkaline Booster', 'Water Softener'], desc: 'A powerful alkaline cleaning booster amplifying detergent performance. Effectively breaks down oil and stains while naturally softening water.', image: '/products/washing soda.png' },
      { name: 'Lavender Detergent Powder', features: ['5 kg', 'Fresh Scent'], desc: 'Deep cleaning powered by an immersive lavender aromatics profile. Effectively brightens fabrics while imparting a soothing botanical scent.', image: '/products/lavender-5 kg f.png' },
    ],
  },
  carcare: {
    items: [
      { name: 'Premium Car Shampoo', features: ['High Foaming', 'pH Balanced'], desc: 'Bring out the perfect showroom shine. Exceptional foaming capabilities that safely lift road grime and dirt without stripping wax layers.', image: '/products/Car shanpoo.png' },
      { name: 'Heavy Duty Degreaser', features: ['Engine Safe', 'Oil Dissolving'], desc: 'Engineered for meticulous detailing. Quickly and safely dissolves baked-on grease, severe oil spills, and carbon buildup from complex machinery parts.', image: '/products/Heavy duty Degreaser.png' },
      { name: 'Pro Tyre Polish', features: ['Deep Black Finish', 'UV Protection'], desc: 'Restore a luscious, deep-black satin shine. Rejuvenates faded rubber safely, offering lasting protection against cracking and environmental dust.', image: '/products/Tyre Polish.png' },
    ],
  },
  hotels: {
    items: [
      { name: 'All Purpose Cleaner', features: ['1 L', 'Versatile Action'], desc: 'A versatile cornerstone cleaner tailored for hospitality environments. Effortlessly removes stains from diverse surfaces keeping rooms spotless.', image: '/products/All pupose cleaner_1.png' },
      { name: 'Bulk All Purpose Cleaner', features: ['5 L', 'High Capacity'], desc: 'High-volume cleaning dependability. The ultimate 5L solution for extensive hotel and restaurant surfaces demanding continuous, spotless upkeep.', image: '/products/All purpose cleaner 5L.png' },
      { name: 'Table and Glass Cleaner', features: ['Streak-Free', 'Rapid Dry'], desc: 'Experience pure transparency. Instantly removes fingerprints and smudges giving mirrors, dining tables, and delicate display surfaces a brilliant shine.', image: '/products/Table and glass Cleaner.png' },
      { name: 'Industrial Chimney Wash', features: ['Kitchen Degreaser', 'Carbon Remover'], desc: 'Tackle formidable kitchen elements. A powerful formula aggressively stripping oil, heavy soot, and carbon accumulation from exhaustive commercial hoods.', image: '/products/chimney wash.png' },
    ],
  },
};

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function generateSEO(item, category) {
  const metaTitle = `${item.name} - Tidy Mimo Professional Cleaning`;
  const metaDescription = item.desc.split('.').slice(0, 2).join('.') + '.';
  const keywords = [
    category,
    item.name,
    ...item.features,
    'professional cleaning',
    'Tidy Mimo',
    'industrial cleaning solutions'
  ].join(', ');

  return {
    metaTitle,
    metaDescription,
    keywords,
    ogTitle: metaTitle,
    ogDescription: metaDescription,
    ogImage: item.image
  };
}

async function main() {
  console.log('🌱 Starting seed...\n');

  let productCount = 0;
  for (const [category, data] of Object.entries(catalogData)) {
    for (let i = 0; i < data.items.length; i++) {
      const item = data.items[i];
      const slug = slugify(item.name);
      const seoData = generateSEO(item, category);

      const product = await prisma.product.upsert({
        where: { slug },
        create: { 
          name: item.name, 
          category, 
          features: item.features, 
          description: item.desc, 
          imageUrl: item.image, 
          slug, 
          sortOrder: i, 
          inStock: true,
          seo: {
            create: seoData
          }
        },
        update: { 
          name: item.name, 
          category, 
          features: item.features, 
          description: item.desc, 
          imageUrl: item.image, 
          sortOrder: i,
          seo: {
            upsert: {
              create: seoData,
              update: seoData
            }
          }
        },
      });
      
      console.log(`  ✅ [${category}] ${item.name}`);
      productCount++;
    }
  }
  console.log(`\n📦 Seeded ${productCount} products.`);

  const adminEmail = 'admin@tidymimo.com';
  const adminPassword = 'TidyAdmin@2024';
  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.admin.upsert({
    where: { email: adminEmail },
    create: { email: adminEmail, name: 'Tidy Mimo Admin', passwordHash },
    update: { name: 'Tidy Mimo Admin', passwordHash },
  });

  console.log(`\n👤 Admin account:`);
  console.log(`   Email   : ${adminEmail}`);
  console.log(`   Password: ${adminPassword}`);
  console.log(`   URL     : /admin/login`);
  console.log(`\n✨ Seed complete!`);
}

main()
  .catch(e => { console.error('❌ Seed failed:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
