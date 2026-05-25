'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import AuthForm from '@/components/AuthForm';
import { registerUser, loginUser, logoutUser, getCurrentUser } from '@/utils/supabase/auth';
import { getProducts } from '@/utils/supabase/products';
import { getCartItems, addToCart, updateCartItem, removeCartItem } from '@/utils/supabase/cart';
import { createOrder, getOrders } from '@/utils/supabase/orders';
import type { Product } from '@/utils/supabase/products';
import type { CartItem } from '@/utils/supabase/cart';
import type { Order } from '@/utils/supabase/orders';

const PAYMENT_OPTIONS = [
  'Transfer Bank BCA/Mandiri',
  'GoPay',
  'OVO',
  'Dana',
  'COD (Bayar di Tempat)',
];

type AuthPage = 'login' | 'register';
type ActivePage = 'beranda' | 'produk' | 'profil';
type UserProfile = { id: string; username: string; full_name: string; address: string | null; phone: string | null; payment_method: string | null; };

// Icons
const IconCart = ({ cls }: { cls?: string }) => (
  <svg className={cls ?? 'w-5 h-5'} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
);
const IconUser = ({ cls }: { cls?: string }) => (
  <svg className={cls ?? 'w-5 h-5'} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);
const IconClose = ({ cls }: { cls?: string }) => (
  <svg className={cls ?? 'w-6 h-6'} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
);
const IconTrash = ({ cls }: { cls?: string }) => (
  <svg className={cls ?? 'w-4 h-4'} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
);
const IconPlus = ({ cls }: { cls?: string }) => (
  <svg className={cls ?? 'w-5 h-5'} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
);
const IconLogout = ({ cls }: { cls?: string }) => (
  <svg className={cls ?? 'w-5 h-5'} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
);

function AppHeader({ activePage, setActivePage, totalCartItems, onOpenCart, userProfile, onLogout }: any) {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-7xl">
      <div className="bg-white/80 backdrop-blur-lg border border-gray-100 rounded-full shadow-lg px-6 py-3 flex items-center justify-between">
        <button onClick={() => setActivePage('beranda')} className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-slate-950 flex items-center justify-center text-white font-bold text-xl transition-transform group-hover:rotate-[-10deg]">C</div>
          <span className="font-extrabold text-xl tracking-tighter text-slate-950">Case<span className='text-indigo-600'>Craft</span></span>
        </button>

        <nav className="hidden md:flex gap-1.5 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/50">
          {(['beranda', 'produk'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setActivePage(p)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activePage === p ? 'bg-slate-950 text-white shadow-md scale-105' : 'text-slate-600 hover:text-slate-950'}`}
            >
              {p === 'beranda' ? 'Beranda' : 'Katalog'}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => setActivePage('profil')} className={`flex items-center gap-2.5 text-sm font-semibold px-4 py-2.5 rounded-full transition-all ${activePage === 'profil' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'}`}>
            <IconUser cls="w-5 h-5 text-indigo-500"/>
            <span className='hidden sm:inline'>{userProfile?.full_name?.split(' ')[0] || 'User'}</span>
          </button>
          <button onClick={onOpenCart} className="relative w-10 h-10 flex items-center justify-center text-slate-600 hover:text-indigo-600 transition-all rounded-full hover:bg-indigo-50 hover:-translate-y-0.5">
            <IconCart/>
            {totalCartItems > 0 && <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-black flex items-center justify-center text-white bg-red-500 rounded-full animate-pulse">{totalCartItems}</span>}
          </button>
          <div className="h-6 w-px bg-slate-100 mx-1"></div>
          <button onClick={onLogout} className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-red-600 transition-all rounded-full hover:bg-red-50"><IconLogout /></button>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authPage, setAuthPage] = useState<AuthPage>('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', username: '', email: '', password: '' });
  const [activePage, setActivePage] = useState<ActivePage>('beranda');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({ address: '', paymentMethod: '' });
  const [checkoutError, setCheckoutError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  
  const HERO_WORDS = ['Premium', 'Kekinian', 'Elegan', 'Eksklusif'];
  const [wordIndex, setWordIndex] = useState(0);

  // --- REFS UNTUK ANIMASI KURSOR (SMOOTH TRAIL) ---
  const mousePos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });
  const trailRef = useRef<HTMLDivElement>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  useEffect(() => { checkAuthStatus(); }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % HERO_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // --- SENSOR MOUSE MENDETEKSI PERGERAKAN DENGAN LERPING (SMOOTH) ---
  useEffect(() => {
    // 1. Simpan posisi kursor asli setiap kali mouse bergerak
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // 2. Loop animasi berjalan terus untuk ngejar posisi mouse
    const renderTrail = () => {
      // Rumus Lerp (Linear Interpolation) = posisiSaatIni + (Target - posisiSaatIni) * kecepatan
      // Angka 0.12 ini adalah kecepatan mengekor. Semakin kecil makin lambat ngejarnya.
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * 0.12;
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * 0.12;
      
      // Update DOM secara langsung (tanpa trigger React re-render) agar 60fps super mulus
      if (trailRef.current) {
        // -48 itu untuk menggeser titik tengah aura (karena lebar aura 96px)
        trailRef.current.style.transform = `translate(${trailPos.current.x - 48}px, ${trailPos.current.y - 48}px)`;
      }
      
      // Lanjutkan loop animasi
      requestAnimationFrame(renderTrail);
    };
    
    // Mulai animasi
    const animationId = requestAnimationFrame(renderTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const checkAuthStatus = async () => {
    try {
      const user = await getCurrentUser();
      if (user) { setCurrentUser(user); setIsLoggedIn(true); loadProducts(); loadCart(user.id); loadOrders(user.id); fetchUserProfile(user.id); }
    } catch (error) {}
  };
  
  const fetchUserProfile = async (userId: string) => {
    try {
      const { supabase } = await import('@/utils/supabase/auth');
      const { data } = await supabase.from('users').select('*').eq('id', userId).single();
      if (data) { setUserProfile(data); setCheckoutForm({ address: data.address || '', paymentMethod: data.payment_method || '' }); }
    } catch (error) {}
  };

  const loadProducts = async () => { try { const data = await getProducts(); setProducts(data); setFilteredProducts(data); } catch (error) {} };
  const loadCart = async (userId: string) => { try { const items = await getCartItems(userId); setCartItems(items); } catch (error) {} };
  const loadOrders = async (userId: string) => { try { const data = await getOrders(userId); setOrders(data); } catch (error) {} };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); setIsAuthLoading(true); setAuthError('');
    try { await registerUser(registerForm.username, registerForm.email, registerForm.password, registerForm.name); setAuthPage('login'); setRegisterForm({ name: '', username: '', email: '', password: '' }); setLoginForm({ email: registerForm.email, password: registerForm.password }); showNotification('Welcome aboard! Let\'s log you in.', 'success'); } 
    catch (error: any) { setAuthError(error.message || 'Register failed'); } finally { setIsAuthLoading(false); }
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setIsAuthLoading(true); setAuthError('');
    try { const result = await loginUser(loginForm.email, loginForm.password); setCurrentUser(result.user); setUserProfile(result.profile); setIsLoggedIn(true); setActivePage('beranda'); setLoginForm({ email: '', password: '' }); loadProducts(); loadCart(result.user.id); loadOrders(result.user.id); showNotification(`Welcome back, ${result.profile?.full_name?.split(' ')[0]}!`, 'success'); } 
    catch (error: any) { setAuthError(error.message || 'Login failed'); } finally { setIsAuthLoading(false); }
  };
  
  const handleLogout = async () => { try { await logoutUser(); setIsLoggedIn(false); setCurrentUser(null); setUserProfile(null); setCartItems([]); setOrders([]); setAuthPage('login'); } catch (error) {} };
  
  const handleAddToCart = async (product: Product) => {
    if (!currentUser) return;
    try { await addToCart(currentUser.id, product.id, 1); loadCart(currentUser.id); showNotification(`Crafting your style! ${product.name} added. ✨`, 'success'); } 
    catch (error) { showNotification('Oops, failed to update cart.', 'error'); }
  };
  
  const handleUpdateCart = async (cartItemId: number, quantity: number) => { try { await updateCartItem(cartItemId, quantity); if (currentUser) loadCart(currentUser.id); } catch (error) {} };
  
  const handleRemoveFromCart = async (cartItemId: number) => { try { await removeCartItem(cartItemId); if (currentUser) loadCart(currentUser.id); showNotification('Item removed.', 'success'); } catch (error) {} };
  
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault(); if (!currentUser || cartItems.length === 0) return; setCheckoutError('');
    if (!checkoutForm.address.trim()) { setCheckoutError('Shipping address is required.'); return; }
    if (!checkoutForm.paymentMethod) { setCheckoutError('Please select a payment method.'); return; }
    setIsCheckingOut(true);
    try { await createOrder(currentUser.id, cartItems, checkoutForm.paymentMethod, checkoutForm.address); setIsCheckoutOpen(false); loadOrders(currentUser.id); loadCart(currentUser.id); showNotification('Order created! Time to get excited. 🎉', 'success'); setActivePage('profil'); } 
    catch (error: any) { setCheckoutError(error.message || 'Checkout failed'); } finally { setIsCheckingOut(false); }
  };

  useEffect(() => { if (activeCategory === 'Semua') { setFilteredProducts(products); } else { setFilteredProducts(products.filter((p) => p.category === activeCategory)); } }, [activeCategory, products]);
  
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((sum, item) => { const product = products.find((p) => p.id === item.product_id); return sum + (product?.price || 0) * item.quantity; }, 0);

  if (!isLoggedIn) {
    return ( <AuthForm authPage={authPage} setAuthPage={setAuthPage} loginForm={loginForm} setLoginForm={setLoginForm} registerForm={registerForm} setRegisterForm={setRegisterForm} onLogin={handleLogin} onRegister={handleRegister} isLoading={isAuthLoading} error={authError} /> );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      
      {/* --- EFEK GLOWING AURA MENGEKOR (SMOOTH TRAIL) --- */}
      <div 
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{ willChange: 'transform' }}
      >
        <div className="w-24 h-24 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-[30px] opacity-40 animate-[spin_3s_linear_infinite]"></div>
      </div>

      {/* Toast Notification */}
      <div className={`fixed bottom-6 right-6 z-[100] transition-all duration-500 ease-out ${toast.show ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95 pointer-events-none'}`}>
        <div className={`flex items-center gap-4 px-6 py-4 rounded-3xl shadow-2xl border backdrop-blur-xl ${toast.type === 'success' ? 'bg-slate-950 text-white border-slate-800' : 'bg-red-50 text-red-700 border-red-200'}`}>
          <div className={`${toast.type === 'success' ? 'bg-indigo-500' : 'bg-red-200'} w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0`}>
            {toast.type === 'success' ? <span className="text-xl">✌️</span> : '⚠️'}
          </div>
          <div>
            <p className="font-bold text-sm tracking-tight">{toast.type === 'success' ? 'All good!' : 'Attention!'}</p>
            <p className="text-xs opacity-90 font-medium leading-relaxed mt-0.5">{toast.message}</p>
          </div>
        </div>
      </div>

      <AppHeader activePage={activePage} setActivePage={setActivePage} totalCartItems={totalCartItems} onOpenCart={() => setIsCartOpen(true)} userProfile={userProfile} onLogout={handleLogout} />

      <main className="pt-28 pb-20">
        
        {/* HOMEPAGE - HERO SECTION */}
        {activePage === 'beranda' && (
          <section className="relative max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 py-16">
            <div className="absolute inset-0 top-20 -left-20 w-[600px] h-[600px] bg-purple-100 rounded-full blur-[120px] opacity-70 pointer-events-none" />
            <div className="absolute inset-0 top-40 -right-20 w-[500px] h-[500px] bg-indigo-100 rounded-full blur-[100px] opacity-70 pointer-events-none" />
            
            <div className="relative z-10 flex-1 text-center lg:text-left lg:pr-10 animate-slide-up">
              <span className="inline-block px-4 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 font-bold text-xs uppercase tracking-widest mb-4">✨ Premium iPhone & Android Cases</span>
              
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-950 mb-6 leading-[1.1]">
                Temukan Casing HP <br/>
                <span className="inline-flex items-center h-[1.2em] overflow-hidden align-bottom">
                  <span key={wordIndex} className="text-indigo-600 inline-block animate-slide-down-text">
                    {HERO_WORDS[wordIndex]}
                  </span>
                  <span className="text-indigo-600 animate-blink font-light ml-1 -translate-y-1">|</span>
                </span>
                .
              </h1>
              
              <p className="text-slate-600 text-lg md:text-xl mb-10 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                Waktunya upgrade gaya pelindung HP kamu. Jelajahi koleksi premium kami di CaseCraft sekarang.
              </p>
              
              <button onClick={() => setActivePage('produk')} className="group relative inline-flex items-center gap-3 px-10 py-5 bg-slate-950 hover:bg-indigo-600 text-white font-extrabold rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-500/20 active:scale-95">
                Mulai Belanja <span className="group-hover:translate-x-1.5 transition-transform">→</span>
              </button>
            </div>
            
            {/* KOTAK BANNER - ANIMASI ELEGAN */}
            <div className="relative z-10 flex-1 w-full max-w-lg lg:max-w-none animate-fade-in">
                <div className='absolute inset-0 -m-8 rounded-full border-[1.5px] border-dashed border-indigo-200/70 animate-[spin_60s_linear_infinite]'/>
                
                <div className="relative aspect-[16/10] bg-slate-950 rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-white flex items-center justify-center p-12 group">
                    <div className='absolute top-[-20%] left-[-10%] w-full h-full bg-indigo-600/30 rounded-full blur-[100px] animate-[float_15s_ease-in-out_infinite] pointer-events-none' />
                    <div className='absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-purple-500/20 rounded-full blur-[80px] animate-[float_10s_ease-in-out_infinite_reverse] pointer-events-none' />
                    <div className="absolute inset-0 opacity-[0.03] [mask-image:linear-gradient(to_bottom,white,transparent)]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', screenSize: '20px 20px' }}></div>

                    <div className='relative z-20 text-center flex flex-col items-center gap-6'>
                      <div className='w-28 h-28 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-inner flex items-center justify-center animate-[float_8s_ease-in-out_infinite] group-hover:scale-105 transition-transform duration-500'>
                        <span className='font-black text-6xl text-white tracking-tighter opacity-80'>CC</span>
                        <div className='absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-[shine_4s_linear_infinite]' />
                      </div>

                      <div className='space-y-1 opacity-90 animate-[float_12s_ease-in-out_infinite_2s]'>
                        <p className='text-indigo-300 font-bold tracking-widest text-xs uppercase'>Crafted for Excellence</p>
                        <p className='text-white font-black tracking-tight text-xl'>Protection. Style. Quality.</p>
                      </div>
                      
                      <div className='absolute top-[-20px] right-[-20px] text-white bg-indigo-600 px-4 py-1.5 rounded-full font-black tracking-tight text-xs z-30 shadow-lg rotate-12 animate-pulse'>
                        EDITION 2024
                      </div>
                    </div>
                </div>
            </div>
          </section>
        )}

        {/* PRODUK */}
        {activePage === 'produk' && (
          <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
                <h2 className="text-4xl font-black text-slate-950 tracking-tighter">Katalog Produk</h2>
                <div className="flex gap-1.5 bg-white p-1.5 rounded-full border border-slate-100 shadow-inner overflow-x-auto scrollbar-hide">
                    {['Semua', 'iPhone', 'Android'].map((cat) => (
                        <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group flex flex-col">
                  <div className="relative aspect-[10/11] bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex items-center justify-center p-8 transition-all duration-300 group-hover:border-indigo-100 group-hover:shadow-indigo-50 group-hover:-translate-y-1.5">
                    {product.badge && <span className="absolute top-4 left-4 z-10 bg-slate-950 text-white text-[10px] font-black px-3.5 py-2 rounded-full uppercase tracking-widest shadow-sm">{product.badge}</span>}
                    <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                      <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-contain" />
                    </div>
                  </div>
                  <div className="pt-4 flex flex-col flex-grow">
                    <h3 className="font-bold text-slate-900 mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
                    <p className="text-slate-500 text-xs mb-4 font-medium leading-relaxed line-clamp-2">{product.description}</p>
                    <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-100">
                      <span className="text-xl font-extrabold text-slate-950 tracking-tight">Rp{(product.price / 1000).toFixed(0)}<span className='text-sm text-slate-500 font-bold'>K</span></span>
                      <button onClick={() => handleAddToCart(product)} className="w-11 h-11 bg-slate-950 hover:bg-indigo-600 text-white rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 group-hover:rotate-6">
                        <IconPlus cls="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROFIL */}
        {activePage === 'profil' && (
          <section className="max-w-3xl mx-auto px-6 lg:px-8 pt-8">
            <h2 className="text-4xl font-black text-slate-950 tracking-tighter mb-10">Profil Saya</h2>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-8 flex flex-col items-center text-center shadow-sm">
                        <div className='w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-3xl font-black mb-4'>@{userProfile?.username?.substring(0,2).toUpperCase()}</div>
                        <p className="font-extrabold text-slate-950">{userProfile?.full_name}</p>
                        <p className="text-xs text-slate-500 font-medium">@{userProfile?.username}</p>
                    </div>
                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2.5 py-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl font-bold text-sm transition-all"><IconLogout cls='w-4 h-4'/> Keluar Sesi</button>
                </div>
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                    <h3 className="text-lg font-extrabold text-slate-950 mb-6 flex items-center gap-2"><IconUser cls="text-indigo-600 w-5 h-5"/> Kontak & Login</h3>
                    <div className="space-y-4 text-sm font-medium">
                        <div className='flex justify-between'><p className="text-slate-500">Nama Lengkap</p><p className="font-bold text-slate-900">{userProfile?.full_name}</p></div>
                        <div className='flex justify-between'><p className="text-slate-500">Username</p><p className="font-bold text-slate-900">@{userProfile?.username}</p></div>
                        <div className='flex justify-between'><p className="text-slate-500">Email Utama</p><p className="font-bold text-slate-900">{currentUser?.email}</p></div>
                    </div>
                    </div>
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                    <h3 className="text-lg font-extrabold text-slate-950 mb-6 flex items-center gap-2"><IconCart cls="text-indigo-600 w-5 h-5"/> Riwayat Pesanan</h3>
                    {orders.length === 0 ? (
                        <p className="text-slate-500 text-sm font-medium py-4">Belum ada pesanan yang tercatat.</p>
                    ) : (
                        <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="p-5 border border-slate-100 rounded-2xl flex justify-between items-center bg-slate-50">
                            <div>
                                <span className="font-bold text-slate-900 block mb-1">Pesanan #{order.id}</span>
                                <p className="text-sm text-indigo-600 font-black">Rp{(order.total_amount / 1000).toFixed(0)}K</p>
                            </div>
                            <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${order.status === 'pending' ? 'bg-orange-100 text-orange-800' : 'bg-emerald-100 text-emerald-800'}`}>{order.status}</span>
                            </div>
                        ))}
                        </div>
                    )}
                    </div>
                </div>
            </div>
          </section>
        )}
      </main>

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex justify-end transition-opacity animate-fade-in" onClick={() => setIsCartOpen(false)}>
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right overflow-hidden rounded-l-[2rem]" onClick={(e) => e.stopPropagation()}>
            <div className="p-7 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-2xl font-black text-slate-950 tracking-tight flex items-center gap-2.5"><IconCart cls='text-indigo-600 w-6 h-6'/>Keranjang</h2>
              <button onClick={() => setIsCartOpen(false)} className="w-10 h-10 bg-slate-100 text-slate-500 hover:bg-slate-200 rounded-full transition-colors active:scale-95"><IconClose /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-7 scrollbar-thin">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 px-4">
                  <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mb-6"><IconCart cls="w-12 h-12 text-slate-300" /></div>
                  <p className="text-slate-900 font-extrabold text-lg">Keranjang Kosong 🥺</p>
                  <p className="text-slate-500 text-sm font-medium mt-1.5 leading-relaxed">Cari casing HP impianmu di katalog dan tambahkan di sini!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => {
                    const product = products.find((p) => p.id === item.product_id);
                    if (!product) return null;
                    return (
                      <div key={item.id} className="flex gap-5 pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                        <div className="relative w-20 h-20 bg-slate-50 rounded-2xl flex-shrink-0 p-2 border border-slate-100">
                          <Image src={product.image} alt={product.name} fill sizes="80px" className="object-contain" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between pt-1">
                          <div>
                            <h4 className="font-bold text-slate-950 text-sm line-clamp-1">{product.name}</h4>
                            <p className="text-indigo-600 font-black text-sm mt-1">Rp{(product.price / 1000).toFixed(0)}K</p>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-1.5 bg-slate-100/70 border border-slate-200/50 rounded-full p-1 shadow-inner">
                              <button onClick={() => handleUpdateCart(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-950 hover:bg-white rounded-full font-bold active:scale-90 transition-all">-</button>
                              <span className="font-extrabold text-xs text-slate-950 w-5 text-center">{item.quantity}</span>
                              <button onClick={() => handleUpdateCart(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-950 hover:bg-white rounded-full font-bold active:scale-90 transition-all">+</button>
                            </div>
                            <button onClick={() => handleRemoveFromCart(item.id)} className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50"><IconTrash cls='w-5 h-5'/></button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="p-7 border-t border-slate-100 bg-slate-50/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-500 font-medium text-sm">Subtotal Est.</span>
                  <span className="text-3xl font-black text-slate-950 tracking-tight">Rp{(totalCartPrice / 1000).toFixed(0)}K</span>
                </div>
                <button onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }} className="w-full py-4 bg-slate-950 hover:bg-indigo-600 text-white font-extrabold rounded-2xl shadow-xl transition-all hover:-translate-y-1 active:scale-95">
                  Proses Pesanan →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-5 transition-opacity animate-fade-in" onClick={() => setIsCheckoutOpen(false)}>
          <div className="bg-slate-950 rounded-3xl p-9 max-w-md w-full shadow-2xl border border-slate-800 scale-100 animate-slide-in-up overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className='absolute bottom-0 right-0 w-[80%] h-[80%] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none'/>
            <div className="relative z-10 flex justify-between items-center mb-9">
              <h2 className="text-2xl font-black text-white tracking-tight">Finalisasi Pesanan</h2>
              <button onClick={() => setIsCheckoutOpen(false)} className="w-10 h-10 bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-white rounded-full transition-colors"><IconClose /></button>
            </div>

            <form onSubmit={handleCheckout} className="relative z-10 space-y-6">
              {checkoutError && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-semibold animate-shake">{checkoutError}</div>}
              
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Alamat Pengiriman</label>
                <textarea
                  placeholder="Isi alamat lengkap (nomor rumah, RT/RW, Kec/Kota)..."
                  value={checkoutForm.address}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                  className="w-full px-5 py-4 bg-slate-800/60 border border-slate-700 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all resize-none text-sm leading-relaxed"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Metode Pembayaran</label>
                <div className="relative">
                    <select
                        value={checkoutForm.paymentMethod}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, paymentMethod: e.target.value })}
                        className="w-full px-5 py-4 bg-slate-800/60 border border-slate-700 rounded-2xl text-white focus:outline-none focus:border-indigo-500 transition-all text-sm appearance-none"
                    >
                        <option value="">Pilih cara bayar</option>
                        {PAYMENT_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    <IconPlus cls="w-4 h-4 text-slate-500 absolute right-5 top-1/2 -translate-y-1/2 rotate-45 pointer-events-none" />
                </div>
              </div>

              <div className="p-6 bg-white/5 rounded-2xl border border-white/5 mt-8 flex items-center justify-between">
                <p className="text-slate-400 text-sm font-semibold">Total Transfer:</p>
                <p className="text-4xl font-black text-indigo-400 tracking-tighter">Rp{(totalCartPrice / 1000).toFixed(0)}K</p>
              </div>

              <button type="submit" disabled={isCheckingOut} className="w-full mt-5 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white font-extrabold rounded-2xl disabled:opacity-70 transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
                {isCheckingOut ? 'Crafting Order...' : 'Bayar Sekarang & Konfirmasi →'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}