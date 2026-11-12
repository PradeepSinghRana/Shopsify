import { DELIVERY_FEE, FREE_DELIVERY_ABOVE } from './products'

export const COUPONS: Record<string, { label: string; off: (subtotal: number) => number; min: number }> = {
  FRESH10: { label: '10% off (max ₹100)', off: (s) => Math.min(100, Math.round(s * 0.1)), min: 299 },
  APP50: { label: '₹50 off', off: () => 50, min: 199 },
}

export function calcTotals(subtotal: number, mrpTotal: number, coupon: string | null) {
  const c = coupon ? COUPONS[coupon] : undefined
  const couponOff = c && subtotal >= c.min ? c.off(subtotal) : 0
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE
  const total = Math.max(0, subtotal - couponOff + delivery)
  return { couponOff, delivery, total, savings: mrpTotal - subtotal + couponOff }
}
