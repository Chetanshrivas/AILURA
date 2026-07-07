import {
  getProductBySlug,
  getProducts,
} from '../../../service/products'

import Navbar from '../../../components/layout/Navbar'
import Footer from '../../../components/layout/Footer'

import { notFound } from 'next/navigation'

import Link from 'next/link'

import ProductDetailsClient from '../../../components/products/ProductDetailsClient'

export default async function ProductPage({
  params,
}: {
  params: Promise<{
    slug: string
  }>
}) {

  const { slug } = await params

  const product =
    await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const allProducts =
    await getProducts()

  const relatedProducts =
    allProducts
      ?.filter(
        (item) =>
          item.category ===
            product.category &&
          item.slug !==
            product.slug
      )
      .slice(0, 4)

  return (

    <>

    <Navbar />

    <main
      className="
      min-h-screen

      bg-[#F8F5F0]

      px-4
      py-24

      md:px-8

      lg:px-20
      lg:py-28
    "
    >

      {/* Product Details */}

      <ProductDetailsClient
        product={product}
      />

      {/* Related Products */}

      {relatedProducts?.length >
        0 && (

        <section className="mt-16 md:mt-32 border-t border-black/10 pt-12 md:pt-20">

          <div className="mb-16">

            <p
              className="
              text-[11px]

              uppercase

              tracking-[5px]

              text-[#C9A86A]
            "
            >
              You May Also Like
            </p>

            <h2
              className="
              mt-4

              text-[42px]

              leading-none

              md:text-[70px]
            "
            >
              Related Products
            </h2>

          </div>

          <div
            className="
            grid

            grid-cols-2

            gap-5

            md:grid-cols-4

            md:gap-8
          "
          >

            {relatedProducts.map(
              (item) => (

                <Link
                  key={item.slug}
                  href={`/product/${item.slug}`}
                  className="
                  group
                "
                >

                  <div
                    className="
                    overflow-hidden

                    bg-white
                  "
                  >

                    <img
                      src={
                        item.image_urls?.[0]
                      }
                      alt={item.title}
                      className="
                      aspect-[4/5]

                      w-full

                      object-cover

                      transition-all

                      duration-700

                      group-hover:scale-110
                    "
                    />

                  </div>

                  <div className="mt-4">

                    <p
                      className="
                      text-[10px]

                      uppercase

                      tracking-[3px]

                      text-black/40
                    "
                    >
                      {item.category}
                    </p>

                    <h3
                      className="
                      mt-2

                      text-[16px]

                      md:text-[22px]

                      font-light
                    "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                      mt-2

                      text-lg
                    "
                    >
                      ₹{item.price}
                    </p>

                  </div>

                </Link>

              )
            )}

          </div>

        </section>

      )}

    </main>


<Footer />

    </>

  )

}