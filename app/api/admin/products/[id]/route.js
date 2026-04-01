import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

// PUT /api/admin/products/[id] — update product
export async function PUT(request, { params }) {
  const admin = requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();
    const { name, category, features, description, imageUrl, slug, inStock, sortOrder } = body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(category !== undefined && { category }),
        ...(features !== undefined && { features: Array.isArray(features) ? features : [] }),
        ...(description !== undefined && { description }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(slug !== undefined && { slug: slug || null }),
        ...(inStock !== undefined && { inStock }),
        ...(sortOrder !== undefined && { sortOrder }),
      },
    });

    return NextResponse.json(product);
  } catch (err) {
    console.error('[UPDATE PRODUCT]', err);
    if (err.code === 'P2025') return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to update product.' }, { status: 500 });
  }
}

// DELETE /api/admin/products/[id] — delete product
export async function DELETE(request, { params }) {
  const admin = requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const { id } = await params;
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DELETE PRODUCT]', err);
    if (err.code === 'P2025') return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to delete product.' }, { status: 500 });
  }
}
