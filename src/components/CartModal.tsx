'use client';

import Image from 'next/image';
import { CartItem } from '@/lib/types';
import { IconCart, IconClose, IconTrash } from '@/lib/icons';

interface CartModalProps {
  cart: CartItem[];
  totalPrice: number;
  onClose: () => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
  onGoShop: () => void;
}

export default function CartModal({
  cart,
  totalPrice,
  onClose,
  onRemove,
  onCheckout,
  onGoShop,
}: CartModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <IconCart cls="w-5 h-5 text-indigo-600" /> Keranjang Belanja
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
          >
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
              <p className="text-gray-400 font-medium mb-4">Keranjang Anda masih kosong</p>
              <button
                onClick={onGoShop}
                className="text-indigo-600 text-sm font-semibold hover:underline"
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4">
                  <div className="relative w-[72px] h-[72px] bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-400 mb-2">{item.category} · Qty {item.quantity}</p>
                    <p className="font-bold text-indigo-600 text-sm">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="p-2 self-start bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 rounded-lg transition-colors"
                  >
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
              <span className="text-2xl font-extrabold text-gray-900">
                Rp {totalPrice.toLocaleString('id-ID')}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1"
            >
              Checkout Sekarang
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
