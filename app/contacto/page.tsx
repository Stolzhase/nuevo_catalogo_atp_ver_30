import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Phone, Mail, Clock, MapPin } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const phoneNumber = "5215560667454"
  const whatsappLink = `https://wa.me/52${phoneNumber}?text=Hola,%20me%20interesa%20hacer%20un%20pedido`

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary/5 border-b py-16 md:py-24">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">Contáctanos</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Estamos aquí para atender tus pedidos y resolver cualquier duda sobre nuestros productos frescos y gourmet.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto py-16 px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Contact Information */}
          <div className="md:col-span-1 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Información de Contacto</h2>
              <p className="text-muted-foreground">Conecta con nosotros a través de tu canal favorito</p>
            </div>

            {/* WhatsApp */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-green-600 p-3 rounded-full">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">Respuesta inmediata</p>
                  <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <p className="text-green-600 font-bold hover:underline">{phoneNumber}</p>
                  </Link>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">Teléfono</p>
                  <p className="text-sm text-muted-foreground">Llamadas de 9 a 18h</p>
                  <p className="text-blue-600 font-bold">+52 {phoneNumber}</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-purple-600 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">Correo Electrónico</p>
                  <p className="text-sm text-muted-foreground">Respuesta en 24h</p>
                  <a href="mailto:maralvaflo@gmail.com" className="text-purple-600 font-bold hover:underline break-all">
                    maralvaflo@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <Card className="border-2 shadow-lg">
              <CardHeader className="border-b bg-muted/30">
                <CardTitle className="text-3xl">Formulario de Contacto</CardTitle>
                <CardDescription>
                  Cuéntanos sobre tu consulta y nos pondremos en contacto lo antes posible
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-semibold">
                        Nombre Completo *
                      </label>
                      <Input 
                        id="name" 
                        placeholder="Tu nombre" 
                        className="h-11"
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-semibold">
                        Teléfono / WhatsApp *
                      </label>
                      <Input 
                        id="phone" 
                        placeholder="10 dígitos" 
                        type="tel"
                        className="h-11"
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold">
                      Correo Electrónico *
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="tu@email.com"
                      className="h-11"
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-semibold">
                      Asunto *
                    </label>
                    <Input 
                      id="subject" 
                      placeholder="¿Sobre qué es tu consulta?"
                      className="h-11"
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold">
                      Mensaje *
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Cuéntanos sobre tu pedido o consulta... Sé lo más detallado posible."
                      className="min-h-[150px] resize-none"
                      required
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button type="submit" className="flex-1 h-11 text-base font-medium">
                      Enviar Mensaje
                    </Button>
                    <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button type="button" className="w-full h-11 bg-green-600 hover:bg-green-700 text-base font-medium">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Contactar por WhatsApp
                      </Button>
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Info */}
        <section className="bg-muted/30 rounded-2xl p-8 md:p-12 border">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold">Horarios de Atención</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex justify-between">
                  <span>Lunes a Viernes:</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sábado:</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Domingo:</span>
                  <span className="font-medium">Cerrado</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold">Ubicación</h3>
              </div>
              <div className="space-y-2 text-muted-foreground">
                <p>Producción y Distribución</p>
                <p className="font-medium text-foreground">Centro de Operaciones</p>
                <p className="text-sm">Disponible solo para consultas por WhatsApp, Email o Teléfono</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
