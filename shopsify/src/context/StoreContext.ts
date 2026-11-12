import { createContext } from 'react'
import type { Product } from '../data/products'

export type CartItem = { product: Product; qty: number }

export type User = { name: string; email: string }

export type Order = {
  id: string
  date: string
  items: CartItem[]
  total: number
  address: string
  payment: string
}

export type StoreState = {
  cart: CartItem[]
  wishlist: number[]
  user: User | null
  orders: Order[]
  addToCart: (product: Product, qty?: number) => void
  updateQty: (id: number, qty: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  toggleWishlist: (id: number) => void
  login: (user: User) => void
  logout: () => void
  placeOrder: (address: string, payment: string, total: number) => Order
  cartCount: number
  subtotal: number
  toast: string | null
  showToast: (msg: string) => void
}

export const StoreContext = createContext<StoreState | null>(null)
