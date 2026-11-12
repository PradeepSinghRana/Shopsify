import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { getProduct, type Product } from '../data/products'
import { StoreContext, type CartItem, type Order, type User } from './StoreContext'

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable — ignore */
  }
}

// Saved items hold a snapshot of the product; refresh it from the current catalog
// so older saves pick up new fields (e.g. images) and removed products drop out.
function refreshItems(items: CartItem[]): CartItem[] {
  return items.flatMap((i) => {
    const product = getProduct(i.product?.id)
    return product ? [{ product, qty: i.qty }] : []
  })
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => refreshItems(load('fb_cart', [])))
  const [wishlist, setWishlist] = useState<number[]>(() => load<number[]>('fb_wishlist', []).filter((id) => getProduct(id)))
  const [user, setUser] = useState<User | null>(() => load('fb_user', null))
  const [orders, setOrders] = useState<Order[]>(() =>
    load<Order[]>('fb_orders', []).map((o) => ({ ...o, items: refreshItems(o.items) })),
  )
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  useEffect(() => save('fb_cart', cart), [cart])
  useEffect(() => save('fb_wishlist', wishlist), [wishlist])
  useEffect(() => save('fb_user', user), [user])
  useEffect(() => save('fb_orders', orders), [orders])

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 2200)
  }, [])

  const addToCart = useCallback(
    (product: Product, qty = 1) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.product.id === product.id)
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id ? { ...i, qty: i.qty + qty } : i,
          )
        }
        return [...prev, { product, qty }]
      })
      showToast(`${product.name} added to cart`)
    },
    [showToast],
  )

  const updateQty = useCallback((id: number, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => i.product.id !== id)
        : prev.map((i) => (i.product.id === id ? { ...i, qty } : i)),
    )
  }, [])

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((i) => i.product.id !== id))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const toggleWishlist = useCallback(
    (id: number) => {
      const has = wishlist.includes(id)
      setWishlist(has ? wishlist.filter((x) => x !== id) : [...wishlist, id])
      showToast(has ? 'Removed from wishlist' : 'Added to wishlist')
    },
    [wishlist, showToast],
  )

  const login = useCallback((u: User) => setUser(u), [])
  const logout = useCallback(() => setUser(null), [])

  const placeOrder = useCallback(
    (address: string, payment: string, total: number) => {
      const order: Order = {
        id: 'FB' + Date.now().toString().slice(-8),
        date: new Date().toISOString(),
        items: cart,
        total,
        address,
        payment,
      }
      setOrders((prev) => [order, ...prev])
      setCart([])
      return order
    },
    [cart],
  )

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const subtotal = cart.reduce((s, i) => s + i.qty * i.product.price, 0)

  const value = useMemo(
    () => ({
      cart, wishlist, user, orders, addToCart, updateQty, removeFromCart, clearCart,
      toggleWishlist, login, logout, placeOrder, cartCount, subtotal, toast, showToast,
    }),
    [cart, wishlist, user, orders, addToCart, updateQty, removeFromCart, clearCart,
      toggleWishlist, login, logout, placeOrder, cartCount, subtotal, toast, showToast],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
