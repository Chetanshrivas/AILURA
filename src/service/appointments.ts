import { supabase } from './supabase'

export async function getAppointments() {

  const { data, error } =
    await supabase
      .from('appointments')
      .select('*')
      .order(
        'appointment_date',
        {
          ascending: false,
        }
      )

  if (error)
    throw error

  return data

}


export async function updateAppointmentStatus(
  id: number,
  status: string
) {

  const { error } =
    await supabase
      .from('appointments')
      .update({
        status,
      })
      .eq('id', id)

  if (error)
    throw error

}

export async function getMyAppointments(
  userId: string
) {

  const { data, error } =
    await supabase
      .from('appointments')
      .select('*')
      .eq(
        'user_id',
        userId
      )
      .order(
        'appointment_date',
        {
          ascending: false,
        }
      )

  if (error)
    throw error

  return data
}

export async function getAppointmentById(
  id: number
) {

  const { data, error } =
    await supabase
      .from('appointments')
      .select('*')
      .eq('id', id)
      .maybeSingle()

  if (error)
    throw error

  return data
}