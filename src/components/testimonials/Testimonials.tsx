'use client'

import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'

const testimonials = [
  {
    quote:
      'AILURA ne meri engagement ke liye jo nails banaye the unhone poora look elevate kar diya. Har kisi ne specially nails ke baare me poocha.',
    name: 'Priya Sharma',
    role: 'Bride, Delhi',
  },
  {
    quote:
      'Honestly premium quality. Design exactly waise hi mila jaisa consultation me discuss hua tha. Delivery bhi smooth thi.',
    name: 'Ananya Verma',
    role: 'Fashion Creator, Gurugram',
  },
  {
    quote:
      'Main pehli baar press-on nails try kar rahi thi aur experience amazing raha. Fit, finish aur detailing sab top class.',
    name: 'Ritika Arora',
    role: 'Faridabad',
  },
  {
    quote:
      'Wedding season ke liye perfect. Luxury packaging aur handcrafted detailing ne impress kar diya.',
    name: 'Neha Kapoor',
    role: 'Makeup Artist, Delhi',
  },
  {
    quote:
      'Jo design photos me dikha tha usse bhi zyada beautiful reality me laga. Definitely ordering again.',
    name: 'Simran Kaur',
    role: 'Faridabad',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === testimonials.length - 1
          ? 0
          : prev + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      className="
      bg-[#15100B]
      px-4
      py-24

      sm:px-6

      md:px-10
      md:py-32

      lg:px-20
      lg:py-40
    "
    >
      <div className="mx-auto max-w-7xl text-center">

        <div className="mb-8 flex items-center justify-center gap-4">

          <div className="h-[1px] w-12 bg-[#C9A86A]" />

          <p
            className="
            text-[10px]
            uppercase
            tracking-[6px]
            text-[#C9A86A]

            md:text-[11px]
          "
          >
            VOICES OF THE HOUSE
          </p>

          <div className="h-[1px] w-12 bg-[#C9A86A]" />

        </div>

        <h2
          className="
          mx-auto

          max-w-6xl

          font-light

          leading-[1]

          tracking-[-2px]

          text-white

          text-[38px]

          sm:text-[50px]

          md:text-[72px]

          lg:text-[92px]
        "
        >
          Loved by women who notice the details.
        </h2>

        <div className="mt-16 flex justify-center gap-2">

          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={18}
              fill="#C9A86A"
              color="#C9A86A"
            />
          ))}

        </div>

        <div className="mx-auto mt-12 max-w-5xl">

          <p
            className="
            font-light

            italic

            leading-[1.6]

            text-white/90

            text-[15px]

            sm:text-[15px]

            md:text-[25px]

            lg:text-[35px]
          "
          >
            "
            {
              testimonials[current]
                .quote
            }
            "
          </p>

        </div>

        <div className="mt-14">

          <h3
            className="
            text-[24px]

            font-light

            text-[#C9A86A]

            md:text-[30px]
          "
          >
            {
              testimonials[current]
                .name
            }
          </h3>

          <p
            className="
            mt-2

            text-[10px]

            uppercase

            tracking-[4px]

            text-white/40

            md:text-[11px]
          "
          >
            {
              testimonials[current]
                .role
            }
          </p>

        </div>

        <div className="mt-12 flex justify-center gap-3">

          {testimonials.map(
            (_, index) => (
              <button
                key={index}
                onClick={() =>
                  setCurrent(index)
                }
                className={`
                  h-[2px]
                  transition-all

                  ${
                    current === index
                      ? 'w-12 bg-[#C9A86A]'
                      : 'w-6 bg-white/20'
                  }
                `}
              />
            )
          )}

        </div>

      </div>
    </section>
  )
}