import { Link, useParams } from 'react-router-dom'
import { formatPrice } from '../data/products'
import { useStore } from '../context/useStore'

export default function OrderSuccess() {
  const { id } = useParams()
  const { orders } = useStore()
  const order = orders.find((o) => o.id === id)

  return (
    <div className="container narrow success">
      <div className="success-icon">✅</div>
      <h1>Order placed successfully!</h1>
      <p className="muted">Thank you for shopping with FreshBasket. Your groceries are on the way.</p>
      {order && (
        <div className="card order-box">
          <div className="sum-row"><span>Order ID</span><b>{order.id}</b></div>
          <div className="sum-row"><span>Items</span><span>{order.items.reduce((s, i) => s + i.qty, 0)}</span></div>
          <div className="sum-row"><span>Payment</span><span>{order.payment}</span></div>
          <div className="sum-row total"><span>Amount</span><span>{formatPrice(order.total)}</span></div>
          <p className="muted small">{order.address}</p>
        </div>
      )}
      <div className="hero-cta center">
        <Link to={`/track-order?id=${id}`} className="btn btn-primary">Track Order</Link>
        <Link to="/shop" className="btn btn-outline">Continue Shopping</Link>
      </div>
    </div>
  )
}
