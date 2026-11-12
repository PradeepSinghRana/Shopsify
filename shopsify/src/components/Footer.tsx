import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../data/products'
import { useStore } from '../context/useStore'

export default function Footer() {
  const { showToast } = useStore()
  const [email, setEmail] = useState('')

  const subscribe = (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    showToast('Thanks for subscribing! 🎉')
    setEmail('')
  }

  return (
    <footer className="footer">
      <div className="newsletter">
        <div className="container newsletter-inner">
          <div>
            <h3>Get fresh deals in your inbox</h3>
            <p>Subscribe for weekly offers, new arrivals and healthy recipes.</p>
          </div>
          <form onSubmit={subscribe}>
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="container footer-grid">
        <div>
          <Link to="/" className="logo">
            <span className="logo-icon">🛒</span>
            <span>
              Fresh<b>Basket</b>
            </span>
          </Link>
          <p className="muted">
            Your neighbourhood grocery store, online. Fresh produce and daily
            essentials delivered to your door in 30 minutes.
          </p>
          <p className="muted">📍 12 MG Road, Bengaluru 560001</p>
          <p className="muted">📞 +91 98765 43210</p>
        </div>
        <div>
          <h4>Categories</h4>
          {categories.map((c) => (
            <Link key={c.id} to={`/category/${c.id}`}>{c.name}</Link>
          ))}
        </div>
        <div>
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/offers">Offers</Link>
          <Link to="/faq">FAQs</Link>
        </div>
        <div>
          <h4>Help</h4>
          <Link to="/account">My Account</Link>
          <Link to="/track-order">Track Order</Link>
          <Link to="/policies/shipping">Shipping Policy</Link>
          <Link to="/policies/returns">Returns & Refunds</Link>
          <Link to="/policies/privacy">Privacy Policy</Link>
          <Link to="/policies/terms">Terms & Conditions</Link>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} FreshBasket. All rights reserved.
      </div>
    </footer>
  )
}
