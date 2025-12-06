import { notFound } from "next/navigation"
import Image from "next/image"
import { products } from "@/lib/products-data"
import { WhatsAppOrder } from "@/components/whatsapp-order"
import { Badge } from "@/components/ui/badge"

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.id,
  }))
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = products.find((p) => p.id === slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted">
          <Image src={product.image || "/pozole.jpg"} alt={product.name} fill className="object-cover" priority />
        </div>
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <Badge variant="secondary" className="mb-4">
              {product.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2 text-primary">{product.name}</h1>
            <p className="text-2xl font-medium text-muted-foreground">${product.price} MXN</p>
          </div>

          <div className="prose prose-stone max-w-none text-muted-foreground">
            <p className="text-lg leading-relaxed">{product.description}</p>
            {product.usage && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold text-foreground mb-1">Usos sugeridos:</h3>
                <p>{product.usage}</p>
              </div>
            )}
            {product.flavorProfile && (
              <div className="mt-2">
                <h3 className="font-semibold text-foreground inline">Perfil: </h3>
                <span>{product.flavorProfile}</span>
              </div>
            )}
          </div>

          <div className="pt-6 border-t">
            <WhatsAppOrder productName={product.name} />
          </div>
        </div>
      </div>
    </div>
  )
}
