import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StoreProvider } from './context/StoreProvider'
import Layout from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Wishlist from './pages/Wishlist'
import Auth from './pages/Auth'
import Account from './pages/Account'
import TrackOrder from './pages/TrackOrder'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Policy from './pages/Policy'
import NotFound from './pages/NotFound'
import './App.css'

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="category/:categoryId" element={<Shop />} />
            <Route path="offers" element={<Shop offersOnly />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-success/:id" element={<OrderSuccess />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="login" element={<Auth mode="login" />} />
            <Route path="register" element={<Auth mode="register" />} />
            <Route path="account" element={<Account />} />
            <Route path="track-order" element={<TrackOrder />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="policies/:slug" element={<Policy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}
