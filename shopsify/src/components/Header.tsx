import { useState, type FormEvent } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { categories } from '../data/products'
import { useStore } from '../context/useStore'

export default function Header() {
  const { cartCount, wishlist, user } = useStore()
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`)
    setMenuOpen(false)
  }

  const close = () => setMenuOpen(false)

  return (
    <header className="header">
      <div className="topbar">
        <span>🚚 Free delivery on orders above ₹499</span>
        <span className="topbar-right">
          <Link to="/track-order">Track Order</Link>
          <Link to="/faq">Help</Link>
        </span>
      </div>

      <div className="header-main container">
        <button
          className="menu-btn"
          aria-label="Open menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          ☰
        </button>
        <Link to="/" className="logo" onClick={close}>
          <span className="logo-icon">🛒</span>
          <span>
            Fresh<b>Basket</b>
          </span>
        </Link>

        <form className="search" onSubmit={onSearch}>
          <input
            type="search"
            placeholder="Search for fruits, vegetables, milk..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search products"
          />
          <button type="submit" aria-label="Search">🔍</button>
        </form>

        <div className="header-actions">
          <Link to={user ? '/account' : '/login'} className="icon-link">
            <span className="icon">👤</span>
            <span className="label">{user ? user.name.split(' ')[0] : 'Login'}</span>
          </Link>
          <Link to="/wishlist" className="icon-link">
            <span className="icon">♡</span>
            {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
            <span className="label">Wishlist</span>
          </Link>
          <Link to="/cart" className="icon-link cart-link">
            <span className="icon">🛍️</span>
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
            <span className="label">Cart</span>
          </Link>
        </div>
      </div>

      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <div className="container nav-inner">
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/shop" onClick={close}>Shop All</NavLink>
          {categories.slice(0, 5).map((c) => (
            <NavLink key={c.id} to={`/category/${c.id}`} onClick={close}>
              {c.name}
            </NavLink>
          ))}
          <NavLink to="/offers" onClick={close}>🔥 Offers</NavLink>
          <NavLink to="/about" onClick={close}>About</NavLink>
          <NavLink to="/contact" onClick={close}>Contact</NavLink>
        </div>
      </nav>
    </header>
  )
}
