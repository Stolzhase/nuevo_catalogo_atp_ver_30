"use client"

import { useState } from "react"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { ShoppingCart, X, Plus, Minus, MessageCircle, Trash2 } from "lucide-react"

interface CartModalProps {
  inline?: boolean
}

export function CartModal({ inline = false }: CartModalProps) {
  const [open, setOpen] = useState(false)
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalItems, getTotalPrice, generateOrderMessage, setBuyerName } = useCart()
  const phoneNumber = "5215560667454"

  const handleSendOrder = () => {
    const message = encodeURIComponent(generateOrderMessage())
    const url = `https://wa.me/${phoneNumber}?text=${message}`
    try {
      const w = window.open(url, "_blank")
      if (w) w.opener = null
      else window.location.href = url
    } catch (err) {
      window.location.href = url
    }
    clearCart() // Limpiar items pero mantener buyerName
    setOpen(false)
  }

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  return (
    <>
      {/* Botón del carrito (inline o flotante) */}
      {inline ? (
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir carrito de compras"
          title="Abrir carrito"
          tabIndex={0}
          role="button"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setOpen(true)
            }
          }}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-all relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="font-medium">Carrito</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir carrito de compras"
          title="Abrir carrito"
          tabIndex={0}
          role="button"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setOpen(true)
            }
          }}
          className="fixed bottom-6 right-4 z-50 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all relative flex items-center justify-center h-12 w-12 sm:h-10 sm:w-10 p-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300"
          style={{ touchAction: 'manipulation' }}
        >
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      )}

      {/* Modal del carrito */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Carrito de Compras
              {cart.items.length > 0 && (
                <span className="ml-auto text-sm font-normal text-muted-foreground">
                  ID: {cart.orderId}
                </span>
              )}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {cart.items.length === 0
                ? "Tu carrito está vacío. Agrega productos para comenzar."
                : `${totalItems} artículos seleccionados`}
            </AlertDialogDescription>
          </AlertDialogHeader>

          {cart.items.length > 0 && (
            <div className="space-y-4 py-4">
              {/* Lista de productos */}
              <div className="space-y-3 border rounded-lg p-4 bg-muted/50">
                {cart.items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between gap-4 p-3 bg-white rounded border"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        ${item.product.price.toFixed(2)} x {item.quantity} = ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Controles de cantidad */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold text-sm">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resumen */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({totalItems} items):</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-base">
                  <span>Total:</span>
                  <span className="text-green-600">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              {/* Nombre del solicitante */}
              <div className="pt-4">
                <label className="text-sm font-medium">Nombre del solicitante (opcional)</label>
                <Input
                  value={cart.buyerName || ''}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Nombre para el pedido"
                  className="mt-2"
                />
              </div>
            </div>
          )}

          <AlertDialogFooter className="flex-col gap-2">
            {cart.items.length > 0 && (
              <>
                <Button
                  variant="destructive"
                  onClick={clearCart}
                  className="w-full"
                >
                  Limpiar carrito
                </Button>
                <Button
                  onClick={handleSendOrder}
                  className="w-full gap-2 bg-green-600 hover:bg-green-700"
                >
                  <MessageCircle className="h-5 w-5" />
                  Enviar pedido por WhatsApp
                </Button>
              </>
            )}
            <AlertDialogCancel>
              {cart.items.length > 0 ? "Seguir comprando" : "Cerrar"}
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
