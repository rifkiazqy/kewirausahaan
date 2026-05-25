import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)

// ============================================
// AUTH FUNCTIONS
// ============================================

export async function registerUser(
  username: string,
  email: string,
  password: string,
  fullName: string
) {
  try {
    // 1. Register dengan auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) throw authError
    if (!authData.user) throw new Error('Registration failed')

    // 2. Create user profile
    const { error: profileError } = await supabase.from('users').insert({
      id: authData.user.id,
      username,
      full_name: fullName,
    })

    if (profileError) throw profileError

    return { success: true, user: authData.user }
  } catch (error) {
    console.error('Register error:', error)
    throw error
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    if (!data.user) throw new Error('Login failed')

    // Get user profile
    const { data: userProfile } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single()

    return { success: true, user: data.user, profile: userProfile }
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

export async function logoutUser() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Logout error:', error)
    throw error
  }
}

export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser()
    if (error) {
      // Auth session missing adalah normal saat belum login
      if (error.message.includes('Auth session missing')) {
        return null
      }
      throw error
    }
    return data.user
  } catch (error: any) {
    // Silently return null jika ada error (session missing adalah expected)
    return null
  }
}

export async function updateUserProfile(
  userId: string,
  updates: {
    full_name?: string
    address?: string
    phone?: string
    payment_method?: string
  }
) {
  try {
    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Update profile error:', error)
    throw error
  }
}
