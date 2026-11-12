import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useStore } from '../context/useStore'

export default function Layout() {
  const { pathname } = useLocation()
  const { toast } = useStore()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  )
}
