import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Definición para los parámetros de búsqueda de Next.js
interface ProductosPageProps {
  searchParams: {
    temporada?: string // El parámetro que viene del botón 'Ver Colección'
  }
}

export default async function ProductosPage({ searchParams }: ProductosPageProps) {
  // 1. OBTENER Y PROCESAR EL FILTRO DE TEMPORADA
  const params = await searchParams;
  const temporadaFilter = params.temporada;
  
  // Normalizar el filtro (ej: 'verano' -> 'Verano')
  // Nota: Asume que las colecciones en products-data están Capitalizadas (ej: "Verano").
  const activeSeasonFilter = temporadaFilter 
    ? temporadaFilter.charAt(0).toUpperCase() + temporadaFilter.slice(1).toLowerCase()
    : null;

  // 2. FILTRAR PRODUCTOS
  // AÑADIDO: .filter(p => !!p) para eliminar cualquier elemento 'null' o 'undefined'
  const allProducts = products
    .filter(p => !!p) // <--- CORRECCIÓN DE SEGURIDAD (Soluciona el error de acceso)
    .filter(product => 
      !activeSeasonFilter || product.collection === activeSeasonFilter
    );

  // Group filtered products by category
  const categories = ["Flores Comestibles", "Brotes", "Hortalizas y Hojas Verdes"] as const

  // 3. DEFINIR CONTENIDO DE LA CABECERA
  const title = activeSeasonFilter 
    ? `Colección ${activeSeasonFilter}` 
    : "Nuestro Catálogo 2026";
    
  const description = activeSeasonFilter
    ? `Explora nuestra selección especial de productos para la temporada de ${activeSeasonFilter.toLowerCase()}.`
    : "Descubre nuestra selección de productos frescos cultivados con atención. Desde flores comestibles que aportan elegancia hasta brotes llenos de vida.";

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{title}</h1>
        <p className="text-lg text-muted-foreground">
          {description}
        </p>
        {activeSeasonFilter && (
            <p className="mt-4 text-sm text-primary">
              Mostrando productos para la colección: {activeSeasonFilter}. <a href="/productos" className="underline hover:text-primary/80">Ver catálogo completo</a>.
            </p>
        )}
      </div>

      <Tabs defaultValue="todos" className="space-y-8">
        {/* Mostramos las pestañas solo si no hay un filtro de temporada activo, o podríamos mostrar solo la pestaña de 'Todos' */}
        {!activeSeasonFilter && (
            <div className="flex justify-center overflow-x-auto pb-4">
              <TabsList className="h-auto p-1">
                <TabsTrigger value="todos" className="px-6 py-2 text-base">
                  Todos
                </TabsTrigger>
                {categories.map((cat) => (
                  <TabsTrigger key={cat} value={cat} className="px-6 py-2 text-base">
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
        )}

        {/* CONTENIDO: Todos los productos (Filtrados por temporada si aplica) */}
        <TabsContent value="todos" className="space-y-12">
          {categories.map((category) => {
            const productsInCategory = allProducts.filter(p => p.category === category);
            
            if (productsInCategory.length === 0) {
              return null; // No mostrar sección si no hay productos filtrados
            }
            
            return (
              <section key={category} className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight border-b pb-2">{category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {productsInCategory.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )
          })}
        </TabsContent>

        {/* CONTENIDO: Filtrado por Categoría (Solo si no hay filtro de temporada) */}
        {!activeSeasonFilter && categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="mb-8 bg-muted/50 p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-2">Sobre {category}</h3>
              <p className="text-muted-foreground">
                {category === "Flores Comestibles" &&
                  "Un toque de color, aroma y sabor. Nuestras flores comestibles transforman cualquier platillo en una obra de arte."}
                {category === "Brotes" &&
                  "Pequeños, pero llenos de vida. Los brotes concentran todo el poder de la naturaleza en cada hoja."}
                {category === "Hortalizas y Hojas Verdes" &&
                  "La esencia del huerto. Hojas frescas y tiernas, listas para realzar tus platillos con su textura y sabor inconfundibles."}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allProducts 
                .filter((p) => p.category === category)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}