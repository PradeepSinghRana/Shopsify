import { Link, Navigate, useNavigate } from 'react-router-dom'
import { formatPrice } from '../data/products'
import { useStore } from '../context/useStore'
import PageHeader from '../components/PageHeader'

export default function Account() {
  const { user, orders, wishlist, logout, addToCart } = useStore()
  const navigate = useNavigate()

  if (!user) return <Navigate to="/login?next=/account" replace />

  const reorder = (id: string) => {
    const o = orders.find((x) => x.id === id)
    o?.items.forEach((i) => addToCart(i.product, i.qty))
    navigate('/cart')
  }

  return (
    <>
      <PageHeader title="My Account" crumbs={[{ label: 'Account' }]} />
      <div className="container account">
        <aside className="card profile">
          <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
          <h3>{user.name}</h3>
          <p className="muted">{user.email}</p>
          <div className="profile-stats">
            <div><b>{orders.length}</b><span>Orders</span></div>
            <div><b>{wishlist.length}</b><span>Wishlist</span></div>
          </div>
          <Link to="/wishlist" className="btn btn-outline btn-block">My Wishlist</Link>
          <button className="btn btn-outline btn-block danger" onClick={() => { logout(); navigate('/') }}>
            Logout
          </button>
        </aside>

        <section className="card">
          <h3>Order History</h3>
          {orders.length === 0 ? (
            <div className="empty">
              <span className="empty-emoji">📦</span>
              <p className="muted">You haven’t placed any orders yet.</p>
              <Link to="/shop" className="btn btn-primary">Shop Now</Link>
            </div>
          ) : (
            <div className="orders">
              {orders.map((o) => (
                <div key={o.id} className="order-row">
                  <div>
                    <b>#{o.id}</b>
                    <span className="muted small">{new Date(o.date).toLocaleString('en-IN')}</span>
                    <span className="order-thumbs">
                      {o.items.slice(0, 6).map((i) => (
                        <img key={i.product.id} src={i.product.image} alt={i.product.name} title={i.product.name} />
                      ))}
                      {o.items.length > 6 && <span className="muted small">+{o.items.length - 6}</span>}
                    </span>
                  </div>
                  <div className="order-right">
                    <b>{formatPrice(o.total)}</b>
                    <span className="status">Confirmed</span>
                    <div className="row-btns">
                      <Link to={`/track-order?id=${o.id}`} className="link-btn">Track</Link>
                      <button className="link-btn" onClick={() => reorder(o.id)}>Reorder</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  )
}
