"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { Product } from "@/lib/products-data"
import { useCart } from "@/hooks/use-cart"

interface CartButtonProps {
  product: Product
  className?: string
}

export function CartButton({ product, className }: CartButtonProps) {
  const [quantity, setQuantity] = useState<number>(1)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setQuantity(1) // Reset para siguiente producto
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="space-y-2">
        <label className="text-sm font-medium">Cantidad:</label>
        <div className="flex gap-2 items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            −
          </Button>
          <span className="w-8 text-center font-semibold">
            {quantity}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </Button>
          <span className="text-xs text-muted-foreground ml-2">
            {product.unitOfMeasure}
          </span>
        </div>
      </div>
      <Button
        onClick={handleAddToCart}
        className="w-full gap-2"
        size="lg"
      >
        <ShoppingCart className="h-5 w-5" />
        Agregar al carrito
      </Button>
    </div>
  )
}
