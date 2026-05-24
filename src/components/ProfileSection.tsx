'use client';

import { User, PAYMENT_OPTIONS } from '@/lib/types';
import { IconPin, IconCard } from '@/lib/icons';

interface ProfileSectionProps {
  user: User;
  profileForm: { address: string; paymentMethod: string };
  setProfileForm: (v: { address: string; paymentMethod: string }) => void;
  onSave: (e: React.FormEvent) => void;
  onLogout: () => void;
}

export default function ProfileSection({
  user,
  profileForm,
  setProfileForm,
  onSave,
  onLogout,
}: ProfileSectionProps) {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Profil Saya</h2>
        <p className="text-gray-500 mb-8">Kelola informasi akun dan pengaturan belanja Anda.</p>

        {/* User Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          {/* Avatar Banner */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-8 flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur text-white text-3xl font-black flex items-center justify-center shadow-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-white font-bold text-xl">{user.name}</p>
              <p className="text-indigo-200 font-medium">@{user.username}</p>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={onSave} className="p-8 space-y-7">
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

        {/* Logout Card */}
        <div className="bg-white rounded-3xl border border-red-100 shadow-sm p-6 flex flex-col items-start gap-3">
          <h3 className="font-bold text-gray-900">Keluar dari Akun</h3>
          <p className="text-sm text-gray-500">Anda akan diarahkan ke halaman login setelah logout.</p>
          <button
            onClick={onLogout}
            className="px-6 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold border border-red-200 rounded-xl transition-colors"
          >
            Logout dari CaseCraft
          </button>
        </div>
      </div>
    </div>
  );
}
