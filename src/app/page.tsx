"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

// ─── Product Data ────────────────────────────────────────────────
const productsData = [
  { id: 1,  name: "Premium Matte Black Case",      description: "Casing hitam matte premium dengan bahan anti-fingerprint dan pelindung kamera ekstra tebal.",          category: "Android", price: 59000,  priceText: "Rp 59.000",  image: "/casing-1.jpg",  badge: "New",        support: "Android Series" },
  { id: 2,  name: "Velante Sport Magsafe Blue",     description: "Mendukung Magsafe, desain sporty transparan dengan bumper biru laut yang meredam benturan.",            category: "iPhone",  price: 89000,  priceText: "Rp 89.000",  image: "/casing-2.jpg",  badge: "Premium",    support: "iPhone Series"  },
  { id: 3,  name: "Deep Ocean Apple Silicon Case",  description: "Silikon lembut khas Apple berwarna deep ocean yang nyaman digenggam dan bagian dalam beludru.",         category: "iPhone",  price: 79000,  priceText: "Rp 79.000",  image: "/casing-3.jpg",  badge: "Popular",    support: "iPhone Series"  },
  { id: 4,  name: "Frosted Smoke Magnetic Case",    description: "Desain frosted smoke transparan yang elegan dengan ring magnetik kuat untuk aksesoris Magsafe.",         category: "iPhone",  price: 85000,  priceText: "Rp 85.000",  image: "/casing-4.jpg",  badge: "Best Seller",support: "iPhone Series"  },
  { id: 5,  name: "Wekome Teal Green Magsafe",      description: "Wekome premium casing dengan warna teal green yang modis dan perlindungan drop-test standar militer.",   category: "iPhone",  price: 95000,  priceText: "Rp 95.000",  image: "/casing-5.jpg",  badge: "Magsafe",    support: "iPhone Series"  },
  { id: 6,  name: "Genuine Leather Navy Shadow",    description: "Kulit sintetis premium warna navy shadow memberikan kesan mewah, formal, dan eksklusif.",                category: "iPhone",  price: 149000, priceText: "Rp 149.000", image: "/casing-6.jpg",  badge: "Luxury",     support: "iPhone Series"  },
  { id: 7,  name: "Aesthetic Jellyfish Clear Case", description: "Clear case estetik dengan ilustrasi ubur-ubur laut dalam yang glow dan memberikan kesan tenang.",        category: "iPhone",  price: 69000,  priceText: "Rp 69.000",  image: "/casing-7.jpg",  badge: "Aesthetic",  support: "iPhone Series"  },
  { id: 8,  name: "Pink Hibiscus Beach Vibe Case",  description: "Desain bertema pantai tropis dengan motif bunga Hibiscus pink yang ceria dan stylish.",                  category: "iPhone",  price: 69000,  priceText: "Rp 69.000",  image: "/casing-8.jpg",  badge: "Cute",       support: "iPhone Series"  },
  { id: 9,  name: "Sea Shell Pencil Sketch Case",   description: "Sketsa pensil estetik bertema kulit kerang laut, sangat cocok untuk pencinta seni minimalis.",           category: "iPhone",  price: 65000,  priceText: "Rp 65.000",  image: "/casing-9.jpg",  badge: "Unique",     support: "iPhone Series"  },
  { id: 10, name: "Terracotta Premium Matte Case",  description: "Bahan silikon warna terracotta bumi yang hangat, matte finish, dan sangat presisi di HP Android.",       category: "Android", price: 75000,  priceText: "Rp 75.000",  image: "/casing-10.jpg", badge: "Premium",    support: "Android Series" },
  { id: 11, name: "Pastel Blue Silicon Premium",    description: "Silikon premium warna biru pastel lembut, lentur, dan mudah dibersihkan dari noda coretan.",             category: "iPhone",  price: 79000,  priceText: "Rp 79.000",  image: "/casing-11.jpg", badge: "Minimalist", support: "iPhone Series"  },
  { id: 12, name: "Matcha Green Silicon Premium",   description: "Warna matcha green pastel yang menyehatkan mata, bahan anti-slip dan nyaman untuk gaming.",              category: "iPhone",  price: 79000,  priceText: "Rp 79.000",  image: "/casing-12.jpg", badge: "Trendy",     support: "iPhone Series"  },
  { id: 13, name: "Sakura Pink Silicon Premium",    description: "Warna pink sakura yang anggun dengan tekstur lembut, ramah lingkungan, dan tahan lama.",                 category: "iPhone",  price: 79000,  priceText: "Rp 79.000",  image: "/casing-13.jpg", badge: "Soft",       support: "iPhone Series"  },
];

const PAYMENT_OPTIONS = [
  "Transfer Bank BCA/Mandiri",
  "GoPay",
  "OVO",
  "Dana",
  "COD (Bayar di Tempat)",
];

// ─── Types ───────────────────────────────────────────────────────
type AuthPage   = 'login' | 'register';
type ActivePage = 'beranda' | 'produk' | 'profil';
type User = { name: string; username: string; password: string; address: string; paymentMethod: string; };

// ─── SVG Icons ───────────────────────────────────────────────────
const IconCart    = ({ cls }: { cls?: string }) => <svg className={cls ?? "w-6 h-6"} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const IconUser    = ({ cls }: { cls?: string }) => <svg className={cls ?? "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const IconClose   = ({ cls }: { cls?: string }) => <svg className={cls ?? "w-6 h-6"} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const IconPin     = ({ cls }: { cls?: string }) => <svg className={cls ?? "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconCard    = ({ cls }: { cls?: string }) => <svg className={cls ?? "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const IconWarn    = ({ cls }: { cls?: string }) => <svg className={cls ?? "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const IconTrash   = ({ cls }: { cls?: string }) => <svg className={cls ?? "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const IconPlus    = ({ cls }: { cls?: string }) => <svg className={cls ?? "w-6 h-6"} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const IconShield  = ({ cls }: { cls?: string }) => <svg className={cls ?? "w-7 h-7"} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const IconLeaf    = ({ cls }: { cls?: string }) => <svg className={cls ?? "w-7 h-7"} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
const IconStar    = ({ cls }: { cls?: string }) => <svg className={cls ?? "w-7 h-7"} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>;

// ─── Shared Header (used in dashboard, produk, profil) ───────────
function AppHeader({
  activePage, setActivePage, totalCartItems, onOpenCart,
}: {
  activePage: ActivePage;
  setActivePage: (p: ActivePage) => void;
  totalCartItems: number;
  onOpenCart: () => void;
}) {
  return (
    <header className="fixed w-full top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => setActivePage('beranda')}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xl group-hover:bg-indigo-700 transition-colors">
            C
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900">CaseCraft.</span>
        </button>

        {/* Center Nav */}
        <nav className="hidden md:flex gap-1 bg-gray-100 p-1 rounded-full">
          {(['beranda', 'produk'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setActivePage(p)}
              className={`px-5 py-1.5 rounded-full text-sm font-bold capitalize transition-all ${
                activePage === p
                  ? 'bg-white text-indigo-600 shadow'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {p === 'beranda' ? 'Beranda' : 'Produk'}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActivePage('profil')}
            className={`hidden sm:flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-xl transition-colors ${
              activePage === 'profil'
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100'
            }`}
          >
            <IconUser />
            <span>Profil Saya</span>
          </button>

          <button
            onClick={onOpenCart}
            className="relative p-2 text-gray-700 hover:text-indigo-600 transition-colors flex items-center justify-center rounded-xl hover:bg-gray-100"
            title="Keranjang Belanja"
          >
            <IconCart />
            {totalCartItems > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold flex items-center justify-center text-white bg-red-500 rounded-full">
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Main Component ───────────────────────────────────────────────
export default function Home() {
  // Auth state (determines whether we show login/register or the app shell)
  const [authPage, setAuthPage] = useState<AuthPage>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Registered user persisted in localStorage
  const [user, setUser] = useState<User>({
    name: '', username: '', password: '', address: '', paymentMethod: '',
  });

  // Login / Register form buffers
  const [loginForm, setLoginForm]     = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', username: '', password: '' });

  // Profile form buffer
  const [profileForm, setProfileForm] = useState({ address: '', paymentMethod: '' });

  // App navigation (only relevant when isLoggedIn === true)
  const [activePage, setActivePage] = useState<ActivePage>('beranda');

  // Catalog
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Cart
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Checkout modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutAddress, setCheckoutAddress] = useState('');
  const [checkoutPayment, setCheckoutPayment] = useState('');
  const [checkoutError, setCheckoutError] = useState('');

  // ── Bootstrap from localStorage ──────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem('user_account');
    if (raw) {
      const parsed: User = JSON.parse(raw);
      setUser(parsed);
      setProfileForm({ address: parsed.address, paymentMethod: parsed.paymentMethod });
    }
  }, []);

  // ── Helpers ──────────────────────────────────────────────────
  const saveUser = (updated: User) => {
    setUser(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_account', JSON.stringify(updated));
    }
  };

  // ── Auth Handlers ─────────────────────────────────────────────
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.username || !registerForm.password) {
      alert('Harap isi semua kolom!');
      return;
    }
    const newUser: User = { ...registerForm, address: '', paymentMethod: '' };
    saveUser(newUser);
    setProfileForm({ address: '', paymentMethod: '' });
    alert('Registrasi Berhasil! Silakan login.');
    setAuthPage('login');
    setLoginForm({ username: '', password: '' });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    let savedUser = user;
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('user_account');
      if (raw) {
        savedUser = JSON.parse(raw);
        setUser(savedUser);
        setProfileForm({ address: savedUser.address, paymentMethod: savedUser.paymentMethod });
      }
    }
    if (!savedUser.username) {
      alert('Belum ada akun terdaftar. Silakan daftar terlebih dahulu!');
      return;
    }
    if (loginForm.username === savedUser.username && loginForm.password === savedUser.password) {
      setIsLoggedIn(true);
      setActivePage('beranda');
    } else {
      alert('Username atau Password salah!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthPage('login');
    setLoginForm({ username: '', password: '' });
    setCart([]);
    setActivePage('beranda');
  };

  // ── Profile Handler ──────────────────────────────────────────
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: User = { ...user, address: profileForm.address, paymentMethod: profileForm.paymentMethod };
    saveUser(updated);
    alert('Profil berhasil diperbarui!');
  };

  // ── Cart Handlers ─────────────────────────────────────────────
  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCart((prev) => prev.filter((i) => i.id !== id));

  const totalCartItems = cart.reduce((s, i) => s + i.quantity, 0);
  const totalCartPrice = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  // ── Checkout Handler ──────────────────────────────────────────
  const openCheckout = () => {
    setCheckoutAddress(user.address);
    setCheckoutPayment(user.paymentMethod || '');
    setCheckoutError('');
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleConfirmCheckout = () => {
    if (!checkoutAddress.trim()) {
      setCheckoutError('Alamat pengiriman tidak boleh kosong!');
      return;
    }
    if (!checkoutPayment) {
      setCheckoutError('Silakan pilih metode pembayaran!');
      return;
    }
    setCheckoutError('');
    alert('Pesanan Casing HP Anda berhasil diproses! Terima kasih sudah berbelanja.');
    setCart([]);
    setIsCheckoutOpen(false);
  };

  // ── Filtered products ─────────────────────────────────────────
  const filtered = activeCategory === 'Semua'
    ? productsData
    : productsData.filter((p) => p.category === activeCategory);

  // ═════════════════════════════════════════════════════════════
  // AUTH PAGES
  // ═════════════════════════════════════════════════════════════
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 flex items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
        <div className="w-full max-w-md bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-700/50">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-3xl mx-auto mb-4 shadow-lg shadow-indigo-900/50">
              C
            </div>
            {authPage === 'login' ? (
              <>
                <h1 className="text-3xl font-bold text-white mb-1">Selamat Datang</h1>
                <p className="text-gray-400 text-sm">Masuk ke CaseCraft untuk melanjutkan</p>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-white mb-1">Buat Akun Baru</h1>
                <p className="text-gray-400 text-sm">Daftar untuk mulai berbelanja di CaseCraft</p>
              </>
            )}
          </div>

          {authPage === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Username</label>
                <input type="text" value={loginForm.username} onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700/60 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="Masukkan username Anda" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
                <input type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700/60 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="Masukkan password Anda" required />
              </div>
              <button type="submit" className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-900/50 transition-all transform hover:-translate-y-0.5">
                Masuk
              </button>
              <p className="text-center text-gray-400 text-sm">
                Belum punya akun?{' '}
                <button type="button" onClick={() => setAuthPage('register')} className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
                  Daftar di sini
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Nama Lengkap</label>
                <input type="text" value={registerForm.name} onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700/60 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="Nama lengkap Anda" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Username</label>
                <input type="text" value={registerForm.username} onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700/60 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="Pilih username" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
                <input type="password" value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700/60 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="Buat password" required />
              </div>
              <button type="submit" className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-900/50 transition-all transform hover:-translate-y-0.5">
                Daftar
              </button>
              <p className="text-center text-gray-400 text-sm">
                Sudah punya akun?{' '}
                <button type="button" onClick={() => setAuthPage('login')} className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
                  Login di sini
                </button>
              </p>
            </form>
          )}
        </div>
      </main>
    );
  }

  // ═════════════════════════════════════════════════════════════
  // APP SHELL (logged in)
  // ═════════════════════════════════════════════════════════════
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 selection:bg-indigo-500 selection:text-white">
      <AppHeader
        activePage={activePage}
        setActivePage={setActivePage}
        totalCartItems={totalCartItems}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* ── BERANDA ──────────────────────────────────────────── */}
      {activePage === 'beranda' && (
        <div className="pt-16">
          {/* Hero */}
          <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-950 text-white py-32 md:py-48">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 translate-y-1/3 -translate-x-1/4" />
            </div>
            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="inline-flex items-center gap-2 bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 rounded-full px-4 py-1.5 text-sm font-medium mb-8">
                ✨ Premium Phone Case Indonesia
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                Gaya & Perlindungan{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                  Terbaik.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Temukan koleksi casing smartphone premium kami yang dirancang khusus untuk iPhone dan Android. Gaya premium, perlindungan maksimal, dan harga terjangkau.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setActivePage('produk')}
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-900/50 transition-all transform hover:-translate-y-1 text-lg"
                >
                  Jelajahi Produk Sekarang →
                </button>
                <button
                  onClick={() => setActivePage('produk')}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 transition-all text-lg backdrop-blur-sm"
                >
                  Lihat Koleksi
                </button>
              </div>
            </div>
          </section>

          {/* Keunggulan */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-14">
                <h2 className="text-4xl font-bold text-gray-900 mb-3">Mengapa Pilih CaseCraft?</h2>
                <p className="text-gray-500 text-lg">Kami berkomitmen memberikan yang terbaik untuk HP kesayangan Anda.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <IconShield cls="w-8 h-8" />,
                    color: 'indigo',
                    title: 'Garansi Ganti Baru',
                    desc: 'Setiap produk bergaransi penuh. Jika cacat produksi dalam 30 hari, kami ganti baru tanpa pertanyaan.',
                  },
                  {
                    icon: <IconStar cls="w-8 h-8" />,
                    color: 'violet',
                    title: 'Bahan Anti-Kuning',
                    desc: 'Material TPU dan silikon premium kami tidak menguning hingga 2 tahun. Tetap jernih dan bersih sepanjang waktu.',
                  },
                  {
                    icon: <IconLeaf cls="w-8 h-8" />,
                    color: 'emerald',
                    title: 'Ramah Lingkungan',
                    desc: 'Diproduksi dari bahan daur ulang yang aman. Setiap pembelian berkontribusi pada program penanaman pohon kami.',
                  },
                ].map((feat) => (
                  <div key={feat.title} className={`group bg-gray-50 hover:bg-${feat.color}-50 border border-gray-100 hover:border-${feat.color}-200 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}>
                    <div className={`w-14 h-14 bg-${feat.color}-100 text-${feat.color}-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                      {feat.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feat.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-16 bg-indigo-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                {[
                  { val: '13+',    label: 'Koleksi Produk'   },
                  { val: '5.000+', label: 'Pelanggan Puas'   },
                  { val: '4.9★',   label: 'Rating Rata-rata' },
                  { val: '100%',   label: 'Original & Premium' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-4xl font-extrabold mb-1">{s.val}</div>
                    <div className="text-indigo-200 font-medium text-sm">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-white">
            <div className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Siap Menemukan Casing Impian Anda?</h2>
              <p className="text-gray-500 text-lg mb-8">Pilih dari {productsData.length} koleksi eksklusif kami yang tersedia untuk iPhone dan Android.</p>
              <button
                onClick={() => setActivePage('produk')}
                className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1 text-lg"
              >
                Belanja Sekarang →
              </button>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-xl">C</div>
                <span className="font-bold text-xl tracking-tight">CaseCraft.</span>
              </div>
              <p className="text-gray-400 text-sm">© 2026 Tugas E-Commerce Kelompok. Dibuat dengan Next.js & Tailwind CSS.</p>
            </div>
          </footer>
        </div>
      )}

      {/* ── PRODUK ───────────────────────────────────────────── */}
      {activePage === 'produk' && (
        <div className="pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Koleksi Kami</h2>
                <p className="text-gray-500 text-lg">{filtered.length} dari {productsData.length} casing eksklusif tersedia.</p>
              </div>
              {/* Category Filter */}
              <div className="flex bg-gray-100 p-1 rounded-full w-max shadow-inner">
                {['Semua', 'iPhone', 'Android'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                      activeCategory === cat ? 'bg-white text-indigo-600 shadow' : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/60 transition-all duration-300 transform hover:-translate-y-2"
                >
                  {/* Image */}
                  <div
                    className="relative h-60 w-full bg-gray-50 overflow-hidden flex items-center justify-center cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <span className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {product.badge}
                    </span>
                    <Image
                      src={product.image} alt={product.name} fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-indigo-900/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Info */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3
                      className="text-base font-bold text-gray-900 line-clamp-2 leading-snug mb-2 cursor-pointer hover:text-indigo-600 transition-colors"
                      onClick={() => setSelectedProduct(product)}
                    >
                      {product.name}
                    </h3>
                    <span className="text-xs text-indigo-600 font-bold bg-indigo-50 w-max px-2 py-0.5 rounded-md mb-4">
                      {product.category}
                    </span>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <span className="text-lg font-extrabold text-gray-900">{product.priceText}</span>
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="border border-gray-200 text-gray-900 hover:border-indigo-600 hover:text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold transition-colors shadow-sm"
                      >
                        Lihat Detail
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                <p className="text-lg">Tidak ada produk di kategori ini.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── PROFIL ───────────────────────────────────────────── */}
      {activePage === 'profil' && (
        <div className="pt-24 pb-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Profil Saya</h2>
            <p className="text-gray-500 mb-8">Kelola informasi akun dan pengaturan belanja Anda.</p>

            {/* User Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-6">
              <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-8 flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur text-white text-3xl font-black flex items-center justify-center shadow-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-bold text-xl">{user.name}</p>
                  <p className="text-indigo-200 font-medium">@{user.username}</p>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="p-8 space-y-7">
                {/* Alamat */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    <IconPin cls="w-4 h-4 text-indigo-500" /> Alamat Pengiriman
                  </label>
                  <textarea
                    value={profileForm.address}
                    onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all min-h-[110px] resize-none"
                    placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota, Kode Pos"
                  />
                </div>

                {/* Metode Pembayaran */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                    <IconCard cls="w-4 h-4 text-indigo-500" /> Metode Pembayaran Default
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PAYMENT_OPTIONS.map((method) => (
                      <label
                        key={method}
                        className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                          profileForm.paymentMethod === method
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-gray-200 hover:border-indigo-300'
                        }`}
                      >
                        <input
                          type="radio" name="profilePayment" value={method}
                          checked={profileForm.paymentMethod === method}
                          onChange={(e) => setProfileForm({ ...profileForm, paymentMethod: e.target.value })}
                          className="w-4 h-4 text-indigo-600"
                        />
                        <span className="font-medium text-gray-900 text-sm">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5"
                >
                  Simpan Profil
                </button>
              </form>
            </div>

            {/* Logout */}
            <div className="bg-white rounded-3xl border border-red-100 shadow-sm p-6 flex flex-col items-start gap-3">
              <h3 className="font-bold text-gray-900">Keluar dari Akun</h3>
              <p className="text-sm text-gray-500">Anda akan diarahkan ke halaman login setelah logout.</p>
              <button
                onClick={handleLogout}
                className="px-6 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold border border-red-200 rounded-xl transition-colors"
              >
                Logout dari CaseCraft
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────── */}
      {/* PRODUCT DETAIL MODAL                                    */}
      {/* ─────────────────────────────────────────────────────── */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            {/* Image */}
            <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-gray-50 flex-shrink-0 border-r border-gray-100">
              <div className="relative w-full h-full min-h-[280px] md:min-h-full p-8">
                <Image src={selectedProduct.image} alt={selectedProduct.name} fill className="object-contain p-4" />
              </div>
              <span className="absolute top-5 left-5 bg-white/90 backdrop-blur text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                {selectedProduct.badge}
              </span>
            </div>
            {/* Detail */}
            <div className="p-8 md:p-10 flex flex-col flex-grow overflow-y-auto">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight pr-4">{selectedProduct.name}</h3>
                <button onClick={() => setSelectedProduct(null)} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                  <IconClose />
                </button>
              </div>
              <span className="text-sm text-indigo-600 font-bold bg-indigo-50 w-max px-3 py-1 rounded-md mb-6">{selectedProduct.category}</span>
              <div className="flex-grow mb-6">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Deskripsi</p>
                <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>
                <div className="mt-5 p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Kompabilitas</p>
                  <p className="font-medium text-gray-900">{selectedProduct.support}</p>
                </div>
              </div>
              <div className="mt-auto pt-5 border-t border-gray-100">
                <div className="flex justify-between items-center mb-5">
                  <span className="text-gray-500">Harga</span>
                  <span className="text-3xl font-black text-gray-900">{selectedProduct.priceText}</span>
                </div>
                <button
                  onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                  className="w-full py-4 bg-gray-900 hover:bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg transition-all transform hover:-translate-y-1 flex justify-center items-center gap-2"
                >
                  <IconPlus /> Tambah ke Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────── */}
      {/* CART MODAL                                              */}
      {/* ─────────────────────────────────────────────────────── */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <IconCart cls="w-5 h-5 text-indigo-600" /> Keranjang Belanja
              </h3>
              <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors">
                <IconClose />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-grow">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconCart cls="w-10 h-10 text-gray-300" />
                  </div>
                  <p className="text-gray-400 font-medium">Keranjang Anda masih kosong</p>
                  <button onClick={() => { setIsCartOpen(false); setActivePage('produk'); }} className="mt-4 text-indigo-600 text-sm font-semibold hover:underline">
                    Mulai Belanja
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4">
                      <div className="relative w-18 h-18 w-[72px] h-[72px] bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-400 mb-2">{item.category} · Qty {item.quantity}</p>
                        <p className="font-bold text-indigo-600 text-sm">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="p-2 self-start bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 rounded-lg transition-colors">
                        <IconTrash />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600 font-medium">Total</span>
                  <span className="text-2xl font-extrabold text-gray-900">Rp {totalCartPrice.toLocaleString('id-ID')}</span>
                </div>
                <button
                  onClick={openCheckout}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1"
                >
                  Checkout Sekarang
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────── */}
      {/* CHECKOUT CONFIRMATION MODAL                             */}
      {/* ─────────────────────────────────────────────────────── */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[93vh] overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Konfirmasi Pesanan</h3>
                <p className="text-sm text-gray-400">Periksa detail sebelum membayar</p>
              </div>
              <button onClick={() => setIsCheckoutOpen(false)} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                <IconClose />
              </button>
            </div>

            <div className="overflow-y-auto flex-grow p-6 space-y-6">
              {/* Order Summary */}
              <div>
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Ringkasan Pesanan ({cart.length} item)</h4>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="relative w-12 h-12 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                        <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-semibold text-gray-900 text-sm line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-400">x{item.quantity}</p>
                      </div>
                      <p className="font-bold text-indigo-600 text-sm flex-shrink-0">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-3 p-3 bg-indigo-50 rounded-xl">
                  <span className="font-bold text-gray-900">Total Harga</span>
                  <span className="text-xl font-extrabold text-indigo-600">Rp {totalCartPrice.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Alamat Pengiriman */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  <IconPin cls="w-4 h-4 text-indigo-500" /> Alamat Pengiriman
                </label>
                <textarea
                  value={checkoutAddress}
                  onChange={(e) => { setCheckoutAddress(e.target.value); setCheckoutError(''); }}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all min-h-[90px] resize-none text-sm"
                  placeholder="Masukkan alamat pengiriman lengkap…"
                />
                {checkoutError && !checkoutAddress.trim() && (
                  <p className="flex items-center gap-1.5 text-red-500 text-sm mt-1.5 font-semibold">
                    <IconWarn cls="w-4 h-4" /> Alamat pengiriman tidak boleh kosong!
                  </p>
                )}
              </div>

              {/* Metode Pembayaran */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                  <IconCard cls="w-4 h-4 text-indigo-500" /> Metode Pembayaran
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PAYMENT_OPTIONS.map((method) => (
                    <label
                      key={method}
                      className={`flex items-center gap-3 p-3.5 border rounded-xl cursor-pointer transition-all ${
                        checkoutPayment === method ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <input
                        type="radio" name="checkoutPayment" value={method}
                        checked={checkoutPayment === method}
                        onChange={(e) => { setCheckoutPayment(e.target.value); setCheckoutError(''); }}
                        className="w-4 h-4 text-indigo-600"
                      />
                      <span className="font-medium text-gray-900 text-sm">{method}</span>
                    </label>
                  ))}
                </div>
                {checkoutError && !checkoutPayment && (
                  <p className="flex items-center gap-1.5 text-red-500 text-sm mt-2 font-semibold">
                    <IconWarn cls="w-4 h-4" /> Silakan pilih metode pembayaran!
                  </p>
                )}
              </div>

              {/* Combined error */}
              {checkoutError && checkoutAddress.trim() && checkoutPayment && (
                <p className="flex items-center gap-2 text-red-500 text-sm font-semibold bg-red-50 px-4 py-3 rounded-xl">
                  <IconWarn cls="w-4 h-4" /> {checkoutError}
                </p>
              )}
            </div>

            {/* Confirm Button */}
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <button
                onClick={handleConfirmCheckout}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                ✅ Konfirmasi Pembayaran — Rp {totalCartPrice.toLocaleString('id-ID')}
              </button>
              <button
                onClick={() => { setIsCheckoutOpen(false); setIsCartOpen(true); }}
                className="w-full mt-3 py-2.5 text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors"
              >
                ← Kembali ke Keranjang
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
