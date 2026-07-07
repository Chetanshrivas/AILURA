'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'How long do AILURA press-on nails last?',
    answer:
      'Our luxury press-on nail collections typically last 7–14 days with proper application and care. Every order includes detailed application instructions for maximum wear.',
  },
  {
    question: 'Do you offer custom nail designs?',
    answer:
      'Yes. We create bespoke nail sets tailored to your style, event, outfit, and personal preferences. Custom orders may require additional processing time.',
  },
  {
    question: 'How long does shipping take?',
    answer:
      'Orders are handcrafted and usually dispatched within 2–5 business days. Delivery times vary based on your location.',
  },
  {
    question: 'Can I reuse my nail set?',
    answer:
      'Absolutely. With proper removal and storage, most of our premium nail sets can be reused multiple times.',
  },
  {
    question: 'Do you ship across India?',
    answer:
      'Yes. We offer secure tracked shipping throughout India. Shipping details are provided once your order is dispatched.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (index: number) => {
    setOpenIndex(
      openIndex === index
        ? -1
        : index
    )
  }

  return (
    <section
      className="
      bg-[#F8F5F0]
      px-4
      py-20

      sm:px-6

      md:px-10
      md:py-28

      lg:px-20
      lg:py-36
    "
    >
      <div
        className="
        mx-auto
        max-w-7xl

        grid
        gap-16

        lg:grid-cols-[380px_1fr]
        lg:gap-24
      "
      >
        {/* Left Side */}

        <div>

          <div className="mb-8 flex items-center gap-4">

            <div className="h-[1px] w-12 bg-[#C9A86A]" />

            <span
              className="
              text-[10px]

              uppercase

              tracking-[6px]

              text-[#C9A86A]

              md:text-[11px]
            "
            >
              FAQ
            </span>

            <div className="h-[1px] w-12 bg-[#C9A86A]" />

          </div>

          <h2
  className="
    font-light
    leading-[0.9]
    tracking-[-2px]
    text-[#16110C]
    text-[52px]
    sm:text-[68px]
    md:text-[88px]
  "
>
  Quietly,
  <br className="hidden sm:block" />
  <span className="sm:hidden"> </span>
  answered.
</h2>
          <p
            className="
            mt-8

            max-w-[260px]

            text-[9px]
            sm:text-[15px]

            leading-[1.9]

            text-black/45
          "
          >
            Everything you'd want to know before placing your order.
          </p>

        </div>

        {/* Right Side */}

        <div>

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="
              border-t

              border-black/10
            "
            >

              <button
                onClick={() =>
                  toggle(index)
                }
                className="
                flex

                w-full

                items-center

                justify-between

                gap-6

                py-6

                text-left

                md:py-8
              "
              >

                <h3
                  className={`
                  font-light

                  leading-[1.3]

                  transition-colors

                  text-[22px]

                  md:text-[32px]

                  ${
                    openIndex ===
                    index
                      ? 'text-[#C9A86A]'
                      : 'text-[#16110C]'
                  }
                `}
                >
                  {faq.question}
                </h3>

                <div
                  className={`
                  flex

                  h-12
                  w-12

                  shrink-0

                  items-center
                  justify-center

                  border

                  transition-all

                  ${
                    openIndex ===
                    index
                      ? 'border-[#C9A86A] text-[#C9A86A]'
                      : 'border-black/15 text-black/70'
                  }
                `}
                >
                  {openIndex ===
                  index
                    ? '−'
                    : '+'}
                </div>

              </button>

              <div
                className={`
                overflow-hidden

                transition-all

                duration-300

                ${
                  openIndex ===
                  index
                    ? 'max-h-40 pb-8 opacity-100'
                    : 'max-h-0 opacity-0'
                }
              `}
              >
                <p
                  className="
                  max-w-3xl

                  pr-4

                  text-[15px]

                  leading-[2]

                  text-black/55
                "
                >
                  {faq.answer}
                </p>
              </div>

            </div>

          ))}

          <div className="border-t border-black/10" />

        </div>

      </div>
    </section>
  )
}