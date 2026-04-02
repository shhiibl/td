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

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F9F0FB] font-[Inter]">
      {/* Responsive Sidebar (Top Nav on Mobile) */}
      <aside className="w-full md:w-[220px] bg-gradient-to-b from-[#3A0D45] to-[#1A0822] p-4 md:p-6 md:py-8 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-4 flex-shrink-0 md:sticky top-0 md:h-screen">
        <Link 
          href="/admin" 
          className="text-[#FCE8F4]/70 no-underline text-sm px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors hidden md:block w-full text-center"
        >
          ← Back to Dashboard
        </Link>
        
        {/* Mobile-only back button (icon only to save space) */}
        <Link href="/admin" className="md:hidden text-[#FCE8F4]/70 p-2 bg-white/5 hover:bg-white/10 rounded-lg">
          ← Back
        </Link>

        <div className="text-[#FCE8F4] font-bold text-base md:text-lg flex-1 md:w-full text-right md:text-left">
          {isEdit ? '✏️ Edit Product' : '➕ New Product'}
        </div>
      </aside>

      {/* Main Form Area */}
      <main className="flex-1 p-5 md:p-8 w-full max-w-[1000px] mx-auto overflow-y-auto">
        
        <h1 className="m-0 text-2xl md:text-3xl font-bold text-[#1A0A1D] mb-1.5 leading-tight">
          {isEdit ? `Edit: ${initialProduct?.name || ''}` : 'Add New Product'}
        </h1>
        <p className="m-0 text-[#1A0A1D]/60 text-sm md:text-base mb-8">
          {isEdit ? 'Update product details and SEO settings.' : 'Fill in the details for the new product.'}
        </p>

        {/* Tab Navigation */}
        <div className="flex bg-[#D9A8E8]/15 rounded-xl p-1 mb-8 w-fit overflow-x-auto max-w-full">
          {TABS.map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`
                px-6 py-2.5 rounded-lg border-none cursor-pointer text-sm font-bold transition-all duration-300 whitespace-nowrap
                ${activeTab === tab 
                  ? 'bg-gradient-to-br from-[#6C2A79] to-[#D41479] text-white shadow-[0_4px_12px_rgba(212,20,121,0.25)]' 
                  : 'bg-transparent text-[#6C2A79] hover:bg-[#6C2A79]/10'
                }
              `}
            >
              {tab === 'SEO' ? '🔍 SEO Settings' : '📦 Product Info'}
            </button>
          ))}
        </div>

        {/* Alerts */}
        {error && (
          <div className="bg-[#D41479]/10 border border-[#D41479]/30 rounded-xl px-5 py-3.5 text-[#D41479] mb-6 font-medium text-sm animate-fadeIn">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-[#059669]/10 border border-[#059669]/30 rounded-xl px-5 py-3.5 text-[#059669] mb-6 font-medium text-sm animate-fadeIn flex items-center gap-2">
            ✓ {success}
          </div>
        )}

        {/* --- Product Tab Content --- */}
        {activeTab === 'Product' && (
          <form 
            onSubmit={saveProduct} 
            className="bg-white rounded-2xl md:rounded-[24px] p-5 md:p-8 shadow-[0_4px_20px_rgba(108,42,121,0.06)] border border-[#D9A8E8]/30 animate-fadeIn"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-[0.85rem] font-bold text-[#6C2A79]">Product Name *</label>
                <input 
                  id="product-name" type="text" required value={product.name} 
                  className="w-full px-4 py-3 rounded-xl border-[1.5px] border-[#D9A8E8]/50 text-[0.95rem] outline-none text-[#1A0A1D] focus:border-[#D41479] transition-colors"
                  onChange={e => setProduct(p => ({ ...p, name: e.target.value }))} 
                  placeholder="e.g. Abaya Wash" 
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-[0.85rem] font-bold text-[#6C2A79]">Category *</label>
                <select 
                  id="product-category" value={product.category} 
                  className="w-full px-4 py-3 rounded-xl border-[1.5px] border-[#D9A8E8]/50 text-[0.95rem] outline-none text-[#1A0A1D] bg-white cursor-pointer focus:border-[#D41479] transition-colors appearance-none"
                  onChange={e => setProduct(p => ({ ...p, category: e.target.value }))}
                >
                  {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-4 md:mb-6">
              <label className="text-[0.85rem] font-bold text-[#6C2A79]">Description *</label>
              <textarea 
                id="product-desc" required value={product.description} 
                className="w-full px-4 py-3 rounded-xl border-[1.5px] border-[#D9A8E8]/50 text-[0.95rem] outline-none text-[#1A0A1D] focus:border-[#D41479] transition-colors min-h-[120px] resize-y"
                onChange={e => setProduct(p => ({ ...p, description: e.target.value }))}
                placeholder="Product description…" 
              />
            </div>

            <div className="flex flex-col gap-2 mb-4 md:mb-6">
              <label className="text-[0.85rem] font-bold text-[#6C2A79]">Image URL *</label>
              <input 
                id="product-image" type="text" required value={product.imageUrl} 
                className="w-full px-4 py-3 rounded-xl border-[1.5px] border-[#D9A8E8]/50 text-[0.95rem] outline-none text-[#1A0A1D] focus:border-[#D41479] transition-colors"
                onChange={e => setProduct(p => ({ ...p, imageUrl: e.target.value }))}
                placeholder="/products/product-name.png" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-[0.85rem] font-bold text-[#6C2A79]">Slug (URL Segment)</label>
                <input 
                  id="product-slug" type="text" value={product.slug} 
                  className="w-full px-4 py-3 rounded-xl border-[1.5px] border-[#D9A8E8]/50 text-[0.95rem] outline-none text-[#1A0A1D] focus:border-[#D41479] transition-colors"
                  onChange={e => setProduct(p => ({ ...p, slug: e.target.value }))}
                  placeholder="e.g. abaya-wash" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.85rem] font-bold text-[#6C2A79]">Sort Order</label>
                <input 
                  id="product-sort" type="number" value={product.sortOrder} 
                  className="w-full px-4 py-3 rounded-xl border-[1.5px] border-[#D9A8E8]/50 text-[0.95rem] outline-none text-[#1A0A1D] focus:border-[#D41479] transition-colors"
                  onChange={e => setProduct(p => ({ ...p, sortOrder: e.target.value }))} 
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-6 md:mb-8">
              <label className="text-[0.85rem] font-bold text-[#6C2A79]">Features (comma-separated)</label>
              <input 
                id="product-features" type="text" value={product.features} 
                className="w-full px-4 py-3 rounded-xl border-[1.5px] border-[#D9A8E8]/50 text-[0.95rem] outline-none text-[#1A0A1D] focus:border-[#D41479] transition-colors"
                onChange={e => setProduct(p => ({ ...p, features: e.target.value }))}
                placeholder="e.g. Premium Care, Gentle Formula, 500ml" 
              />
            </div>

            <div className="flex items-center gap-3 mb-8">
              <input 
                id="product-instock" type="checkbox" checked={product.inStock}
                onChange={e => setProduct(p => ({ ...p, inStock: e.target.checked }))}
                className="w-5 h-5 cursor-pointer accent-[#D41479] rounded filter drop-shadow-sm" 
              />
              <label htmlFor="product-instock" className="text-[0.95rem] font-bold text-[#1A0A1D] cursor-pointer">
                Product is In-Stock
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button 
                id="save-product-btn" type="submit" disabled={saving}
                className={`
                  w-full sm:w-auto px-8 py-3.5 rounded-xl border-none font-bold text-white text-base transition-all duration-300
                  bg-gradient-to-br from-[#6C2A79] to-[#D41479] shadow-[0_6px_20px_rgba(212,20,121,0.25)] hover:scale-[1.02]
                  ${saving ? 'opacity-70 cursor-not-allowed transform-none' : 'cursor-pointer'}
                `}
              >
                {saving ? 'Saving…' : isEdit ? '💾 Save Changes' : '➕ Create Product'}
              </button>
              
              <Link 
                href="/admin" 
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#6C2A79]/10 text-[#6C2A79] no-underline font-bold text-base text-center hover:bg-[#6C2A79]/20 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        )}

        {/* --- SEO Tab Content --- */}
        {activeTab === 'SEO' && (
          <form 
            onSubmit={saveSeo} 
            className="bg-white rounded-2xl md:rounded-[24px] p-5 md:p-8 shadow-[0_4px_20px_rgba(108,42,121,0.06)] border border-[#D9A8E8]/30 animate-fadeIn"
          >
            {!productId && (
              <div className="bg-[#D41479]/10 rounded-xl p-4 mb-6 text-[#D41479] font-medium text-[0.9rem] flex items-center gap-2">
                ⚠️ Save the product first before configuring SEO.
              </div>
            )}

            <div className="flex flex-col gap-2 mb-5">
              <label className="text-[0.85rem] font-bold text-[#6C2A79]">Meta Title</label>
              <input 
                id="seo-meta-title" type="text" value={seo.metaTitle} 
                className="w-full px-4 py-3 rounded-xl border-[1.5px] border-[#D9A8E8]/50 text-[0.95rem] outline-none text-[#1A0A1D] focus:border-[#D41479] transition-colors"
                onChange={e => setSeo(s => ({ ...s, metaTitle: e.target.value }))}
                placeholder="e.g. Abaya Wash | Tidy Mimo Premium Cleaning" 
              />
              <span className="text-xs text-[#1A0A1D]/50 font-medium">Recommended: 50–60 characters</span>
            </div>

            <div className="flex flex-col gap-2 mb-5">
              <label className="text-[0.85rem] font-bold text-[#6C2A79]">Meta Description</label>
              <textarea 
                id="seo-meta-desc" value={seo.metaDescription} 
                className="w-full px-4 py-3 rounded-xl border-[1.5px] border-[#D9A8E8]/50 text-[0.95rem] outline-none text-[#1A0A1D] focus:border-[#D41479] transition-colors min-h-[100px] resize-y"
                onChange={e => setSeo(s => ({ ...s, metaDescription: e.target.value }))}
                placeholder="Brief description of the product for search engines…" 
              />
              <span className="text-xs text-[#1A0A1D]/50 font-medium">Recommended: 120–160 characters</span>
            </div>

            <div className="flex flex-col gap-2 mb-8">
              <label className="text-[0.85rem] font-bold text-[#6C2A79]">Keywords</label>
              <input 
                id="seo-keywords" type="text" value={seo.keywords} 
                className="w-full px-4 py-3 rounded-xl border-[1.5px] border-[#D9A8E8]/50 text-[0.95rem] outline-none text-[#1A0A1D] focus:border-[#D41479] transition-colors"
                onChange={e => setSeo(s => ({ ...s, keywords: e.target.value }))}
                placeholder="e.g. abaya wash, black fabric care, premium detergent" 
              />
            </div>

            <div className="border-t border-[#D9A8E8]/30 pt-8 mt-4">
              <h3 className="m-0 mb-5 text-[1.1rem] font-bold text-[#6C2A79]">Open Graph (Social Sharing)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-5 block md:hidden lg:grid">
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.85rem] font-bold text-[#6C2A79]">OG Title</label>
                    <input 
                      id="seo-og-title" type="text" value={seo.ogTitle} 
                      className="w-full px-4 py-3 rounded-xl border-[1.5px] border-[#D9A8E8]/50 text-[0.95rem] outline-none text-[#1A0A1D] focus:border-[#D41479] transition-colors"
                      onChange={e => setSeo(s => ({ ...s, ogTitle: e.target.value }))}
                      placeholder="Title shown when shared on social media" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.85rem] font-bold text-[#6C2A79]">OG Image URL</label>
                    <input 
                      id="seo-og-image" type="text" value={seo.ogImage} 
                      className="w-full px-4 py-3 rounded-xl border-[1.5px] border-[#D9A8E8]/50 text-[0.95rem] outline-none text-[#1A0A1D] focus:border-[#D41479] transition-colors"
                      onChange={e => setSeo(s => ({ ...s, ogImage: e.target.value }))}
                      placeholder="https://… (1200×630 recommended)" 
                    />
                  </div>
              </div>

              <div className="flex flex-col gap-2 mb-8">
                <label className="text-[0.85rem] font-bold text-[#6C2A79]">OG Description</label>
                <textarea 
                  id="seo-og-desc" value={seo.ogDescription} 
                  className="w-full px-4 py-3 rounded-xl border-[1.5px] border-[#D9A8E8]/50 text-[0.95rem] outline-none text-[#1A0A1D] focus:border-[#D41479] transition-colors min-h-[100px] resize-y"
                  onChange={e => setSeo(s => ({ ...s, ogDescription: e.target.value }))}
                  placeholder="Description shown when shared on social media" 
                />
              </div>
            </div>

            <button 
              id="save-seo-btn" type="submit" disabled={saving || !productId}
              className={`
                w-full sm:w-auto px-8 py-3.5 rounded-xl border-none font-bold text-white text-base transition-all duration-300
                bg-gradient-to-br from-[#6C2A79] to-[#D41479] shadow-[0_6px_20px_rgba(212,20,121,0.25)] hover:scale-[1.02]
                ${(saving || !productId) ? 'opacity-70 cursor-not-allowed transform-none' : 'cursor-pointer'}
              `}
            >
              {saving ? 'Saving SEO…' : '🔍 Save SEO Settings'}
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
