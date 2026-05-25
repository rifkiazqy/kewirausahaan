import { supabase } from './auth'

export type CartItem = {
  id: number
  user_id: string
  product_id: number
  quantity: number
  created_at: string
  updated_at: string
  products?: {
    id: number
    name: string
    price: number
    image: string
  }
}

// Get cart items for user
export async function getCartItems(userId: string) {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .select('*, products(id, name, price, image)')
      .eq('user_id', userId)

    if (error) throw error
    return (data as CartItem[]) || []
  } catch (error) {
    console.error('Get cart items error:', error)
    return []
  }
}

// Add item to cart
export async function addToCart(userId: string, productId: number, quantity: number = 1) {
  try {
    // Check if item already in cart
    const { data: existing } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single()

    if (existing) {
      // Update quantity
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: existing.quantity + quantity })
        .eq('id', existing.id)

      if (error) throw error
    } else {
      // Insert new item
      const { error } = await supabase
        .from('cart_items')
        .insert({
          user_id: userId,
          product_id: productId,
          quantity,
        })

      if (error) throw error
    }

    return { success: true }
  } catch (error) {
    console.error('Add to cart error:', error)
    throw error
  }
}

// Update cart item quantity
export async function updateCartItem(cartItemId: number, quantity: number) {
  try {
    if (quantity <= 0) {
      // Remove if quantity is 0
      return removeCartItem(cartItemId)
    }

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', cartItemId)

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Update cart item error:', error)
    throw error
  }
}

// Remove item from cart
export async function removeCartItem(cartItemId: number) {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId)

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Remove cart item error:', error)
    throw error
  }
}

// Clear cart
export async function clearCart(userId: string) {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Clear cart error:', error)
    throw error
  }
}
