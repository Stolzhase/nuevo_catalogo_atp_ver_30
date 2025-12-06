import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Leaf, Sprout, Heart, Award } from "lucide-react"

export default function AboutPage() {
  const timeline = [
    {
      year: "El Origen",
      title: "Pasión por la Tierra",
      description:
        "Todo comenzó con un pequeño huerto y un sueño: cultivar ingredientes que no solo alimentaran, sino que inspiraran. Nuestra conexión con la tierra es el fundamento de todo lo que hacemos.",
      image: "/placeholder.svg?height=600&width=800&text=El+Origen",
      icon: Leaf,
    },
    {
      year: "Crecimiento",
      title: "Innovación Sostenible",
      description:
        "A medida que crecimos, adoptamos técnicas de cultivo sostenible. Aprendimos a escuchar a la naturaleza, eliminando químicos y abrazando procesos orgánicos que respetan el ciclo de vida.",
      image: "/placeholder.svg?height=600&width=800&text=Crecimiento",
      icon: Sprout,
    },
    {
      year: "Actualidad",
      title: "Excelencia Culinaria",
      description:
        "Hoy, somos proveedores orgullosos de los mejores chefs y restaurantes. Cada flor, brote y hoja es seleccionada a mano para asegurar que llegue a tu plato con la máxima frescura y belleza.",
      image: "/placeholder.svg?height=600&width=800&text=Actualidad",
      icon: Award,
    },
  ]

  const values = [
    {
      icon: Leaf,
      title: "Sostenibilidad",
      description: "Cultivos responsables que respetan el ecosistema y aseguran un futuro para las próximas generaciones.",
    },
    {
      icon: Heart,
      title: "Pasión",
      description: "Cada producto es resultado del cuidado y dedicación de manos que aman lo que hacen.",
    },
    {
      icon: Award,
      title: "Excelencia",
      description: "Estándares rigurosos en cada etapa, desde el cultivo hasta la entrega en tu mesa.",
    },
    {
      icon: Sprout,
      title: "Innovación",
      description: "Experimentamos constantemente con nuevas variedades y técnicas culinarias.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-primary/10 to-transparent py-20 md:py-32 border-b">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Nuestra Historia</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Cultivando belleza y sabor desde el corazón de la tierra hasta tu mesa, con pasión y sostenibilidad.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="space-y-24">
          {timeline.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12 md:gap-16`}
              >
                {/* Image */}
                <ScrollReveal className="flex-1 w-full">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/10">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </ScrollReveal>

                {/* Text */}
                <ScrollReveal className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      {item.year}
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-foreground">{item.title}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">{item.description}</p>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/30 py-20 md:py-32 border-y">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold">Nuestros Valores</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Los principios que guían cada decisión y cada producto que enviamos a tus manos
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const ValueIcon = value.icon;
              return (
                <ScrollReveal key={index}>
                  <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg border border-primary/10 transition-all space-y-4">
                    <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center">
                      <ValueIcon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <blockquote className="text-center space-y-8">
              <p className="text-4xl md:text-5xl font-serif italic text-primary/80 leading-relaxed max-w-4xl mx-auto">
                "La cocina es un arte, y nosotros proporcionamos los colores más vivos para tu lienzo."
              </p>
              <p className="text-lg text-muted-foreground">— Armonizando tus Platillos</p>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16 md:py-24 border-t">
        <div className="container mx-auto px-4 text-center space-y-8">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold">¿Listo para descubrir nuestros productos?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explora nuestro catálogo completo y encuentra los ingredientes perfectos para tus creaciones culinarias.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/productos">
                <Button size="lg" className="text-base font-medium">
                  Ver Catálogo Completo
                </Button>
              </Link>
              <Link href="/contacto">
                <Button size="lg" variant="outline" className="text-base font-medium">
                  Contáctanos
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
