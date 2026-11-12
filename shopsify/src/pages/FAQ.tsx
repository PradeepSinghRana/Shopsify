import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

const faqs = [
  { q: 'What are your delivery timings?', a: 'We deliver from 7 AM to 11 PM every day. Express orders arrive within 30 minutes; you can also pick a scheduled slot at checkout.' },
  { q: 'Is there a minimum order value?', a: 'No minimum order. Orders above ₹499 get free delivery; below that a ₹40 delivery fee applies.' },
  { q: 'Which payment methods do you accept?', a: 'Cash on Delivery, UPI, credit/debit cards and net banking.' },
  { q: 'How do I return a product?', a: 'If an item is damaged or not fresh, contact us within 48 hours of delivery and we will refund or replace it — no questions asked.' },
  { q: 'How can I track my order?', a: 'Go to the Track Order page and enter your Order ID, or open My Account → Order History.' },
  { q: 'How do I apply a coupon?', a: 'Enter the coupon code in the Order Summary on the cart page. Try FRESH10 or APP50!' },
  { q: 'Do you deliver to my area?', a: 'We currently deliver across 25 cities in India. Enter your pincode at checkout to confirm.' },
]

export default function FAQ() {
  return (
    <>
      <PageHeader title="Frequently Asked Questions" crumbs={[{ label: 'FAQ' }]} />
      <div className="container narrow section">
        <div className="faq">
          {faqs.map((f) => (
            <details key={f.q} className="card">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
        <p className="center muted">
          Still have questions? <Link to="/contact">Contact our support team</Link>
        </p>
      </div>
    </>
  )
}
