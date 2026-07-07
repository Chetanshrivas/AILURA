'use client'

import {
  useEffect,
  useState,
} from 'react'

import AppointmentStats
from '../../../components/admin/appointments/AppointmentStats'

import AppointmentSearchBar
from '../../../components/admin/appointments/AppointmentSearchBar'

import AppointmentsTable
from '../../../components/admin/appointments/AppointmentsTable'

import AppointmentDetailsModal
from '../../../components/admin/appointments/AppointmentDetailsModal'

import {
  getAppointments,
} from '../../../service/appointments'

export default function AppointmentsPage() {

  const [appointments, setAppointments] =
    useState<any[]>([])

  const [search, setSearch] =
    useState('')

  const [selectedAppointment, setSelectedAppointment] =
    useState<any>(null)

  const [modalOpen, setModalOpen] =
    useState(false)

  async function loadAppointments() {

    try {

      const data =
        await getAppointments()

      setAppointments(
        data || []
      )

    } catch (error) {

      console.error(error)

    }

  }

  useEffect(() => {

    loadAppointments()

  }, [])

  return (

    <div className="space-y-8">

      <AppointmentStats
        appointments={
          appointments
        }
      />

      <AppointmentSearchBar
        search={search}
        setSearch={
          setSearch
        }
      />

      <AppointmentsTable
        appointments={
          appointments
        }
        search={search}
        onView={(
          appointment
        ) => {

          setSelectedAppointment(
            appointment
          )

          setModalOpen(true)

        }}
      />

      <AppointmentDetailsModal
        open={modalOpen}
        appointment={
          selectedAppointment
        }
        refreshAppointments={
          loadAppointments
        }
        onClose={() => {

          setModalOpen(false)

          setSelectedAppointment(
            null
          )

        }}
      />

    </div>

  )

}