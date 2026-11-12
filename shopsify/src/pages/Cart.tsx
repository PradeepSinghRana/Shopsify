import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FREE_DELIVERY_ABOVE, discountPercent, formatPrice, getCategory } from '../data/products'
import { COUPONS, calcTotals } from '../data/pricing'
import { useStore } from '../context/useStore'
import PageHeader from '../components/PageHeader'

export default function Cart() {
  const { cart, updateQty, removeFromCart, subtotal, clearCart, showToast } = useStore()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [coupon, setCoupon] = useState<string | null>(() => sessionStorage.getItem('fb_coupon'))

  const mrpTotal = cart.reduce((s, i) => s + i.qty * i.product.mrp, 0)
  const { couponOff, delivery, total, savings } = calcTotals(subtotal, mrpTotal, coupon)

  const applyCoupon = () => {
    const c = code.trim().toUpperCase()
    const def = COUPONS[c]
    if (!def) return showToast('Invalid coupon code')
    if (subtotal < def.min) return showToast(`Add items worth ${formatPrice(def.min)} to use ${c}`)
    setCoupon(c)
    sessionStorage.setItem('fb_coupon', c)
    showToast(`Coupon ${c} applied!`)
    setCode('')
  }

  const removeCoupon = () => {
    setCoupon(null)
    sessionStorage.removeItem('fb_coupon')
  }

  if (cart.length === 0) {
    return (
      <>
        <PageHeader title="Your Cart" crumbs={[{ label: 'Cart' }]} />
        <div className="container empty">
          <span className="empty-emoji">🛒</span>
          <h3>Your cart is empty</h3>
          <p className="muted">Looks like you haven’t added anything yet.</p>
          <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHeader title="Your Cart" crumbs={[{ label: 'Cart' }]} />
      <div className="container cart-layout">
        <section className="card cart-items">
          {subtotal < FREE_DELIVERY_ABOVE && (
            <div className="notice">
              Add <b>{formatPrice(FREE_DELIVERY_ABOVE - subtotal)}</b> more for FREE delivery 🚚
              <div className="progress"><span style={{ width: `${(subtotal / FREE_DELIVERY_ABOVE) * 100}%` }} /></div>
            </div>
          )}
          {cart.map(({ product: p, qty }) => (
            <div key={p.id} className="cart-row">
              <Link to={`/product/${p.id}`} className="cart-thumb" style={{ background: getCategory(p.category)?.color }}>
                <img src={p.image} alt={p.name} />
              </Link>
              <div className="cart-info">
                <Link to={`/product/${p.id}`} className="product-name">{p.name}</Link>
                <span className="muted small">{p.unit}</span>
                <div className="price">
                  <b>{formatPrice(p.price)}</b>
                  {discountPercent(p) > 0 && <s>{formatPrice(p.mrp)}</s>}
                </div>
              </div>
              <div className="qty">
                <button onClick={() => updateQty(p.id, qty - 1)} aria-label="Decrease">−</button>
                <span>{qty}</span>
                <button onClick={() => updateQty(p.id, qty + 1)} aria-label="Increase">+</button>
              </div>
              <b className="line-total">{formatPrice(p.price * qty)}</b>
              <button className="link-btn" onClick={() => removeFromCart(p.id)} aria-label="Remove">✕</button>
            </div>
          ))}
          <div className="cart-actions">
            <Link to="/shop" className="btn btn-outline">← Continue Shopping</Link>
            <button className="link-btn danger" onClick={clearCart}>Clear cart</button>
          </div>
        </section>

        <aside className="card summary">
          <h3>Order Summary</h3>
          <div className="coupon">
            {coupon ? (
              <div className="coupon-applied">
                <span>🏷️ <b>{coupon}</b> applied</span>
                <button className="link-btn danger" onClick={removeCoupon}>Remove</button>
              </div>
            ) : (
              <>
                <input placeholder="Coupon code" value={code} onChange={(e) => setCode(e.target.value)} />
                <button className="btn btn-outline" onClick={applyCoupon}>Apply</button>
              </>
            )}
          </div>
          <p className="muted small">Try <b>FRESH10</b> or <b>APP50</b></p>
          <div className="sum-row"><span>Items total (MRP)</span><span>{formatPrice(mrpTotal)}</span></div>
          <div className="sum-row green"><span>Product discount</span><span>−{formatPrice(mrpTotal - subtotal)}</span></div>
          {couponOff > 0 && <div className="sum-row green"><span>Coupon discount</span><span>−{formatPrice(couponOff)}</span></div>}
          <div className="sum-row"><span>Delivery fee</span><span>{delivery === 0 ? <span className="green">FREE</span> : formatPrice(delivery)}</span></div>
          <div className="sum-row total"><span>To pay</span><span>{formatPrice(total)}</span></div>
          {savings > 0 && <div className="savings">🎉 You save {formatPrice(savings)} on this order</div>}
          <button className="btn btn-primary btn-lg btn-block" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
        </aside>
      </div>
    </>
  )
}
