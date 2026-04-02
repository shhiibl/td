import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Only fetch in-stock products for the public catalog
    const products = await prisma.product.findMany({
      where: { inStock: true },
      orderBy: [
        { category: 'asc' },
        { sortOrder: 'asc' },
        { createdAt: 'asc' }
      ]
    });
    
    return NextResponse.json(products);
  } catch (err) {
    console.error('[PUBLIC PRODUCTS API]', err);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
