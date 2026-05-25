import { supabase } from './auth'
import { clearCart } from './cart'

export type Order = {
  id: number
  user_id: string
  status: string
  total_amount: number
  payment_method: string | null
  delivery_address: string | null
  created_at: string
  updated_at: string
}

export type OrderItem = {
  id: number
  order_id: number
  product_id: number
  quantity: number
  price_at_purchase: number
  created_at: string
}

// Get orders for user
export async function getOrders(userId: string) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data as Order[]) || []
  } catch (error) {
    console.error('Get orders error:', error)
    return []
  }
}

// Get order details with items
export async function getOrderDetails(orderId: number) {
  try {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (orderError) throw orderError

    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .select('*, products(name, image)')
      .eq('order_id', orderId)

    if (itemsError) throw itemsError

    return { order, items }
  } catch (error) {
    console.error('Get order details error:', error)
    return null
  }
}

// Create order from cart
export async function createOrder(
  userId: string,
  cartItems: any[],
  paymentMethod: string,
  deliveryAddress: string
) {
  try {
    // Calculate total
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.products.price * item.quantity,
      0
    )

    // Create order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        status: 'pending',
        total_amount: totalAmount,
        payment_method: paymentMethod,
        delivery_address: deliveryAddress,
      })
      .select()
      .single()

    if (orderError) throw orderError

    // Create order items
    const orderItems = cartItems.map((item) => ({
      order_id: orderData.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price_at_purchase: item.products.price,
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) throw itemsError

    // Clear cart
    await clearCart(userId)

    return { success: true, order: orderData }
  } catch (error) {
    console.error('Create order error:', error)
    throw error
  }
}

// Update order status
export async function updateOrderStatus(orderId: number, status: string) {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Update order status error:', error)
    throw error
  }
}
