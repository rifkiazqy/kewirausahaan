'use client';

import { ActivePage } from '@/lib/types';
import { IconCart, IconUser } from '@/lib/icons';

interface AppHeaderProps {
  activePage: ActivePage;
  setActivePage: (p: ActivePage) => void;
  totalCartItems: number;
  onOpenCart: () => void;
}

export default function AppHeader({
  activePage,
  setActivePage,
  totalCartItems,
  onOpenCart,
}: AppHeaderProps) {
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
