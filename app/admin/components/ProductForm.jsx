'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CATEGORIES = [
  { value: 'household', label: '🏠 Household Care' },
  { value: 'industrial', label: '🏭 Industrial / Laundry' },
  { value: 'carcare', label: '🚗 Car Care' },
  { value: 'hotels', label: '🏨 Hotels & Restaurants' },
];

const TABS = ['Product', 'SEO'];

export default function ProductForm({ initialProduct = null, initialSeo = null, productId = null }) {
  const router = useRouter();
  const isEdit = !!productId;

  const [activeTab, setActiveTab] = useState('Product');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Product fields
  const [product, setProduct] = useState({
    name: initialProduct?.name || '',
    category: initialProduct?.category || 'household',
    description: initialProduct?.description || '',
    imageUrl: initialProduct?.imageUrl || '',
    slug: initialProduct?.slug || '',
    inStock: initialProduct?.inStock !== undefined ? initialProduct.inStock : true,
    sortOrder: initialProduct?.sortOrder || 0,
    features: (initialProduct?.features || []).join(', '),
  });

  // SEO fields
  const [seo, setSeo] = useState({
    metaTitle: initialSeo?.metaTitle || '',
    metaDescription: initialSeo?.metaDescription || '',
    keywords: initialSeo?.keywords || '',
    ogTitle: initialSeo?.ogTitle || '',
    ogDescription: initialSeo?.ogDescription || '',
    ogImage: initialSeo?.ogImage || '',
  });

  async function saveProduct(e) {
    e.preventDefault();
    setSaving(true); setError(''); setSuccess('');
    try {
      const payload = {
        ...product,
        features: product.features.split(',').map(f => f.trim()).filter(Boolean),
        sortOrder: parseInt(product.sortOrder) || 0,
      };

      const url = isEdit ? `/api/admin/products/${productId}` : '/api/admin/products';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Save failed.'); return; }

      if (!isEdit) { router.push(`/admin/products/${data.id}/edit`); return; }
      setSuccess('Product saved!');
      setTimeout(() => setSuccess(''), 3000);
    } catch { setError('Network error.'); }
    finally { setSaving(false); }
  }

  async function saveSeo(e) {
    e.preventDefault();
    if (!productId) { setError('Save the product first, then update SEO.'); return; }
    setSaving(true); setError(''); setSuccess('');
    try {
      const res = await fetch(`/api/admin/products/${productId}/seo`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(seo),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'SEO save failed.'); return; }
      setSuccess('SEO updated!');
      setTimeout(() => setSuccess(''), 3000);
    } catch { setError('Network error.'); }
    finally { setSaving(false); }
  }

  const inputStyle = {
    width: '100%', padding: '0.85rem 1rem', borderRadius: '12px',
    border: '1.5px solid rgba(217,168,232,0.5)', fontSize: '0.95rem',
    outline: 'none', background: '#fff', color: '#1A0A1D', boxSizing: 'border-box',
    fontFamily: 'inherit',
  };
  const textareaStyle = { ...inputStyle, minHeight: '100px', resize: 'vertical' };
  const labelStyle = { display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#6C2A79', marginBottom: '8px' };
  const fieldStyle = { marginBottom: '1.2rem' };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F9F0FB' }}>
      {/* Sidebar */}
      <aside style={{
        width: '220px', background: 'linear-gradient(180deg, #3A0D45 0%, #1A0822 100%)',
        padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexShrink: 0,
      }}>
        <Link href="/admin" style={{ color: 'rgba(252,232,244,0.7)', textDecoration: 'none', fontSize: '0.88rem', padding: '0.6rem 0.8rem', borderRadius: '8px', display: 'block', marginBottom: '1rem' }}>
          ← Back to Dashboard
        </Link>
        <div style={{ color: '#FCE8F4', fontWeight: 700, fontSize: '1rem', padding: '0.5rem 0.8rem' }}>
          {isEdit ? '✏️ Edit Product' : '➕ New Product'}
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '2rem', maxWidth: '900px' }}>
        <h1 style={{ margin: '0 0 0.4rem', fontSize: '1.8rem', fontWeight: 700, color: '#1A0A1D' }}>
          {isEdit ? `Edit: ${initialProduct?.name || ''}` : 'Add New Product'}
        </h1>
        <p style={{ margin: '0 0 2rem', color: 'rgba(26,10,29,0.55)', fontSize: '0.9rem' }}>
          {isEdit ? 'Update product details and SEO settings.' : 'Fill in the details for the new product.'}
        </p>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '2rem', background: 'rgba(217,168,232,0.15)', borderRadius: '12px', padding: '4px', width: 'fit-content' }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.6rem 1.5rem', borderRadius: '10px', border: 'none', cursor: 'pointer',
                fontSize: '0.9rem', fontWeight: 700, transition: 'all 0.2s',
                background: activeTab === tab ? 'linear-gradient(135deg, #6C2A79, #D41479)' : 'transparent',
                color: activeTab === tab ? '#fff' : '#6C2A79',
                boxShadow: activeTab === tab ? '0 4px 12px rgba(212,20,121,0.25)' : 'none',
              }}>
              {tab === 'SEO' ? '🔍 SEO' : '📦 Product'}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {error && <div style={{ background: 'rgba(212,20,121,0.08)', border: '1px solid rgba(212,20,121,0.3)', borderRadius: '12px', padding: '0.85rem 1rem', color: '#D41479', marginBottom: '1.5rem', fontWeight: 500, fontSize: '0.9rem' }}>{error}</div>}
        {success && <div style={{ background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.3)', borderRadius: '12px', padding: '0.85rem 1rem', color: '#059669', marginBottom: '1.5rem', fontWeight: 500, fontSize: '0.9rem' }}>✓ {success}</div>}

        {/* Product Tab */}
        {activeTab === 'Product' && (
          <form onSubmit={saveProduct} style={{ background: '#fff', borderRadius: '20px', padding: '2rem', boxShadow: '0 4px 20px rgba(108,42,121,0.06)', border: '1px solid rgba(217,168,232,0.3)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1.5rem' }}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Product Name *</label>
                <input id="product-name" type="text" required value={product.name} style={inputStyle}
                  onChange={e => setProduct(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Abaya Wash" />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Category *</label>
                <select id="product-category" value={product.category} style={{ ...inputStyle, cursor: 'pointer' }}
                  onChange={e => setProduct(p => ({ ...p, category: e.target.value }))}>
                  {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Description *</label>
              <textarea id="product-desc" required value={product.description} style={textareaStyle}
                onChange={e => setProduct(p => ({ ...p, description: e.target.value }))}
                placeholder="Product description…" />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Image URL *</label>
              <input id="product-image" type="text" required value={product.imageUrl} style={inputStyle}
                onChange={e => setProduct(p => ({ ...p, imageUrl: e.target.value }))}
                placeholder="/products/product-name.png" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1.5rem' }}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Slug (URL)</label>
                <input id="product-slug" type="text" value={product.slug} style={inputStyle}
                  onChange={e => setProduct(p => ({ ...p, slug: e.target.value }))}
                  placeholder="e.g. abaya-wash" />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Sort Order</label>
                <input id="product-sort" type="number" value={product.sortOrder} style={inputStyle}
                  onChange={e => setProduct(p => ({ ...p, sortOrder: e.target.value }))} />
              </div>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Features (comma-separated)</label>
              <input id="product-features" type="text" value={product.features} style={inputStyle}
                onChange={e => setProduct(p => ({ ...p, features: e.target.value }))}
                placeholder="e.g. Premium Care, Gentle Formula, 500ml" />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
              <input id="product-instock" type="checkbox" checked={product.inStock}
                onChange={e => setProduct(p => ({ ...p, inStock: e.target.checked }))}
                style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#D41479' }} />
              <label htmlFor="product-instock" style={{ ...labelStyle, margin: 0, cursor: 'pointer' }}>In Stock</label>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button id="save-product-btn" type="submit" disabled={saving}
                style={{ padding: '0.9rem 2rem', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #6C2A79, #D41479)', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem', opacity: saving ? 0.7 : 1, boxShadow: '0 6px 20px rgba(212,20,121,0.3)' }}>
                {saving ? 'Saving…' : isEdit ? '💾 Save Changes' : '➕ Create Product'}
              </button>
              <Link href="/admin" style={{ padding: '0.9rem 2rem', borderRadius: '12px', background: 'rgba(108,42,121,0.08)', color: '#6C2A79', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center' }}>
                Cancel
              </Link>
            </div>
          </form>
        )}

        {/* SEO Tab */}
        {activeTab === 'SEO' && (
          <form onSubmit={saveSeo} style={{ background: '#fff', borderRadius: '20px', padding: '2rem', boxShadow: '0 4px 20px rgba(108,42,121,0.06)', border: '1px solid rgba(217,168,232,0.3)' }}>
            {!productId && (
              <div style={{ background: 'rgba(212,20,121,0.06)', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem', color: '#D41479', fontSize: '0.9rem', fontWeight: 500 }}>
                ⚠️ Save the product first, then you can configure SEO.
              </div>
            )}

            <div style={fieldStyle}>
              <label style={labelStyle}>Meta Title</label>
              <input id="seo-meta-title" type="text" value={seo.metaTitle} style={inputStyle}
                onChange={e => setSeo(s => ({ ...s, metaTitle: e.target.value }))}
                placeholder="e.g. Abaya Wash | Tidy Mimo Premium Cleaning" />
              <small style={{ color: 'rgba(26,10,29,0.5)', fontSize: '0.78rem' }}>Recommended: 50–60 characters</small>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Meta Description</label>
              <textarea id="seo-meta-desc" value={seo.metaDescription} style={textareaStyle}
                onChange={e => setSeo(s => ({ ...s, metaDescription: e.target.value }))}
                placeholder="Brief description of the product for search engines…" />
              <small style={{ color: 'rgba(26,10,29,0.5)', fontSize: '0.78rem' }}>Recommended: 120–160 characters</small>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Keywords</label>
              <input id="seo-keywords" type="text" value={seo.keywords} style={inputStyle}
                onChange={e => setSeo(s => ({ ...s, keywords: e.target.value }))}
                placeholder="e.g. abaya wash, black fabric care, premium detergent" />
            </div>

            <div style={{ borderTop: '1px solid rgba(217,168,232,0.3)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
              <h3 style={{ margin: '0 0 1.2rem', fontSize: '1rem', fontWeight: 700, color: '#6C2A79' }}>Open Graph (Social Sharing)</h3>
              <div style={fieldStyle}>
                <label style={labelStyle}>OG Title</label>
                <input id="seo-og-title" type="text" value={seo.ogTitle} style={inputStyle}
                  onChange={e => setSeo(s => ({ ...s, ogTitle: e.target.value }))}
                  placeholder="Title shown when shared on social media" />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>OG Description</label>
                <textarea id="seo-og-desc" value={seo.ogDescription} style={textareaStyle}
                  onChange={e => setSeo(s => ({ ...s, ogDescription: e.target.value }))}
                  placeholder="Description shown when shared on social media" />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>OG Image URL</label>
                <input id="seo-og-image" type="text" value={seo.ogImage} style={inputStyle}
                  onChange={e => setSeo(s => ({ ...s, ogImage: e.target.value }))}
                  placeholder="https://… (1200×630 recommended)" />
              </div>
            </div>

            <button id="save-seo-btn" type="submit" disabled={saving || !productId}
              style={{ padding: '0.9rem 2rem', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #6C2A79, #D41479)', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem', opacity: (saving || !productId) ? 0.7 : 1, boxShadow: '0 6px 20px rgba(212,20,121,0.3)' }}>
              {saving ? 'Saving SEO…' : '🔍 Save SEO Settings'}
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
