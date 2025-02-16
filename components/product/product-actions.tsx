"use client";

import { useGlobal } from "@/lib";
import { updateCart } from "@/lib/data";
import { useCart } from "@/lib/hooks";
import { ApiProduct, ApiProductVariant } from "@/types";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Input } from "../form/input";
import { Label } from "../form/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../form/select";
import { Button } from "../ui/button";
import { ColourButton } from "../ui/colour-button";
import { Text } from "../ui/text";
import { toast } from "../ui/toast/use-toast";

export function ProductActions({
  product,
  variant,
}: {
  product: ApiProduct;
  variant: ApiProductVariant;
}) {
  const [quantity, setQuantity] = useState(1);
  const { setOpenCart } = useGlobal();
  const { cart, setCart } = useCart();
  const params = useParams();
  const router = useRouter();

  const push = (path: string) => {
    router.push(
      `/${params.department}/${params.subDepartment}/${params.product}/${encodeURIComponent(path.toLowerCase())}`
    );
  };

  const findVariant = useCallback(
    (size: string, colour: string) => {
      return product.variants.find(
        (v) => v.size === size && v.colour.map((c) => c.name).join("/") === colour
      );
    },
    [product.variants]
  );

  const handleSizeChange = (value: string) => {
    const newVariant = findVariant(value, variant.colour.map((c) => c.name).join("/"));

    if (newVariant?.name) {
      push(newVariant.name);
    }
  };

  const handleColourChange = (value: string) => {
    const newVariant = findVariant(variant.size, value);

    if (newVariant?.name) {
      push(newVariant.name);
    }
  };

  const itemInCart = cart?.lineItems?.find(
    (item) => item.productVariant?.documentId === variant.documentId
  );
  const addToCart = async () =>
    await updateCart({
      variantId: variant.documentId,
      // if the item is already in the cart, add the quantity to the existing quantity
      quantity: itemInCart ? itemInCart.quantity + quantity : quantity,
    })
      .then((res) => {
        if (res.documentId) {
          setCart(res);
          setOpenCart(true);
        }
      })
      .catch((error) => {
        toast({
          title: "Error adding item to cart",
          description: error.message,
          variant: "destructive",
        });
      });

  return (
    <>
      <div className="flex gap-2 flex-col max-w-md">
        <Label>Size</Label>
        <Select onValueChange={handleSizeChange} value={variant?.size}>
          <SelectTrigger>
            <SelectValue placeholder="Select a size" />
          </SelectTrigger>

          <SelectContent>
            {product.variants
              .reduce((acc, v) => {
                if (!acc.includes(v.size)) {
                  acc.push(v.size);
                }

                return acc;
              }, [] as string[])
              .map((v) => (
                <SelectItem
                  value={v}
                  key={v}
                  disabled={!findVariant(v, variant.colour.map((c) => c.name).join("/"))}
                >
                  {v}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 flex-col max-w-md">
        <Label>Colour</Label>
        <Select
          onValueChange={handleColourChange}
          value={variant?.colour.map((c) => c.name).join("/")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a colour" />
          </SelectTrigger>

          <SelectContent>
            {product.variants
              .reduce((acc, v) => {
                if (!acc.includes(v.colour.map((c) => c.name).join("/"))) {
                  acc.push(v.colour.map((c) => c.name).join("/"));
                }

                return acc;
              }, [] as string[])
              .map((v) => {
                const currentVariant = findVariant(variant.size, v) || variant;

                return (
                  <SelectItem value={v} key={v} disabled={!currentVariant}>
                    <div className="flex items-center gap-3">
                      <ColourButton
                        colour={v}
                        colourGroups={currentVariant?.colour.map((c) => c.colourGroup.name)}
                        tooltip={false}
                      />

                      <span>{v}</span>
                    </div>
                  </SelectItem>
                );
              })}
          </SelectContent>
        </Select>
      </div>

      <Text element="span" className="text-sm text-muted-foreground">
        {variant.stock} left in stock{" "}
        {variant.stock <= 2 && <span className="text-destructive font-medium">- Order soon!</span>}
      </Text>

      <div className="flex gap-3">
        <div className="relative flex items-center">
          <Button
            variant="outline"
            disabled={quantity <= 1}
            onClick={() => setQuantity(quantity - 1)}
            className="size-10 absolute left-1 p-0 bg-background"
          >
            <IconMinus size={"1.25rem"} />
          </Button>

          <Input
            type="number"
            className="h-12 w-40 rounded-full text-center flex justify-center"
            onChange={(e) => setQuantity(Number(e.target.value))}
            value={quantity}
          />

          <Button
            variant="outline"
            disabled={variant.stock <= quantity}
            onClick={() => setQuantity(quantity + 1)}
            className="size-10 absolute right-1 p-0 bg-background"
          >
            <IconPlus size={"1.25rem"} />
          </Button>
        </div>

        <Button size="lg" disabled={variant.stock < quantity} onClick={addToCart}>
          Add to cart
        </Button>
      </div>
    </>
  );
}
