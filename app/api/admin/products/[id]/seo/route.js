import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

// GET /api/admin/products/[id]/seo
export async function GET(request, { params }) {
  const admin = requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const { id } = await params;
  const seo = await prisma.productSeo.findUnique({ where: { productId: id } });
  return NextResponse.json(seo || {});
}

// PUT /api/admin/products/[id]/seo
export async function PUT(request, { params }) {
  const admin = requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();
    const { metaTitle, metaDescription, keywords, ogTitle, ogDescription, ogImage } = body;

    const seo = await prisma.productSeo.upsert({
      where: { productId: id },
      create: {
        productId: id,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        keywords: keywords || null,
        ogTitle: ogTitle || null,
        ogDescription: ogDescription || null,
        ogImage: ogImage || null,
      },
      update: {
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        keywords: keywords || null,
        ogTitle: ogTitle || null,
        ogDescription: ogDescription || null,
        ogImage: ogImage || null,
      },
    });

    return NextResponse.json(seo);
  } catch (err) {
    console.error('[UPDATE SEO]', err);
    return NextResponse.json({ error: 'Failed to update SEO.' }, { status: 500 });
  }
}
