-- ============================================
-- SUPABASE SCHEMA SETUP FOR CASECRAFT STORE
-- ============================================
-- Jalankan script ini di Supabase SQL Editor
-- Path: https://app.supabase.com -> SQL Editor

-- 1. USERS TABLE (Extend Auth dengan info tambahan)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  payment_method TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price BIGINT NOT NULL,
  image TEXT NOT NULL,
  badge TEXT,
  support TEXT,
  stock INT DEFAULT 100,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. SHOPPING CART TABLE
CREATE TABLE IF NOT EXISTS cart_items (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id)
);

-- 4. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending',
  total_amount BIGINT NOT NULL,
  payment_method TEXT,
  delivery_address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES products(id),
  quantity INT NOT NULL,
  price_at_purchase BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================

-- RLS untuk users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- RLS untuk cart_items table
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own cart" ON cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own cart" ON cart_items FOR ALL USING (auth.uid() = user_id);

-- RLS untuk orders table
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own orders" ON orders FOR UPDATE USING (auth.uid() = user_id);

-- Products bisa dilihat semua orang (tidak perlu RLS ketat)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Everyone can view products" ON products FOR SELECT USING (true);

-- ============================================
-- INSERT SAMPLE DATA
-- ============================================

INSERT INTO products (name, description, category, price, image, badge, support, stock) VALUES
('Premium Matte Black Case', 'Casing hitam matte premium dengan bahan anti-fingerprint dan pelindung kamera ekstra tebal.', 'Android', 59000, '/casing-1.jpg', 'New', 'Android Series', 50),
('Velante Sport Magsafe Blue', 'Mendukung Magsafe, desain sporty transparan dengan bumper biru laut yang meredam benturan.', 'iPhone', 89000, '/casing-2.jpg', 'Premium', 'iPhone Series', 40),
('Deep Ocean Apple Silicon Case', 'Silikon lembut khas Apple berwarna deep ocean yang nyaman digenggam dan bagian dalam beludru.', 'iPhone', 79000, '/casing-3.jpg', 'Popular', 'iPhone Series', 45),
('Frosted Smoke Magnetic Case', 'Desain frosted smoke transparan yang elegan dengan ring magnetik kuat untuk aksesoris Magsafe.', 'iPhone', 85000, '/casing-4.jpg', 'Best Seller', 'iPhone Series', 60),
('Wekome Teal Green Magsafe', 'Wekome premium casing dengan warna teal green yang modis dan perlindungan drop-test standar militer.', 'iPhone', 95000, '/casing-5.jpg', 'Magsafe', 'iPhone Series', 35),
('Genuine Leather Navy Shadow', 'Kulit sintetis premium warna navy shadow memberikan kesan mewah, formal, dan eksklusif.', 'iPhone', 149000, '/casing-6.jpg', 'Luxury', 'iPhone Series', 20),
('Aesthetic Jellyfish Clear Case', 'Clear case estetik dengan ilustrasi ubur-ubur laut dalam yang glow dan memberikan kesan tenang.', 'iPhone', 69000, '/casing-7.jpg', 'Aesthetic', 'iPhone Series', 55),
('Pink Hibiscus Beach Vibe Case', 'Desain bertema pantai tropis dengan motif bunga Hibiscus pink yang ceria dan stylish.', 'iPhone', 69000, '/casing-8.jpg', 'Cute', 'iPhone Series', 50),
('Sea Shell Pencil Sketch Case', 'Sketsa pensil estetik bertema kulit kerang laut, sangat cocok untuk pencinta seni minimalis.', 'iPhone', 65000, '/casing-9.jpg', 'Unique', 'iPhone Series', 48),
('Terracotta Premium Matte Case', 'Bahan silikon warna terracotta bumi yang hangat, matte finish, dan sangat presisi di HP Android.', 'Android', 75000, '/casing-10.jpg', 'Premium', 'Android Series', 52),
('Pastel Blue Silicon Premium', 'Silikon premium warna biru pastel lembut, lentur, dan mudah dibersihkan dari noda coretan.', 'iPhone', 79000, '/casing-11.jpg', 'Minimalist', 'iPhone Series', 45),
('Matcha Green Silicon Premium', 'Warna matcha green pastel yang menyehatkan mata, bahan anti-slip dan nyaman untuk gaming.', 'iPhone', 79000, '/casing-12.jpg', 'Trendy', 'iPhone Series', 43),
('Sakura Pink Silicon Premium', 'Warna pink sakura yang anggun dengan tekstur lembut, ramah lingkungan, dan tahan lama.', 'iPhone', 79000, '/casing-13.jpg', 'Soft', 'iPhone Series', 46);
