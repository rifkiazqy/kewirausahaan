'use client';

import Image from 'next/image';
import { CartItem, PAYMENT_OPTIONS } from '@/lib/types';
import { IconClose, IconPin, IconCard, IconWarn } from '@/lib/icons';

interface CheckoutModalProps {
  cart: CartItem[];
  totalPrice: number;
  checkoutAddress: string;
  setCheckoutAddress: (v: string) => void;
  checkoutPayment: string;
  setCheckoutPayment: (v: string) => void;
  checkoutError: string;
  setCheckoutError: (v: string) => void;
  onConfirm: () => void;
  onBackToCart: () => void;
  onClose: () => void;
}

export default function CheckoutModal({
  cart,
  totalPrice,
  checkoutAddress,
  setCheckoutAddress,
  checkoutPayment,
  setCheckoutPayment,
  checkoutError,
  setCheckoutError,
  onConfirm,
  onBackToCart,
  onClose,
}: CheckoutModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[93vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Konfirmasi Pesanan</h3>
            <p className="text-sm text-gray-400">Periksa detail sebelum membayar</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <IconClose />
          </button>
        </div>

        <div className="overflow-y-auto flex-grow p-6 space-y-6">
          {/* Order Summary */}
          <div>
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
              Ringkasan Pesanan ({cart.length} item)
            </h4>
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
                  <p className="font-bold text-indigo-600 text-sm flex-shrink-0">
                    Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-3 p-3 bg-indigo-50 rounded-xl">
              <span className="font-bold text-gray-900">Total Harga</span>
              <span className="text-xl font-extrabold text-indigo-600">
                Rp {totalPrice.toLocaleString('id-ID')}
              </span>
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
                    checkoutPayment === method
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
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
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onConfirm}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            ✅ Konfirmasi Pembayaran — Rp {totalPrice.toLocaleString('id-ID')}
          </button>
          <button
            onClick={onBackToCart}
            className="w-full mt-3 py-2.5 text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors"
          >
            ← Kembali ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}
