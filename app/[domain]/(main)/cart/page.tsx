import { ProductCarouselBlock } from "@/components/block-render/product-carousel-block";
import { CartPage } from "@/components/cart/cart-page";
import { Transition } from "@/components/layout/transition";
import { getCart, getSite } from "@/lib/server";

export default async function Cart(props: { params: Promise<{ domain: string }> }) {
  const { domain } = await props.params;

  const site = await getSite(domain, {
    populate: {
      category: true,
    },
  });
  const cart = await getCart();

  return (
    <>
      <Transition
        transitionName="fadeInUp"
        className="flex justify-center w-full px-4 lg:px-8 pt-8 lg:pt-16"
      >
        <CartPage />
      </Transition>

      <Transition transitionName="fadeInUp" waitForInView>
        <ProductCarouselBlock
          onSaleOnly={false}
          rows={1}
          title="You may also like"
          categories={
            cart?.lineItems
              ?.flatMap((item) => item.productVariant.product.categories)
              .map((cat) => cat) ?? []
          }
          limit={15}
          site={site}
        />
      </Transition>
    </>
  );
}
