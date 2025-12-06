import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CartModal } from "@/components/cart-modal"
import { Phone, Mail } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <Link href="/" className="text-2xl font-serif font-bold text-primary">
            Armonizando tus Platillos
          </Link>
          <div className="hidden md:flex gap-4 text-xs text-muted-foreground mt-1">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" /> 5215560667454
            </span>
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" /> maralvaflo@gmail.com
            </span>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/productos">
            <Button variant="ghost">Productos</Button>
          </Link>
          <Link href="/colecciones">
            <Button variant="ghost">Colecciones</Button>
          </Link>
          <Link href="/nosotros">
            <Button variant="ghost">Nosotros</Button>
          </Link>
          <Link href="/contacto">
            <Button>Contacto</Button>
          </Link>
          <CartModal inline />
        </nav>
      </div>
    </header>
  )
}
