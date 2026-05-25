import { supabase } from './auth'

export type Product = {
  id: number
  name: string
  description: string | null
  category: string
  price: number
  image: string
  badge: string | null
  support: string | null
  stock: number
  created_at: string
  updated_at: string
}

// Get all products
export async function getProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Product[]
  } catch (error) {
    console.error('Get products error:', error)
    return []
  }
}

// Get product by ID
export async function getProductById(id: number) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Product
  } catch (error) {
    console.error('Get product error:', error)
    return null
  }
}

// Get products by category
export async function getProductsByCategory(category: string) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Product[]
  } catch (error) {
    console.error('Get products by category error:', error)
    return []
  }
}

// Search products
export async function searchProducts(query: string) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .ilike('name', `%${query}%`)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Product[]
  } catch (error) {
    console.error('Search products error:', error)
    return []
  }
}
