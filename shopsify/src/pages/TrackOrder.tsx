import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { formatPrice } from '../data/products'
import { useStore } from '../context/useStore'
import PageHeader from '../components/PageHeader'

const steps = ['Order placed', 'Packed', 'Out for delivery', 'Delivered']

export default function TrackOrder() {
  const { orders } = useStore()
  const [params, setParams] = useSearchParams()
  const id = params.get('id') ?? ''
  const [input, setInput] = useState(id)
  const [now] = useState(() => Date.now())
  const order = orders.find((o) => o.id === id.trim().toUpperCase())

  // Demo: progress advances with time since the order was placed (1 step / 10 min)
  const step = order
    ? Math.min(steps.length - 1, Math.floor((now - new Date(order.date).getTime()) / 600000))
    : 0

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setParams({ id: input.trim() })
  }

  return (
    <>
      <PageHeader title="Track Your Order" crumbs={[{ label: 'Track Order' }]} />
      <div className="container narrow section">
        <form className="card track-form" onSubmit={submit}>
          <input placeholder="Enter Order ID (e.g. FB12345678)" value={input} onChange={(e) => setInput(e.target.value)} required />
          <button className="btn btn-primary">Track</button>
        </form>

        {id && !order && <p className="error center">No order found with ID “{id}”.</p>}

        {order && (
          <div className="card">
            <div className="sum-row"><span>Order</span><b>#{order.id}</b></div>
            <div className="sum-row"><span>Amount</span><b>{formatPrice(order.total)}</b></div>
            <ol className="timeline">
              {steps.map((s, i) => (
                <li key={s} className={i <= step ? 'done' : ''}>
                  <span className="dot">{i <= step ? '✓' : i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            <p className="muted small">{order.address}</p>
          </div>
        )}
      </div>
    </>
  )
}
