import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useStore } from '../context/useStore'

export default function Auth({ mode }: { mode: 'login' | 'register' }) {
  const { login, showToast } = useStore()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = params.get('next') ?? '/account'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const isLogin = mode === 'login'

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (password.length < 6) return setError('Password must be at least 6 characters.')
    const displayName = isLogin ? email.split('@')[0] : name
    login({ name: displayName, email })
    showToast(isLogin ? `Welcome back, ${displayName}!` : 'Account created successfully!')
    navigate(next)
  }

  return (
    <div className="container auth">
      <div className="card auth-card">
        <div className="auth-side">
          <img src="/images/products/vegetables.webp" alt="" className="auth-img" />
          <h2>{isLogin ? 'Welcome back!' : 'Join FreshBasket'}</h2>
          <p>{isLogin ? 'Login to view your orders, wishlist and saved addresses.' : 'Create an account and get ₹50 off on your first order.'}</p>
        </div>
        <form onSubmit={submit} className="auth-form">
          <h1>{isLogin ? 'Login' : 'Create Account'}</h1>
          {!isLogin && (
            <label>Full name<input required value={name} onChange={(e) => setName(e.target.value)} /></label>
          )}
          <label>Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <label>Password<input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
          {isLogin && (
            <button type="button" className="link-btn right" onClick={() => showToast('Password reset link sent to your email')}>
              Forgot password?
            </button>
          )}
          {error && <p className="error">{error}</p>}
          <button className="btn btn-primary btn-lg btn-block">{isLogin ? 'Login' : 'Sign Up'}</button>
          <p className="muted center">
            {isLogin ? (
              <>New here? <Link to={`/register?next=${encodeURIComponent(next)}`}>Create an account</Link></>
            ) : (
              <>Already have an account? <Link to={`/login?next=${encodeURIComponent(next)}`}>Login</Link></>
            )}
          </p>
        </form>
      </div>
    </div>
  )
}
