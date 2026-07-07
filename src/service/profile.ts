import { supabase } from './supabase'

export async function getProfile(
  userId: string
) {
  const { data, error } =
    await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

  if (error) throw error

  return data
}

export async function updateProfile(
  userId: string,
  values: {
    full_name: string
    phone: string
    address: string
  }
) {
  const { error } =
    await supabase
      .from('profiles')
      .update({
        full_name: values.full_name,
        phone: values.phone,
        address: values.address,
        updated_at:
          new Date().toISOString(),
      })
      .eq('id', userId)

  if (error) throw error

  const {
    error: authError,
  } =
    await supabase.auth.updateUser({
      data: {
        full_name:
          values.full_name,
      },
    })

  if (authError)
    throw authError

  return true
}