'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CATEGORY_LABELS = {
  household: '🏠 Household',
  industrial: '🏭 Industrial',
  carcare: '🚗 Car Care',
  hotels: '🏨 Hotels & Restaurants',
};

const CATEGORY_COLORS = {
  household: '#6C2A79',
  industrial: '#D41479',
  carcare: '#3B82F6',
  hotels: '#059669',
};

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState(null);
  const [toast, setToast] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadProducts = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/products');
      if (res.status === 401) { router.replace('/admin/login'); return; }
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch { showToast('Failed to load products', 'error'); }
    finally { setLoading(false); }
  }, [router]);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (res.ok) { setProducts(p => p.filter(x => x.id !== id)); showToast(`"${name}" deleted.`); }
      else showToast('Delete failed.', 'error');
    } catch { showToast('Network error.', 'error'); }
    finally { setDeleting(null); }
  };

  const updateSortOrder = async (id, currentOrder, delta) => {
    try {
      const newOrder = currentOrder + delta;
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sortOrder: newOrder })
      });
      if (res.ok) {
        showToast('Order updated.');
        loadProducts(); // reload to show new visual order
      } else {
        showToast('Failed to update order.', 'error');
      }
    } catch {
      showToast('Network error.', 'error');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
  };

  const filtered = products.filter(p => {
    const matchCat = filter === 'all' || p.category === filter;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const stats = {
    total: products.length,
    household: products.filter(p => p.category === 'household').length,
    industrial: products.filter(p => p.category === 'industrial').length,
    carcare: products.filter(p => p.category === 'carcare').length,
    hotels: products.filter(p => p.category === 'hotels').length,
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F9F0FB] font-[Inter]">
      {/* Toast */}
      {toast && (
        <div 
          className="fixed top-6 right-6 z-[9999] px-6 py-3 rounded-xl text-white font-semibold text-sm shadow-xl animate-fadeIn"
          style={{ background: toast.type === 'error' ? '#D41479' : '#059669' }}
        >
          {toast.msg}
        </div>
      )}

      {/* Responsive Sidebar */}
      <aside className="w-full md:w-[240px] md:min-h-screen bg-gradient-to-b from-[#3A0D45] to-[#1A0822] flex flex-col shrink-0 md:sticky top-0 z-40">
        
        {/* Brand & Mobile Hamburger Header */}
        <div className="p-4 md:p-6 md:pb-6 flex items-center justify-between md:justify-start gap-4 border-b border-[#D9A8E8]/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6C2A79] to-[#D41479] flex items-center justify-center font-black text-white text-sm">
              TM
            </div>
            <span className="text-[#FCE8F4] font-bold text-lg">Admin</span>
          </div>
          
          {/* Mobile Toggle Button */}
          <button 
            className="md:hidden text-[#FCE8F4]/80 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Navigation - Collapsible on Mobile */}
        <div className={`
          flex-col md:flex flex-1 overflow-y-auto w-full md:w-auto
          ${mobileMenuOpen ? 'flex' : 'hidden'}
        `}>
          <nav className="flex-1 p-4 md:p-3 flex flex-col gap-1.5">
            {['all', 'household', 'industrial', 'carcare', 'hotels'].map(cat => (
              <button 
                key={cat} 
                onClick={() => { setFilter(cat); setMobileMenuOpen(false); }}
                className={`
                  w-full text-left px-4 py-3 rounded-xl border-none cursor-pointer text-sm font-medium flex items-center justify-between transition-all duration-200
                  ${filter === cat 
                    ? 'bg-[#D41479]/20 text-[#FCE8F4]' 
                    : 'bg-transparent text-[#FCE8F4]/65 hover:bg-white/5'
                  }
                `}
              >
                {cat === 'all' ? '📦 All Products' : CATEGORY_LABELS[cat]}
                <span className="bg-[#D9A8E8]/15 text-[#D9A8E8] rounded-full px-2.5 py-0.5 text-xs font-bold">
                  {cat === 'all' ? stats.total : stats[cat]}
                </span>
              </button>
            ))}
          </nav>

          <div className="p-4 md:p-3 border-t border-[#D9A8E8]/10 flex flex-col gap-2">
            <Link href="/" target="_blank" className="text-[#FCE8F4]/60 no-underline text-sm px-4 py-2.5 rounded-lg font-medium transition-colors hover:bg-white/5 hover:text-[#FCE8F4]">
              🌐 View Site
            </Link>
            <button 
              onClick={handleLogout} 
              className="bg-transparent border-none text-[#FCE8F4]/50 hover:bg-white/5 hover:text-[#FCE8F4] cursor-pointer text-sm text-left px-4 py-2.5 rounded-lg font-medium transition-colors"
            >
              ← Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-5 md:p-8 overflow-y-auto custom-scrollbar">
        
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="m-0 text-2xl md:text-3xl font-bold text-[#1A0A1D] tracking-tight">Product Catalog</h1>
            <p className="m-0 mt-1.5 text-[#1A0A1D]/60 text-sm">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''} shown
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <input
              id="product-search"
              type="search"
              placeholder="Search products…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="px-4 py-3 rounded-xl border-[1.5px] border-[#D9A8E8]/50 bg-white text-sm outline-none w-full sm:w-[240px] text-[#1A0A1D] focus:border-[#D41479] transition-colors"
            />
            <Link 
              href="/admin/products/new" 
              id="add-product-btn" 
              className="px-5 py-3 rounded-xl bg-gradient-to-br from-[#6C2A79] to-[#D41479] text-white no-underline font-bold text-sm shadow-[0_6px_20px_rgba(212,20,121,0.3)] hover:scale-[1.02] transition-transform text-center whitespace-nowrap"
            >
              + Add Product
            </Link>
          </div>
        </div>

        {/* Responsive Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 mb-8">
          {Object.entries(stats).map(([key, val]) => (
            <div key={key} className="bg-white rounded-2xl p-4 md:p-5 border border-[#D9A8E8]/30 shadow-[0_4px_16px_rgba(108,42,121,0.06)] flex flex-col justify-center">
              <div 
                className="text-2xl md:text-[1.6rem] font-black leading-none" 
                style={{ color: key === 'all' ? '#6C2A79' : CATEGORY_COLORS[key] }}
              >
                {val}
              </div>
              <div className="text-[0.65rem] md:text-[0.7rem] text-[#1A0A1D]/60 font-bold uppercase tracking-wider mt-2">
                {key === 'all' ? 'Total' : key}
              </div>
            </div>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center p-12 text-[#1A0A1D]/50 text-base font-medium">
            <div className="w-8 h-8 border-4 border-[#D41479]/20 border-t-[#D41479] rounded-full animate-spin mx-auto mb-4"></div>
            Loading catalog data…
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-2xl border border-[#D9A8E8]/30 text-[#1A0A1D]/50 text-base font-medium">
            No products found matching your criteria. <br/>
            <Link href="/admin/products/new" className="text-[#D41479] hover:underline font-bold mt-2 inline-block">
              Add a new product →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {filtered.map(product => (
              <div key={product.id} className="bg-white rounded-[20px] border border-[#D9A8E8]/30 shadow-[0_4px_20px_rgba(108,42,121,0.06)] overflow-hidden flex flex-col group hover:shadow-[0_8px_30px_rgba(108,42,121,0.12)] transition-shadow duration-300">
                
                {/* Image Section & Sort Order Overlay */}
                <div className="h-[180px] bg-gradient-to-br from-[#FCE8F4] to-[#EDD5F5] flex items-center justify-center overflow-hidden relative border-b border-[#D9A8E8]/20">
                  
                  {/* Quick Reorder Widget */}
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-md px-1.5 py-1 rounded-xl border border-[#D9A8E8]/30 shadow-sm z-10 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => updateSortOrder(product.id, product.sortOrder, -1)} className="text-[#6C2A79] hover:bg-[#D9A8E8]/30 p-1 rounded-lg border-none bg-transparent cursor-pointer transition-colors" title="Move Left/Up">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <span className="text-[10px] font-black w-3 text-center text-[#1A0A1D]" title="Sort Order">{product.sortOrder}</span>
                    <button onClick={() => updateSortOrder(product.id, product.sortOrder, 1)} className="text-[#6C2A79] hover:bg-[#D9A8E8]/30 p-1 rounded-lg border-none bg-transparent cursor-pointer transition-colors" title="Move Right/Down">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                  </div>

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="h-[140px] w-auto max-w-[80%] object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                    onError={e => { e.target.style.display = 'none'; }} 
                  />
                </div>
                
                {/* Details Section */}
                <div className="p-5 flex-1 flex flex-col">
                  <span 
                    className="inline-block px-3 py-1 rounded-full text-[0.65rem] font-black tracking-wider mb-3 w-fit"
                    style={{ background: CATEGORY_COLORS[product.category] + '15', color: CATEGORY_COLORS[product.category] }}
                  >
                    {CATEGORY_LABELS[product.category] || product.category}
                  </span>
                  
                  <h3 className="m-0 mb-2 text-lg font-bold text-[#1A0A1D] leading-tight">
                    {product.name}
                  </h3>
                  
                  <p className="m-0 mb-4 text-sm text-[#1A0A1D]/60 leading-relaxed flex-1">
                    {product.description?.substring(0, 75)}…
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(product.features || []).slice(0, 3).map((f, i) => (
                      <span key={i} className="bg-[#D9A8E8]/15 text-[#6C2A79] px-2.5 py-1 rounded-full text-[0.65rem] font-bold">
                        {f}
                      </span>
                    ))}
                  </div>

                  {product.seo && (
                    <div className="text-[0.7rem] text-[#059669] font-bold bg-[#059669]/10 rounded-md px-2 py-1 inline-flex items-center gap-1 w-fit">
                      ✓ SEO configured
                    </div>
                  )}
                </div>
                
                {/* Card Actions */}
                <div className="flex gap-2 p-4 pt-0">
                  <Link 
                    href={`/admin/products/${product.id}/edit`} 
                    id={`edit-${product.id}`}
                    className="flex-1 text-center py-2.5 rounded-xl bg-[#6C2A79]/10 text-[#6C2A79] no-underline text-[0.85rem] font-bold hover:bg-[#6C2A79] hover:text-white transition-colors"
                  >
                    ✏️ Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(product.id, product.name)}
                    disabled={deleting === product.id} 
                    id={`delete-${product.id}`}
                    className="flex-1 py-2.5 rounded-xl bg-[#D41479]/10 text-[#D41479] border-none cursor-pointer text-[0.85rem] font-bold hover:bg-[#D41479] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deleting === product.id ? '…' : '🗑️ Delete'}
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
