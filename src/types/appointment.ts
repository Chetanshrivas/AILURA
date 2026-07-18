export interface Appointment {

  id: number

  full_name: string

  phone: string

  email: string

  service?: string          // legacy field — purani appointments ke liye

  services?: string[]       // naya field — naye Contact form se aane wale multiple services

  appointment_date: string

  appointment_time: string

  notes: string

  status: string

  created_at: string

}