// Types untuk database
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string
          full_name: string
          address: string | null
          phone: string | null
          payment_method: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          username: string
          full_name: string
          address?: string | null
          phone?: string | null
          payment_method?: string | null
        }
        Update: {
          username?: string
          full_name?: string
          address?: string | null
          phone?: string | null
          payment_method?: string | null
        }
      }
      products: {
        Row: {
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
      }
      cart_items: {
        Row: {
          id: number
          user_id: string
          product_id: number
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          product_id: number
          quantity?: number
        }
        Update: {
          quantity?: number
        }
      }
      orders: {
        Row: {
          id: number
          user_id: string
          status: string
          total_amount: number
          payment_method: string | null
          delivery_address: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          status?: string
          total_amount: number
          payment_method?: string | null
          delivery_address?: string | null
        }
      }
      order_items: {
        Row: {
          id: number
          order_id: number
          product_id: number
          quantity: number
          price_at_purchase: number
          created_at: string
        }
      }
    }
  }
}
