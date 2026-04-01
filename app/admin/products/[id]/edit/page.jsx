import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditProductClient from './EditProductClient';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  return { title: product ? `Edit: ${product.name} | Admin` : 'Edit Product | Admin' };
}

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { seo: true },
  });
  if (!product) notFound();

  return (
    <EditProductClient
      product={product}
      seo={product.seo}
      productId={id}
    />
  );
}
