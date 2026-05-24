// Shared types used across all components
export type AuthPage   = 'login' | 'register';
export type ActivePage = 'beranda' | 'produk' | 'profil';

export type User = {
  name: string;
  username: string;
  password: string;
  address: string;
  paymentMethod: string;
};

export type CartItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  priceText: string;
  image: string;
  badge: string;
  support: string;
  description: string;
  quantity: number;
};

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  priceText: string;
  image: string;
  badge: string;
  support: string;
  description: string;
};

export const PAYMENT_OPTIONS = [
  'Transfer Bank BCA/Mandiri',
  'GoPay',
  'OVO',
  'Dana',
  'COD (Bayar di Tempat)',
];

export const productsData: Product[] = [
  { id: 1,  name: 'Premium Matte Black Case',      description: 'Casing hitam matte premium dengan bahan anti-fingerprint dan pelindung kamera ekstra tebal.',          category: 'Android', price: 59000,  priceText: 'Rp 59.000',  image: '/casing-1.jpg',  badge: 'New',         support: 'Android Series' },
  { id: 2,  name: 'Velante Sport Magsafe Blue',     description: 'Mendukung Magsafe, desain sporty transparan dengan bumper biru laut yang meredam benturan.',            category: 'iPhone',  price: 89000,  priceText: 'Rp 89.000',  image: '/casing-2.jpg',  badge: 'Premium',     support: 'iPhone Series'  },
  { id: 3,  name: 'Deep Ocean Apple Silicon Case',  description: 'Silikon lembut khas Apple berwarna deep ocean yang nyaman digenggam dan bagian dalam beludru.',         category: 'iPhone',  price: 79000,  priceText: 'Rp 79.000',  image: '/casing-3.jpg',  badge: 'Popular',     support: 'iPhone Series'  },
  { id: 4,  name: 'Frosted Smoke Magnetic Case',    description: 'Desain frosted smoke transparan yang elegan dengan ring magnetik kuat untuk aksesoris Magsafe.',         category: 'iPhone',  price: 85000,  priceText: 'Rp 85.000',  image: '/casing-4.jpg',  badge: 'Best Seller', support: 'iPhone Series'  },
  { id: 5,  name: 'Wekome Teal Green Magsafe',      description: 'Wekome premium casing dengan warna teal green yang modis dan perlindungan drop-test standar militer.',   category: 'iPhone',  price: 95000,  priceText: 'Rp 95.000',  image: '/casing-5.jpg',  badge: 'Magsafe',     support: 'iPhone Series'  },
  { id: 6,  name: 'Genuine Leather Navy Shadow',    description: 'Kulit sintetis premium warna navy shadow memberikan kesan mewah, formal, dan eksklusif.',                category: 'iPhone',  price: 149000, priceText: 'Rp 149.000', image: '/casing-6.jpg',  badge: 'Luxury',      support: 'iPhone Series'  },
  { id: 7,  name: 'Aesthetic Jellyfish Clear Case', description: 'Clear case estetik dengan ilustrasi ubur-ubur laut dalam yang glow dan memberikan kesan tenang.',        category: 'iPhone',  price: 69000,  priceText: 'Rp 69.000',  image: '/casing-7.jpg',  badge: 'Aesthetic',   support: 'iPhone Series'  },
  { id: 8,  name: 'Pink Hibiscus Beach Vibe Case',  description: 'Desain bertema pantai tropis dengan motif bunga Hibiscus pink yang ceria dan stylish.',                  category: 'iPhone',  price: 69000,  priceText: 'Rp 69.000',  image: '/casing-8.jpg',  badge: 'Cute',        support: 'iPhone Series'  },
  { id: 9,  name: 'Sea Shell Pencil Sketch Case',   description: 'Sketsa pensil estetik bertema kulit kerang laut, sangat cocok untuk pencinta seni minimalis.',           category: 'iPhone',  price: 65000,  priceText: 'Rp 65.000',  image: '/casing-9.jpg',  badge: 'Unique',      support: 'iPhone Series'  },
  { id: 10, name: 'Terracotta Premium Matte Case',  description: 'Bahan silikon warna terracotta bumi yang hangat, matte finish, dan sangat presisi di HP Android.',       category: 'Android', price: 75000,  priceText: 'Rp 75.000',  image: '/casing-10.jpg', badge: 'Premium',     support: 'Android Series' },
  { id: 11, name: 'Pastel Blue Silicon Premium',    description: 'Silikon premium warna biru pastel lembut, lentur, dan mudah dibersihkan dari noda coretan.',             category: 'iPhone',  price: 79000,  priceText: 'Rp 79.000',  image: '/casing-11.jpg', badge: 'Minimalist',  support: 'iPhone Series'  },
  { id: 12, name: 'Matcha Green Silicon Premium',   description: 'Warna matcha green pastel yang menyehatkan mata, bahan anti-slip dan nyaman untuk gaming.',              category: 'iPhone',  price: 79000,  priceText: 'Rp 79.000',  image: '/casing-12.jpg', badge: 'Trendy',      support: 'iPhone Series'  },
  { id: 13, name: 'Sakura Pink Silicon Premium',    description: 'Warna pink sakura yang anggun dengan tekstur lembut, ramah lingkungan, dan tahan lama.',                 category: 'iPhone',  price: 79000,  priceText: 'Rp 79.000',  image: '/casing-13.jpg', badge: 'Soft',        support: 'iPhone Series'  },
];
