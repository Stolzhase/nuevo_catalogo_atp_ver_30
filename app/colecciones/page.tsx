import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { products, Product } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"
import { ArrowRight } from "lucide-react"
import { getSeasonTheme, SEASON_THEMES } from "@/lib/season-themes"

// Función para filtrar los productos de la temporada actual
const filterSeasonalProducts = (allProducts: Product[], season: string): Product[] => {
  const cleanProducts = allProducts.filter(p => !!p) 
  const seasonal = cleanProducts.filter(product => product.collection === season);
  
  if (seasonal.length < 4) {
    const allYear = cleanProducts.filter(product => product.collection === "Todo el año");
    return [...seasonal, ...allYear].slice(0, 4);
  }
  
  return seasonal.slice(0, 4);
};


export default function ColeccionesPage() {
  const CURRENT_SEASON = "Invierno";
  const theme = getSeasonTheme(CURRENT_SEASON);
  const IconComponent = theme.icon;
  
  const seasonalProducts = filterSeasonalProducts(products, CURRENT_SEASON);
  const chefsChoice = products.slice(5, 9); 

  return (
    <div className="container mx-auto py-12 px-4 space-y-20">
      {/* Hero Section */}
      <section className={`relative rounded-3xl overflow-hidden ${theme.bgColor} text-primary-foreground min-h-[400px] flex items-center border-2 ${theme.accentColor}/20`}>
        <div className="absolute inset-0 bg-[url('/hortalizas2.jpg?height=800&width=1200')] bg-cover bg-center opacity-10" />
        <div className={`absolute inset-0 bg-gradient-to-r from-black/40 to-transparent`} />
        <div className="relative z-10 container mx-auto px-6 md:px-12 py-12">
          <div className="max-w-2xl space-y-6">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${theme.accentColor} text-white text-sm font-medium`}>
              <IconComponent className="w-5 h-5" />
              <span>{theme.emoji} Colección de {CURRENT_SEASON} 2025</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground">{theme.description}</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-[600px]">
              Una selección curada de nuestras flores y brotes más frescos, perfectos para los menús vibrantes de esta
              estación.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/productos?temporada=${CURRENT_SEASON.toLowerCase()}`} passHref>
                <Button size="lg" className={`${theme.accentColor} hover:opacity-90 text-white border-none`}>
                  Ver Colección
                </Button>
              </Link>
              
              <a 
                href="/catalogo/Catálogo_Productos_ATP_2026_5.pdf" 
                download="Catálogo de Productos - Armonizando tus Platillos 2026.pdf"
                aria-label="Descargar catálogo de productos"
              >
                <Button size="lg" variant="outline" className={`${theme.color} border-2 hover:${theme.bgColor}`}>
                  Descargar Catálogo
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Grid */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold tracking-tight">Favoritos de la Estación</h2>
            <p className="text-muted-foreground text-lg">Lo que nuestros clientes están amando en este momento.</p>
          </div>
          <Link href="/productos" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
            Ver todo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasonalProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* All Seasons Grid */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold tracking-tight">Todas las Colecciones</h2>
          <p className="text-muted-foreground text-lg">Explora lo que ofrecemos en cada estación del año.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(SEASON_THEMES)
            .filter(t => t.name !== 'Todo el año')
            .map((seasonTheme) => {
              const SeasonIcon = seasonTheme.icon;
              const seasonProducts = filterSeasonalProducts(products, seasonTheme.name);
              return (
                <Link key={seasonTheme.name} href={`/productos?temporada=${seasonTheme.name.toLowerCase()}`}>
                  <div className={`group relative overflow-hidden rounded-2xl ${seasonTheme.bgColor} p-6 aspect-[3/2] flex flex-col justify-between cursor-pointer border-2 border-transparent hover:border-current transition-all`}>
                    <div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${seasonTheme.accentColor}/10 mb-4`}>
                        <SeasonIcon className={`w-4 h-4 ${seasonTheme.color}`} />
                        <span className={`text-sm font-medium ${seasonTheme.color}`}>{seasonTheme.emoji}</span>
                      </div>
                      <h3 className={`text-2xl font-bold ${seasonTheme.color}`}>{seasonTheme.name}</h3>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-3">{seasonProducts.length} productos</p>
                      <Button variant="outline" size="sm" className={`${seasonTheme.color} border-current`}>
                        Explorar <ArrowRight className="w-3 h-3 ml-2" />
                      </Button>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </section>

      {/* Featured Collections */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="group relative overflow-hidden rounded-2xl bg-muted aspect-[16/9] md:aspect-auto">
          <Image
            src="/placeholder.svg?height=600&width=800"
            alt="Mixología"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
            <h3 className="text-3xl font-bold mb-2">Mixología Botánica</h3>
            <p className="text-white/90 mb-4">Eleva tus cócteles con nuestras flores y hierbas aromáticas.</p>
            <Button variant="secondary" className="w-fit">
              Explorar
            </Button>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-2xl bg-muted aspect-[16/9] md:aspect-auto">
          <Image
            src="/placeholder.svg?height=600&width=800"
            alt="Platos Gourmet"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
            <h3 className="text-3xl font-bold mb-2">Alta Cocina</h3>
            <p className="text-white/90 mb-4">Detalles finos para platos que merecen una presentación excepcional.</p>
            <Button variant="secondary" className="w-fit">
              Explorar
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}