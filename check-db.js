const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    include: { seo: true }
  });
  console.log(`Found ${products.length} products.`);
  if (products.length > 0) {
    console.log('First product sample:', JSON.stringify(products[0], null, 2));
  }
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
