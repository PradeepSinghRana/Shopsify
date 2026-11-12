import { useMemo } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { categories, discountPercent, getCategory, products } from '../data/products'
import ProductCard from '../components/ProductCard'
import PageHeader from '../components/PageHeader'

type Props = { offersOnly?: boolean }

export default function Shop({ offersOnly = false }: Props) {
  const { categoryId } = useParams()
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const sort = params.get('sort') ?? 'relevance'
  const maxPrice = Number(params.get('max') ?? 1000)
  const inStockOnly = params.get('stock') === '1'

  const category = categoryId ? getCategory(categoryId) : undefined

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params)
    if (value === null || value === '') next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const list = useMemo(() => {
    let r = products.filter((p) => {
      if (categoryId && p.category !== categoryId) return false
      if (offersOnly && discountPercent(p) < 15) return false
      if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false
      if (p.price > maxPrice) return false
      if (inStockOnly && !p.inStock) return false
      return true
    })
    r = [...r]
    if (sort === 'low') r.sort((a, b) => a.price - b.price)
    if (sort === 'high') r.sort((a, b) => b.price - a.price)
    if (sort === 'popular') r.sort((a, b) => b.rating - a.rating)
    if (sort === 'discount') r.sort((a, b) => discountPercent(b) - discountPercent(a))
    return r
  }, [categoryId, offersOnly, q, maxPrice, inStockOnly, sort])

  const title = offersOnly
    ? '🔥 Today’s Offers'
    : category
      ? category.name
      : q
        ? `Results for “${q}”`
        : 'Shop All Products'

  const crumbs = offersOnly
    ? [{ label: 'Offers' }]
    : category
      ? [{ label: 'Shop', to: '/shop' }, { label: category.name }]
      : [{ label: 'Shop' }]

  return (
    <>
      <PageHeader
        title={title}
        crumbs={crumbs}
        subtitle={offersOnly ? 'Flat 15% or more off on these products. Limited time only!' : undefined}
      />
      <div className="container shop-layout">
        <aside className="filters card">
          <h4>Categories</h4>
          <Link to="/shop" className={!categoryId && !offersOnly ? 'active' : ''}>All Products</Link>
          {categories.map((c) => (
            <Link key={c.id} to={`/category/${c.id}`} className={categoryId === c.id ? 'active' : ''}>
              <img src={c.image} alt="" className="filter-thumb" /> {c.name}
            </Link>
          ))}

          <h4>Max price: ₹{maxPrice}</h4>
          <input
            type="range"
            min={20}
            max={1000}
            step={10}
            value={maxPrice}
            onChange={(e) => setParam('max', e.target.value === '1000' ? null : e.target.value)}
          />

          <h4>Availability</h4>
          <label className="check">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setParam('stock', e.target.checked ? '1' : null)}
            />
            In stock only
          </label>
        </aside>

        <section>
          <div className="shop-toolbar">
            <span className="muted">{list.length} products</span>
            <select value={sort} onChange={(e) => setParam('sort', e.target.value)} aria-label="Sort by">
              <option value="relevance">Sort: Relevance</option>
              <option value="popular">Popularity</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="discount">Discount</option>
            </select>
          </div>
          {list.length === 0 ? (
            <div className="empty">
              <span className="empty-emoji">🔍</span>
              <h3>No products found</h3>
              <p className="muted">Try a different search or remove some filters.</p>
              <Link to="/shop" className="btn btn-primary">Clear filters</Link>
            </div>
          ) : (
            <div className="product-grid">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  )
}
