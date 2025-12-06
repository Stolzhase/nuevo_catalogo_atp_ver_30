import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  const categories = [
    {
      title: "Flores Comestibles",
      description: "Sabores que florecen. Un toque de color, aroma y sabor.",
      image: "/edible-pansy-flower.jpg",
      link: "/colecciones",
    },
    {
      title: "Brotes",
      description: "Pequeños, pero llenos de vida. Frescura y nutrición concentrada.",
      image: "/cilantro-microgreen.jpg",
      link: "/colecciones",
    },
    {
      title: "Hortalizas y Hojas",
      description: "La esencia del huerto. Hojas frescas y tiernas.",
      image: "/hortalizas.jpeg",
      link: "/colecciones",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black/20">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/edible-begonia-flower.jpg"
            alt="Hero background"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container relative z-10 text-center px-4 text-white">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 drop-shadow-lg">Armonizando tus Platillos</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-white/90">
            Elevando la gastronomía con la pureza y belleza de la naturaleza.
          </p>
          <Link href="/colecciones">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white border-none text-lg px-8 py-6 h-auto"
            >
              Ver Catálogo
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4 text-primary">Nuestras Colecciones</h2>
            <p className="text-muted-foreground text-lg">
              Descubre nuestra selección curada de productos cultivados con pasión para la alta cocina.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                href={category.link}
                key={index}
                className="group relative h-[500px] overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <Image
                  src={category.image || "/hortalizas2.jpg"}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-3xl font-serif font-bold text-white mb-3">{category.title}</h3>
                  <p className="text-white/80 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center text-primary-foreground font-medium group-hover:gap-2 transition-all">
                    Explorar <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
