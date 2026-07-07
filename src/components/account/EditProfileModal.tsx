'use client'

import { useEffect, useState } from 'react'
import { X, User, Phone, MapPin, Save } from 'lucide-react'
import { toast } from 'sonner'
import {
  getProfile,
  updateProfile,
} from '../../service/profile'

interface Props {
  userId: string
  open: boolean
  onClose: () => void
  onUpdated: () => void
}

export default function EditProfileModal({
  userId,
  open,
  onClose,
  onUpdated,
}: Props) {
  const [loading, setLoading] =
    useState(false)

  const [fullName, setFullName] =
    useState('')

  const [phone, setPhone] =
    useState('')

  const [address, setAddress] =
    useState('')

  useEffect(() => {
    if (!open) return

    const loadProfile =
      async () => {
        try {
          const profile =
            await getProfile(userId)

          setFullName(
            profile?.full_name || ''
          )

          setPhone(
            profile?.phone || ''
          )

          setAddress(
            profile?.address || ''
          )
        } catch (error) {
          console.log(error)
        }
      }

    loadProfile()
  }, [open, userId])

  const handleSave =
    async () => {
      try {
        setLoading(true)

        await updateProfile(
          userId,
          {
            full_name: fullName,
            phone,
            address,
          }
        )

        toast.success(
          'Profile updated successfully'
        )

        onUpdated()
        onClose()
      } catch (error) {
        console.log(error)

        toast.error(
          'Failed to update profile'
        )
      } finally {
        setLoading(false)
      }
    }

  if (!open) return null

  return (
    <div
      className="
      fixed inset-0 z-[100]
      flex items-center justify-center
      bg-black/50
      p-4
    "
    >
      <div
        className="
        w-full
        max-w-2xl
        border
        border-[#E8DED3]
        bg-white
        shadow-2xl
      "
      >
        <div
          className="
          flex items-center justify-between
          border-b
          border-black/10
          p-6
        "
        >
          <div>
            <p
              className="
              text-[10px]
              uppercase
              tracking-[4px]
              text-[#C9A86A]
            "
            >
              AILURA PROFILE
            </p>

            <h2
              className="
              mt-2
              text-3xl
              font-light
            "
            >
              Edit Profile
            </h2>
          </div>

          <button
            onClick={onClose}
            className="
            flex h-10 w-10
            items-center justify-center
            rounded-full
            border
            border-black/10
          "
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-6 p-6">

          <div>
            <label
              className="
              mb-3 block
              text-[10px]
              uppercase
              tracking-[4px]
              text-[#C9A86A]
            "
            >
              Full Name
            </label>

            <div
              className="
              flex items-center gap-3
              border border-black/10
              px-4 py-3
            "
            >
              <User size={18} />

              <input
                value={fullName}
                onChange={(e) =>
                  setFullName(
                    e.target.value
                  )
                }
                className="
                w-full
                outline-none
              "
              />
            </div>
          </div>

          <div>
            <label
              className="
              mb-3 block
              text-[10px]
              uppercase
              tracking-[4px]
              text-[#C9A86A]
            "
            >
              Phone Number
            </label>

            <div
              className="
              flex items-center gap-3
              border border-black/10
              px-4 py-3
            "
            >
              <Phone size={18} />

              <input
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
                className="
                w-full
                outline-none
              "
              />
            </div>
          </div>

          <div>
            <label
              className="
              mb-3 block
              text-[10px]
              uppercase
              tracking-[4px]
              text-[#C9A86A]
            "
            >
              Address
            </label>

            <div
              className="
              flex gap-3
              border border-black/10
              px-4 py-3
            "
            >
              <MapPin
                size={18}
                className="mt-1"
              />

              <textarea
                rows={4}
                value={address}
                onChange={(e) =>
                  setAddress(
                    e.target.value
                  )
                }
                className="
                w-full
                resize-none
                outline-none
              "
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="
            flex h-12 w-full
            items-center justify-center
            gap-2
            bg-black
            text-[11px]
            uppercase
            tracking-[4px]
            text-white
            transition-all
            hover:bg-[#C9A86A]
          "
          >
            <Save size={15} />

            {loading
              ? 'Saving...'
              : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}