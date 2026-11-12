import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { useStore } from '../context/useStore'
import ProductCard from '../components/ProductCard'
import PageHeader from '../components/PageHeader'

export default function Wishlist() {
  const { wishlist } = useStore()
  const items = products.filter((p) => wishlist.includes(p.id))

  return (
    <>
      <PageHeader title="My Wishlist" crumbs={[{ label: 'Wishlist' }]} />
      <div className="container section">
        {items.length === 0 ? (
          <div className="empty">
            <span className="empty-emoji">💚</span>
            <h3>Your wishlist is empty</h3>
            <p className="muted">Tap the ♡ on any product to save it here.</p>
            <Link to="/shop" className="btn btn-primary">Explore Products</Link>
          </div>
        ) : (
          <div className="product-grid">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
