'use client';
import ProductForm from '../../../components/ProductForm';

export default function EditProductClient({ product, seo, productId }) {
  return (
    <ProductForm
      initialProduct={product}
      initialSeo={seo}
      productId={productId}
    />
  );
}
