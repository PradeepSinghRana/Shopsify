import { Link } from 'react-router-dom'
import { discountPercent, formatPrice, getCategory, type Product } from '../data/products'
import { useStore } from '../context/useStore'

export default function ProductCard({ product }: { product: Product }) {
  const { cart, addToCart, updateQty, wishlist, toggleWishlist } = useStore()
  const inCart = cart.find((i) => i.product.id === product.id)
  const off = discountPercent(product)
  const liked = wishlist.includes(product.id)
  const bg = getCategory(product.category)?.color ?? '#f3f3f3'

  return (
    <div className="card product-card">
      {off > 0 && <span className="tag-off">{off}% OFF</span>}
      <button
        className={`wish-btn ${liked ? 'active' : ''}`}
        onClick={() => toggleWishlist(product.id)}
        aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {liked ? '♥' : '♡'}
      </button>
      <Link to={`/product/${product.id}`} className="product-img" style={{ background: bg }}>
        <img src={product.image} alt={product.name} loading="lazy" />
      </Link>
      <div className="product-body">
        <span className="unit">{product.unit}</span>
        <Link to={`/product/${product.id}`} className="product-name">
          {product.name}
        </Link>
        <span className="rating">★ {product.rating.toFixed(1)}</span>
        <div className="product-foot">
          <div className="price">
            <b>{formatPrice(product.price)}</b>
            {off > 0 && <s>{formatPrice(product.mrp)}</s>}
          </div>
          {!product.inStock ? (
            <span className="oos">Out of stock</span>
          ) : inCart ? (
            <div className="qty">
              <button onClick={() => updateQty(product.id, inCart.qty - 1)} aria-label="Decrease">−</button>
              <span>{inCart.qty}</span>
              <button onClick={() => updateQty(product.id, inCart.qty + 1)} aria-label="Increase">+</button>
            </div>
          ) : (
            <button className="btn btn-add" onClick={() => addToCart(product)}>
              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
