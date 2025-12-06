"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CartButton } from "@/components/cart-button"
import type { Product } from "@/lib/products-data"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">{product.category}</span>
          <span className="text-xl font-bold text-primary">
            ${product.price}
            <span className="text-sm font-normal text-muted-foreground ml-1">
              / {product.unitOfMeasure}
            </span>
          </span>
        </div>
        <h3 className="mb-2 text-lg font-serif font-bold leading-tight">{product.name}</h3>
        <p className="mb-4 line-clamp-2 flex-1 text-sm text-muted-foreground">{product.description}</p>
        <Link href={`/productos/${product.id}`} className="w-full mb-3">
          <Button className="w-full bg-transparent" variant="outline">
            Ver Detalles
          </Button>
        </Link>
        <CartButton product={product} />
      </div>
    </Card>
  )
}
