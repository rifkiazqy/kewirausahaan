'use client';

import Image from 'next/image';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <div className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/60 transition-all duration-300 transform hover:-translate-y-2">
      {/* Image Area */}
      <div
        className="relative h-60 w-full bg-gray-50 overflow-hidden flex items-center justify-center cursor-pointer"
        onClick={() => onSelect(product)}
      >
        <span className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
          {product.badge}
        </span>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-indigo-900/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-grow">
        <h3
          className="text-base font-bold text-gray-900 line-clamp-2 leading-snug mb-2 cursor-pointer hover:text-indigo-600 transition-colors"
          onClick={() => onSelect(product)}
        >
          {product.name}
        </h3>
        <span className="text-xs text-indigo-600 font-bold bg-indigo-50 w-max px-2 py-0.5 rounded-md mb-4">
          {product.category}
        </span>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="text-lg font-extrabold text-gray-900">{product.priceText}</span>
          <button
            onClick={() => onSelect(product)}
            className="border border-gray-200 text-gray-900 hover:border-indigo-600 hover:text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold transition-colors shadow-sm"
          >
            Lihat Detail
          </button>
        </div>
      </div>
    </div>
  );
}
