import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { formatPrice } from '../data/products'
import { useStore } from '../context/useStore'
import PageHeader from '../components/PageHeader'
import { calcTotals } from '../data/pricing'

const slots = ['Within 30 minutes', 'Today, 6 PM – 8 PM', 'Tomorrow, 8 AM – 10 AM', 'Tomorrow, 6 PM – 8 PM']

export default function Checkout() {
  const { cart, subtotal, user, placeOrder } = useStore()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: user?.name ?? '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  })
  const [slot, setSlot] = useState(slots[0])
  const [payment, setPayment] = useState('Cash on Delivery')
  const [error, setError] = useState('')

  if (cart.length === 0) return <Navigate to="/cart" replace />

  const coupon = sessionStorage.getItem('fb_coupon')
  const mrpTotal = cart.reduce((s, i) => s + i.qty * i.product.mrp, 0)
  const { couponOff, delivery, total } = calcTotals(subtotal, mrpTotal, coupon)

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!/^\d{10}$/.test(form.phone)) return setError('Please enter a valid 10-digit phone number.')
    if (!/^\d{6}$/.test(form.pincode)) return setError('Please enter a valid 6-digit pincode.')
    const address = `${form.name}, ${form.address}, ${form.city} - ${form.pincode} (📞 ${form.phone}) · Slot: ${slot}`
    const order = placeOrder(address, payment, total)
    sessionStorage.removeItem('fb_coupon')
    navigate(`/order-success/${order.id}`)
  }

  return (
    <>
      <PageHeader title="Checkout" crumbs={[{ label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
      <form className="container cart-layout" onSubmit={submit}>
        <section className="checkout-steps">
          {!user && (
            <div className="card notice">
              Have an account? <Link to="/login?next=/checkout">Login</Link> for faster checkout.
            </div>
          )}
          <div className="card">
            <h3>1. Delivery Address</h3>
            <div className="form-grid">
              <label>Full name<input required value={form.name} onChange={set('name')} /></label>
              <label>Phone number<input required inputMode="numeric" value={form.phone} onChange={set('phone')} placeholder="10-digit mobile" /></label>
              <label className="full">Address (house no, street, area)<textarea required rows={2} value={form.address} onChange={set('address')} /></label>
              <label>City<input required value={form.city} onChange={set('city')} /></label>
              <label>Pincode<input required inputMode="numeric" value={form.pincode} onChange={set('pincode')} /></label>
            </div>
          </div>

          <div className="card">
            <h3>2. Delivery Slot</h3>
            <div className="options">
              {slots.map((s) => (
                <label key={s} className={`option ${slot === s ? 'selected' : ''}`}>
                  <input type="radio" name="slot" checked={slot === s} onChange={() => setSlot(s)} />
                  {s}
                </label>
              ))}
            </div>
          </div>

          <div className="card">
            <h3>3. Payment Method</h3>
            <div className="options">
              {['Cash on Delivery', 'UPI', 'Credit / Debit Card', 'Net Banking'].map((m) => (
                <label key={m} className={`option ${payment === m ? 'selected' : ''}`}>
                  <input type="radio" name="pay" checked={payment === m} onChange={() => setPayment(m)} />
                  {m}
                </label>
              ))}
            </div>
            {payment !== 'Cash on Delivery' && (
              <p className="muted small">This is a demo store — no real payment will be charged.</p>
            )}
          </div>
          {error && <p className="error">{error}</p>}
        </section>

        <aside className="card summary">
          <h3>Your Order ({cart.length} items)</h3>
          <div className="mini-items">
            {cart.map(({ product: p, qty }) => (
              <div key={p.id} className="sum-row">
                <span className="mini-item"><img src={p.image} alt="" /> {p.name} × {qty}</span>
                <span>{formatPrice(p.price * qty)}</span>
              </div>
            ))}
          </div>
          <hr />
          <div className="sum-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          {couponOff > 0 && <div className="sum-row green"><span>Coupon ({coupon})</span><span>−{formatPrice(couponOff)}</span></div>}
          <div className="sum-row"><span>Delivery</span><span>{delivery === 0 ? 'FREE' : formatPrice(delivery)}</span></div>
          <div className="sum-row total"><span>Total</span><span>{formatPrice(total)}</span></div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Place Order · {formatPrice(total)}
          </button>
        </aside>
      </form>
    </>
  )
}
