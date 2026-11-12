import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { discountPercent, formatPrice, getCategory, getProduct, products } from '../data/products'
import { useStore } from '../context/useStore'
import ProductCard from '../components/ProductCard'
import PageHeader from '../components/PageHeader'
import NotFound from './NotFound'

// Keyed by id so qty/tab state resets when navigating between products
export default function ProductDetail() {
  const { id } = useParams()
  return <ProductView key={id} id={Number(id)} />
}

function ProductView({ id }: { id: number }) {
  const product = getProduct(id)
  const { addToCart, wishlist, toggleWishlist } = useStore()
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState<'desc' | 'info' | 'reviews'>('desc')

  if (!product) return <NotFound />

  const cat = getCategory(product.category)
  const off = discountPercent(product)
  const liked = wishlist.includes(product.id)
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <>
      <PageHeader
        title={product.name}
        crumbs={[
          { label: 'Shop', to: '/shop' },
          { label: cat?.name ?? '', to: `/category/${product.category}` },
          { label: product.name },
        ]}
      />
      <div className="container pdp">
        <div className="pdp-img" style={{ background: cat?.color }}>
          <img src={product.image} alt={product.name} />
          {off > 0 && <span className="tag-off">{off}% OFF</span>}
        </div>
        <div className="pdp-info">
          <Link to={`/category/${product.category}`} className="pill">{cat?.name}</Link>
          <h2>{product.name}</h2>
          <div className="rating-row">
            <span className="rating">★ {product.rating.toFixed(1)}</span>
            <span className="muted">(128 reviews)</span>
          </div>
          <p className="muted">Net quantity: {product.unit}</p>
          <div className="pdp-price">
            <b>{formatPrice(product.price)}</b>
            {off > 0 && (
              <>
                <s>MRP {formatPrice(product.mrp)}</s>
                <span className="save">Save {formatPrice(product.mrp - product.price)}</span>
              </>
            )}
          </div>
          <p className="muted small">Inclusive of all taxes</p>

          {product.inStock ? (
            <div className="pdp-actions">
              <div className="qty qty-lg">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">−</button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Increase">+</button>
              </div>
              <button className="btn btn-primary btn-lg" onClick={() => addToCart(product, qty)}>
                Add to Cart
              </button>
              <button className="btn btn-outline btn-lg" onClick={() => toggleWishlist(product.id)}>
                {liked ? '♥ Wishlisted' : '♡ Wishlist'}
              </button>
            </div>
          ) : (
            <p className="oos big">Currently out of stock</p>
          )}

          <ul className="pdp-perks">
            <li>⚡ Delivery in 30 minutes</li>
            <li>↩️ Easy 7-day return & refund</li>
            <li>✅ Quality checked & hygienically packed</li>
          </ul>

          <div className="tabs">
            <button className={tab === 'desc' ? 'active' : ''} onClick={() => setTab('desc')}>Description</button>
            <button className={tab === 'info' ? 'active' : ''} onClick={() => setTab('info')}>Information</button>
            <button className={tab === 'reviews' ? 'active' : ''} onClick={() => setTab('reviews')}>Reviews</button>
          </div>
          <div className="tab-body">
            {tab === 'desc' && <p>{product.description}</p>}
            {tab === 'info' && (
              <table className="info-table">
                <tbody>
                  <tr><td>Category</td><td>{cat?.name}</td></tr>
                  <tr><td>Quantity</td><td>{product.unit}</td></tr>
                  <tr><td>Shelf life</td><td>Refer to package</td></tr>
                  <tr><td>Country of origin</td><td>India</td></tr>
                </tbody>
              </table>
            )}
            {tab === 'reviews' && (
              <div className="reviews">
                <div><b>★★★★★ Amit</b><p>Very fresh and well packed. Will order again.</p></div>
                <div><b>★★★★☆ Neha</b><p>Good quality for the price.</p></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container section">
          <div className="section-head">
            <h2>You may also like</h2>
          </div>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
