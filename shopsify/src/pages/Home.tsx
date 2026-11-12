import { Link } from 'react-router-dom'
import { categories, img, products } from '../data/products'
import ProductCard from '../components/ProductCard'

const features = [
  { icon: '⚡', title: '30-min delivery', text: 'Groceries at your door, superfast.' },
  { icon: '🥬', title: 'Farm fresh', text: 'Sourced daily from local farms.' },
  { icon: '💸', title: 'Best prices', text: 'Lower than your local market.' },
  { icon: '↩️', title: 'Easy returns', text: 'No questions asked refunds.' },
]

const testimonials = [
  { name: 'Ananya S.', text: 'Vegetables are always fresh and delivery is super quick. My go-to store now!', rating: 5 },
  { name: 'Rahul M.', text: 'Great prices on staples. The monthly atta and rice order saves me a lot.', rating: 5 },
  { name: 'Priya K.', text: 'Love the fruits quality. Customer support resolved my issue in minutes.', rating: 4 },
]

export default function Home() {
  const bestsellers = products.filter((p) => p.tags?.includes('bestseller'))
  const fresh = products.filter((p) => p.category === 'fruits' || p.category === 'vegetables').slice(0, 8)

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <span className="pill">🌱 100% fresh & organic</span>
            <h1>
              Fresh groceries delivered <span className="accent">in 30 minutes</span>
            </h1>
            <p>
              Fruits, vegetables, dairy, staples and daily essentials — at the best
              prices, straight to your doorstep.
            </p>
            <div className="hero-cta">
              <Link to="/shop" className="btn btn-primary btn-lg">Shop Now</Link>
              <Link to="/offers" className="btn btn-outline btn-lg">View Offers</Link>
            </div>
            <div className="hero-stats">
              <div><b>10k+</b><span>Happy customers</span></div>
              <div><b>500+</b><span>Products</span></div>
              <div><b>4.8★</b><span>App rating</span></div>
            </div>
          </div>
          <div className="hero-art" aria-hidden>
            <div className="hero-circle">
              <img className="main-e" src={img('vegetables')} alt="" />
              <span className="e1"><img src={img('avocado')} alt="" /></span>
              <span className="e2"><img src={img('strawberries')} alt="" /></span>
              <span className="e3"><img src={img('carrots')} alt="" /></span>
              <span className="e4"><img src={img('lemon')} alt="" /></span>
              <span className="e5"><img src={img('milk')} alt="" /></span>
            </div>
          </div>
        </div>
      </section>

      <section className="container features">
        {features.map((f) => (
          <div key={f.title} className="feature">
            <span className="feature-icon">{f.icon}</span>
            <div>
              <b>{f.title}</b>
              <p>{f.text}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="container section">
        <div className="section-head">
          <h2>Shop by Category</h2>
          <Link to="/shop">View all →</Link>
        </div>
        <div className="category-grid">
          {categories.map((c) => (
            <Link key={c.id} to={`/category/${c.id}`} className="category-tile" style={{ background: c.color }}>
              <img className="cat-img" src={c.image} alt="" loading="lazy" />
              <span>{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <h2>Bestsellers</h2>
          <Link to="/shop?sort=popular">View all →</Link>
        </div>
        <div className="product-grid">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="promo-grid">
          <Link to="/category/fruits" className="promo promo-1">
            <div>
              <span className="pill">Up to 30% OFF</span>
              <h3>Seasonal Fruits</h3>
              <p>Juicy mangoes, pomegranates & more</p>
            </div>
            <img className="promo-img" src={img('mango')} alt="" loading="lazy" />
          </Link>
          <Link to="/category/dairy" className="promo promo-2">
            <div>
              <span className="pill">Daily fresh</span>
              <h3>Dairy & Eggs</h3>
              <p>Milk, paneer, butter & eggs</p>
            </div>
            <img className="promo-img" src={img('cheese')} alt="" loading="lazy" />
          </Link>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <h2>Fresh Fruits & Vegetables</h2>
          <Link to="/category/vegetables">View all →</Link>
        </div>
        <div className="product-grid">
          {fresh.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <h2>What our customers say</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((t) => (
            <div key={t.name} className="card testimonial">
              <div className="stars">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
              <p>“{t.text}”</p>
              <b>— {t.name}</b>
            </div>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="app-banner">
          <div>
            <h2>Get the FreshBasket app</h2>
            <p>Order faster, track live and get app-only deals. Use code <b>APP50</b> for ₹50 off your first order.</p>
            <div className="hero-cta">
              <span className="store-btn">▶ Google Play</span>
              <span className="store-btn"> App Store</span>
            </div>
          </div>
          <img className="promo-img app-img" src={img('fruit-mix')} alt="" loading="lazy" />
        </div>
      </section>
    </>
  )
}
