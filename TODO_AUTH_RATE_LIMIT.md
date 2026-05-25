# TODO - Tangani Supabase Auth error: email rate limit exceeded

## 1) Analisis penyebab
- [x] Cek alur register: `src/app/page.tsx` -> `handleRegister` -> `src/utils/supabase/auth.ts` -> `supabase.auth.signUp`
- [x] Konfirmasi UI sudah pakai `disabled={isLoading}` pada tombol submit di `src/components/AuthForm.tsx`

## 2) Mitigasi cepat (tanpa code change)
- [ ] Tunggu cooldown (beberapa menit sampai rate limit hilang)
- [ ] Gunakan email baru untuk testing (jangan email yang sama)

## 3) Perbaikan code (disarankan)
- [ ] Tambahkan guard di `handleRegister`: jika `isAuthLoading` true, return agar tidak submit ganda
- [ ] Pastikan di UI tidak ada pemicu submit ganda (opsional: debounce/throttle)

## 4) Testing
- [ ] Jalankan dev server
- [ ] Coba register sekali saja dan pastikan tidak terjadi double request


