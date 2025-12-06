import { useState, useCallback, useEffect } from 'react'
import { Product } from '@/lib/products-data'

export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  orderId: string
  buyerName?: string
}

// Generar ID único para el pedido
const generateOrderId = () => {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `ORD-${timestamp}-${random}`
}

export function useCart() {
  const [cart, setCart] = useState<Cart>({
    items: [],
    orderId: generateOrderId(),
    buyerName: '',
  })
  const [isLoaded, setIsLoaded] = useState(false)

  // Cargar carrito del localStorage al montar
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cart')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setCart({
            items: parsed.items ?? [],
            orderId: parsed.orderId ?? generateOrderId(),
            buyerName: parsed.buyerName ?? '',
          })
        } catch {
          setCart({ items: [], orderId: generateOrderId(), buyerName: '' })
        }
      }
    } catch (err) {
      // localStorage access might fail in some browsers/environments - ignore
    }
    setIsLoaded(true)
  }, [])

  // Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('cart', JSON.stringify(cart))
      } catch (err) {
        // ignore write errors (storage full, disabled, etc.)
      }
    }
  }, [cart, isLoaded])

  const setBuyerName = useCallback((name: string) => {
    setCart((prev) => ({ ...prev, buyerName: name }))
  }, [])

  const addToCart = useCallback(
    (product: Product, quantity: number = 1) => {
      setCart((prev) => {
        const existing = prev.items.find((item) => item.product.id === product.id)
        if (existing) {
          return {
            ...prev,
            items: prev.items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          }
        }
        return {
          ...prev,
          items: [...prev.items, { product, quantity }],
        }
      })
    },
    []
  )

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    }))
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.product.id !== productId),
    }))
  }, [])

  const clearCart = useCallback(() => {
    setCart((prev) => ({
      items: [],
      orderId: generateOrderId(),
      buyerName: prev.buyerName, // Mantener nombre para siguiente pedido
    }))
  }, [])

  const getTotalItems = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0)
  }
  
  const getTotalPrice = () => {
    return cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }
  
  const sanitize = (s: string) => {
    try {
      const normalized = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      return normalized.replace(/[^\x00-\x7F]/g, '').replace(/\s+/g, ' ').trim()
    } catch {
      return s
    }
  }
  const generateOrderMessage = (buyerName?: string) => {
    if (cart.items.length === 0) return ''

    const itemsList = cart.items
      .map((item) => `- ${item.quantity}x ${item.product.name} (${item.product.unitOfMeasure})`)
      .join('\n')

    const totalPrice = getTotalPrice()
    const totalItems = getTotalItems()

    const lines: string[] = []
    lines.push(`Pedido ${cart.orderId}`)

    const finalName = buyerName && buyerName.trim() ? sanitize(buyerName) : sanitize(cart.buyerName || '')
    if (finalName) {
      lines.push(`Nombre: ${finalName}`)
    }

    lines.push('')
    lines.push('Productos:')
    lines.push(itemsList)
    lines.push('')
    lines.push(`Total artículos: ${totalItems}`)
    lines.push(`Precio estimado: $${totalPrice.toFixed(2)}`)
    lines.push('')
    lines.push('Por favor confirmar disponibilidad y precio final.')

    const message = lines.join('\n')
    return message
  }

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
    generateOrderMessage,
    setBuyerName,
  }
}
