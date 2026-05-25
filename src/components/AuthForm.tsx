'use client';

import { AuthPage } from '@/lib/types';
import { useState } from 'react';

interface AuthFormProps {
  authPage: AuthPage;
  setAuthPage: (p: AuthPage) => void;
  loginForm: { email: string; password: string };
  setLoginForm: (v: { email: string; password: string }) => void;
  registerForm: { name: string; username: string; email: string; password: string };
  setRegisterForm: (v: { name: string; username: string; email: string; password: string }) => void;
  onLogin: (e: React.FormEvent) => void;
  onRegister: (e: React.FormEvent) => void;
  isLoading?: boolean;
  error?: string;
}

export default function AuthForm({
  authPage,
  setAuthPage,
  loginForm,
  setLoginForm,
  registerForm,
  setRegisterForm,
  onLogin,
  onRegister,
  isLoading = false,
  error = '',
}: AuthFormProps) {
  const inputCls =
    'w-full px-4 py-3 bg-gray-700/60 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all';
  const submitCls =
    'w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-900/50 transition-all transform hover:-translate-y-0.5';
  const labelCls = 'block text-sm font-medium text-gray-300 mb-1.5';

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 flex items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-md bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-700/50">
        {/* Logo + Title */}
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

        {/* Login Form */}
        {authPage === 'login' ? (
          <form onSubmit={onLogin} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}
            <div>
              <label className={labelCls}>Email</label>
              <input
                type="email" value={loginForm.email} required
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className={inputCls} placeholder="Masukkan email Anda"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className={labelCls}>Password</label>
              <input
                type="password" value={loginForm.password} required
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className={inputCls} placeholder="Masukkan password Anda"
                disabled={isLoading}
              />
            </div>
            <button type="submit" className={submitCls} disabled={isLoading}>
              {isLoading ? 'Sedang masuk...' : 'Masuk'}
            </button>
            <p className="text-center text-gray-400 text-sm">
              Belum punya akun?{' '}
              <button type="button" onClick={() => setAuthPage('register')} className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
                Daftar di sini
              </button>
            </p>
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={onRegister} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}
            <div>
              <label className={labelCls}>Nama Lengkap</label>
              <input
                type="text" value={registerForm.name} required
                onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                className={inputCls} placeholder="Nama lengkap Anda"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className={labelCls}>Username</label>
              <input
                type="text" value={registerForm.username} required
                onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                className={inputCls} placeholder="Pilih username"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className={labelCls}>Email</label>
              <input
                type="email" value={registerForm.email} required
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                className={inputCls} placeholder="Email Anda"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className={labelCls}>Password</label>
              <input
                type="password" value={registerForm.password} required
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                className={inputCls} placeholder="Buat password"
                disabled={isLoading}
              />
            </div>
            <button type="submit" className={submitCls} disabled={isLoading}>
              {isLoading ? 'Sedang mendaftar...' : 'Daftar'}
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
