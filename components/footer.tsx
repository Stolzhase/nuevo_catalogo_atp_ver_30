import Link from "next/link"
import { Phone, Mail, Instagram, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Armonizando tus Platillos</h3>
            <p className="text-sm text-muted-foreground">
              Catálogo de productos 2025. Flores comestibles, brotes y hortalizas para llevar tus platillos al siguiente
              nivel.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/productos" className="text-muted-foreground hover:text-primary transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/colecciones" className="text-muted-foreground hover:text-primary transition-colors">
                  Colecciones
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-muted-foreground hover:text-primary transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+52 1 5560667454</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>maralvaflo@gmail.com</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Síguenos</h3>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Armonizando tus Platillos. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
