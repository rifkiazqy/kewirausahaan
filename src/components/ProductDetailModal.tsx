'use client';

import Image from 'next/image';
import { Product } from '@/lib/types';
import { IconClose, IconPlus } from '@/lib/icons';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        {/* Image Side */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-gray-50 flex-shrink-0 border-r border-gray-100">
          <div className="relative w-full h-full min-h-[280px] md:min-h-full p-8">
            <Image src={product.image} alt={product.name} fill className="object-contain p-4" />
          </div>
          <span className="absolute top-5 left-5 bg-white/90 backdrop-blur text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            {product.badge}
          </span>
        </div>

        {/* Detail Side */}
        <div className="p-8 md:p-10 flex flex-col flex-grow overflow-y-auto">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight pr-4">
              {product.name}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            >
              <IconClose />
            </button>
          </div>

          <span className="text-sm text-indigo-600 font-bold bg-indigo-50 w-max px-3 py-1 rounded-md mb-6">
            {product.category}
          </span>

          <div className="flex-grow mb-6">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Deskripsi</p>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
            <div className="mt-5 p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Kompabilitas</p>
              <p className="font-medium text-gray-900">{product.support}</p>
            </div>
          </div>

          <div className="mt-auto pt-5 border-t border-gray-100">
            <div className="flex justify-between items-center mb-5">
              <span className="text-gray-500">Harga</span>
              <span className="text-3xl font-black text-gray-900">{product.priceText}</span>
            </div>
            <button
              onClick={() => { onAddToCart(product); onClose(); }}
              className="w-full py-4 bg-gray-900 hover:bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg transition-all transform hover:-translate-y-1 flex justify-center items-center gap-2"
            >
              <IconPlus /> Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
