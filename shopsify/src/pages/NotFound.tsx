import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container empty not-found">
      <span className="empty-emoji">🥕❓</span>
      <h1>404 — Page not found</h1>
      <p className="muted">Oops! The page you’re looking for has rolled off the shelf.</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  )
}
