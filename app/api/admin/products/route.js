import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

// GET /api/admin/products — list all products
export async function GET(request) {
  const admin = requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const products = await prisma.product.findMany({
    orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }, { createdAt: 'asc' }],
    include: { seo: true },
  });

  return NextResponse.json(products);
}

// POST /api/admin/products — create product
export async function POST(request) {
  const admin = requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const body = await request.json();
    const { name, category, features, description, imageUrl, slug, inStock, sortOrder } = body;

    if (!name || !category || !description || !imageUrl) {
      return NextResponse.json({ error: 'name, category, description, imageUrl are required.' }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        category,
        features: Array.isArray(features) ? features : [],
        description,
        imageUrl,
        slug: slug || null,
        inStock: inStock !== undefined ? inStock : true,
        sortOrder: sortOrder || 0,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error('[CREATE PRODUCT]', err);
    return NextResponse.json({ error: 'Failed to create product.' }, { status: 500 });
  }
}
