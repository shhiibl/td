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
    <div style={styles.page}>
      {/* Toast */}
      {toast && (
        <div style={{ ...styles.toast, background: toast.type === 'error' ? '#D41479' : '#059669' }}>
          {toast.msg}
        </div>
      )}

      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarBrand}>
          <div style={styles.brandLogo}>TM</div>
          <span style={styles.brandName}>Admin</span>
        </div>
        <nav style={styles.nav}>
          {['all', 'household', 'industrial', 'carcare', 'hotels'].map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              style={{ ...styles.navItem, ...(filter === cat ? styles.navItemActive : {}) }}>
              {cat === 'all' ? '📦 All Products' : CATEGORY_LABELS[cat]}
              <span style={styles.navBadge}>
                {cat === 'all' ? stats.total : stats[cat]}
              </span>
            </button>
          ))}
        </nav>
        <div style={styles.sidebarFooter}>
          <Link href="/" target="_blank" style={styles.sidebarLink}>🌐 View Site</Link>
          <button onClick={handleLogout} style={styles.logoutBtn}>← Logout</button>
        </div>
      </aside>

      {/* Main */}
      <main style={styles.main}>
        {/* Top Bar */}
        <div style={styles.topBar}>
          <div>
            <h1 style={styles.pageTitle}>Product Catalog</h1>
            <p style={styles.pageSubtitle}>{filtered.length} product{filtered.length !== 1 ? 's' : ''} shown</p>
          </div>
          <div style={styles.topActions}>
            <input
              id="product-search"
              type="search"
              placeholder="Search products…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={styles.searchInput}
            />
            <Link href="/admin/products/new" id="add-product-btn" style={styles.addBtn}>
              + Add Product
            </Link>
          </div>
        </div>

        {/* Stats Row */}
        <div style={styles.statsRow}>
          {Object.entries(stats).map(([key, val]) => (
            <div key={key} style={styles.statCard}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: key === 'all' ? '#6C2A79' : CATEGORY_COLORS[key] }}>{val}</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(26,10,29,0.6)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '4px' }}>
                {key === 'all' ? 'Total' : key}
              </div>
            </div>
          ))}
        </div>

        {/* Products Table/Grid */}
        {loading ? (
          <div style={styles.emptyState}>Loading products…</div>
        ) : filtered.length === 0 ? (
          <div style={styles.emptyState}>No products found. <Link href="/admin/products/new" style={{ color: '#D41479' }}>Add one →</Link></div>
        ) : (
          <div style={styles.productGrid}>
            {filtered.map(product => (
              <div key={product.id} style={styles.productCard}>
                <div style={styles.productImageWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.imageUrl} alt={product.name} style={styles.productImage}
                    onError={e => { e.target.style.display = 'none'; }} />
                </div>
                <div style={styles.productInfo}>
                  <span style={{ ...styles.categoryBadge, background: CATEGORY_COLORS[product.category] + '20', color: CATEGORY_COLORS[product.category] }}>
                    {CATEGORY_LABELS[product.category] || product.category}
                  </span>
                  <h3 style={styles.productName}>{product.name}</h3>
                  <p style={styles.productDesc}>{product.description?.substring(0, 80)}…</p>
                  <div style={styles.featureTags}>
                    {(product.features || []).slice(0, 3).map((f, i) => (
                      <span key={i} style={styles.featureTag}>{f}</span>
                    ))}
                  </div>
                  {product.seo && (
                    <div style={styles.seoBadge}>✓ SEO configured</div>
                  )}
                </div>
                <div style={styles.productActions}>
                  <Link href={`/admin/products/${product.id}/edit`} style={styles.editBtn} id={`edit-${product.id}`}>
                    ✏️ Edit
                  </Link>
                  <button onClick={() => handleDelete(product.id, product.name)}
                    disabled={deleting === product.id} id={`delete-${product.id}`}
                    style={{ ...styles.deleteBtn, opacity: deleting === product.id ? 0.5 : 1 }}>
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

const styles = {
  page: { display: 'flex', minHeight: '100vh', background: '#F9F0FB' },
  toast: {
    position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999,
    padding: '0.85rem 1.5rem', borderRadius: '12px', color: '#fff',
    fontWeight: 600, fontSize: '0.95rem', boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    animation: 'fadeIn 0.3s ease',
  },
  sidebar: {
    width: '240px', minHeight: '100vh', background: 'linear-gradient(180deg, #3A0D45 0%, #1A0822 100%)',
    display: 'flex', flexDirection: 'column', flexShrink: 0,
    position: 'sticky', top: 0, height: '100vh',
  },
  sidebarBrand: {
    padding: '2rem 1.5rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem',
    borderBottom: '1px solid rgba(217,168,232,0.1)',
  },
  brandLogo: {
    width: '40px', height: '40px', borderRadius: '12px',
    background: 'linear-gradient(135deg, #6C2A79, #D41479)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 800, color: '#fff', fontSize: '0.9rem',
  },
  brandName: { color: '#FCE8F4', fontWeight: 700, fontSize: '1.1rem' },
  nav: { flex: 1, padding: '1.5rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' },
  navItem: {
    width: '100%', textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '10px',
    border: 'none', background: 'transparent', color: 'rgba(252,232,244,0.65)',
    cursor: 'pointer', fontSize: '0.88rem', fontWeight: 500, display: 'flex',
    alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.2s',
  },
  navItemActive: { background: 'rgba(212,20,121,0.2)', color: '#FCE8F4' },
  navBadge: {
    background: 'rgba(217,168,232,0.15)', color: '#D9A8E8', borderRadius: '100px',
    padding: '2px 8px', fontSize: '0.75rem', fontWeight: 700,
  },
  sidebarFooter: {
    padding: '1rem 0.75rem 1.5rem', borderTop: '1px solid rgba(217,168,232,0.1)',
    display: 'flex', flexDirection: 'column', gap: '0.5rem',
  },
  sidebarLink: {
    color: 'rgba(252,232,244,0.6)', textDecoration: 'none', fontSize: '0.85rem',
    padding: '0.6rem 1rem', borderRadius: '8px', fontWeight: 500, transition: 'color 0.2s',
  },
  logoutBtn: {
    background: 'transparent', border: 'none', color: 'rgba(252,232,244,0.5)',
    cursor: 'pointer', fontSize: '0.85rem', textAlign: 'left', padding: '0.6rem 1rem',
    borderRadius: '8px', fontWeight: 500,
  },
  main: { flex: 1, padding: '2rem', overflowY: 'auto' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' },
  pageTitle: { margin: 0, fontSize: '1.8rem', fontWeight: 700, color: '#1A0A1D' },
  pageSubtitle: { margin: '4px 0 0', color: 'rgba(26,10,29,0.55)', fontSize: '0.9rem' },
  topActions: { display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' },
  searchInput: {
    padding: '0.7rem 1rem', borderRadius: '12px', border: '1.5px solid rgba(217,168,232,0.5)',
    background: '#fff', fontSize: '0.9rem', outline: 'none', width: '220px', color: '#1A0A1D',
  },
  addBtn: {
    padding: '0.75rem 1.4rem', borderRadius: '12px',
    background: 'linear-gradient(135deg, #6C2A79, #D41479)', color: '#fff',
    textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem',
    boxShadow: '0 6px 20px rgba(212,20,121,0.3)',
  },
  statsRow: { display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' },
  statCard: {
    background: '#fff', borderRadius: '16px', padding: '1.2rem 1.5rem',
    border: '1px solid rgba(217,168,232,0.3)', boxShadow: '0 4px 16px rgba(108,42,121,0.06)',
    minWidth: '100px',
  },
  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.2rem' },
  productCard: {
    background: '#fff', borderRadius: '20px', border: '1px solid rgba(217,168,232,0.3)',
    boxShadow: '0 4px 20px rgba(108,42,121,0.06)', overflow: 'hidden',
    transition: 'box-shadow 0.2s', display: 'flex', flexDirection: 'column',
  },
  productImageWrap: {
    height: '160px', background: 'linear-gradient(135deg, #FCE8F4, #EDD5F5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
  },
  productImage: { height: '130px', width: '130px', objectFit: 'contain' },
  productInfo: { padding: '1.2rem', flex: 1 },
  categoryBadge: {
    display: 'inline-block', padding: '3px 10px', borderRadius: '100px',
    fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.04em', marginBottom: '0.6rem',
  },
  productName: { margin: '0 0 0.4rem', fontSize: '1.05rem', fontWeight: 700, color: '#1A0A1D' },
  productDesc: { margin: '0 0 0.8rem', fontSize: '0.82rem', color: 'rgba(26,10,29,0.6)', lineHeight: 1.5 },
  featureTags: { display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.6rem' },
  featureTag: {
    background: 'rgba(217,168,232,0.2)', color: '#6C2A79', padding: '2px 8px',
    borderRadius: '100px', fontSize: '0.72rem', fontWeight: 600,
  },
  seoBadge: {
    fontSize: '0.75rem', color: '#059669', fontWeight: 600,
    background: 'rgba(5,150,105,0.1)', borderRadius: '6px', padding: '3px 8px', display: 'inline-block',
  },
  productActions: { display: 'flex', gap: '0.5rem', padding: '0 1.2rem 1.2rem' },
  editBtn: {
    flex: 1, textAlign: 'center', padding: '0.6rem', borderRadius: '10px',
    background: 'rgba(108,42,121,0.1)', color: '#6C2A79', textDecoration: 'none',
    fontSize: '0.85rem', fontWeight: 600,
  },
  deleteBtn: {
    flex: 1, padding: '0.6rem', borderRadius: '10px',
    background: 'rgba(212,20,121,0.08)', color: '#D41479', border: 'none',
    cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
  },
  emptyState: { textAlign: 'center', padding: '4rem', color: 'rgba(26,10,29,0.5)', fontSize: '1rem' },
};
