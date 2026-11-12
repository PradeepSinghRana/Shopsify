import { useState, type FormEvent } from 'react'
import PageHeader from '../components/PageHeader'
import { useStore } from '../context/useStore'

export default function Contact() {
  const { showToast } = useStore()
  const [sent, setSent] = useState(false)

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.currentTarget.reset()
    setSent(true)
    showToast('Message sent! We will get back to you soon.')
  }

  return (
    <>
      <PageHeader title="Contact Us" crumbs={[{ label: 'Contact' }]} subtitle="We’re here to help, 7 AM – 11 PM, all days." />
      <div className="container section contact">
        <div className="contact-info">
          <div className="card"><span className="feature-icon">📍</span><div><b>Visit us</b><p>12 MG Road, Bengaluru, Karnataka 560001</p></div></div>
          <div className="card"><span className="feature-icon">📞</span><div><b>Call us</b><p>+91 98765 43210</p></div></div>
          <div className="card"><span className="feature-icon">✉️</span><div><b>Email us</b><p>support@freshbasket.example</p></div></div>
          <div className="card"><span className="feature-icon">💬</span><div><b>WhatsApp</b><p>+91 98765 43210</p></div></div>
        </div>
        <form className="card form-grid" onSubmit={submit}>
          <h3 className="full">Send us a message</h3>
          <label>Name<input required name="name" /></label>
          <label>Email<input required type="email" name="email" /></label>
          <label className="full">Subject
            <select name="subject" defaultValue="Order issue">
              <option>Order issue</option>
              <option>Payment / Refund</option>
              <option>Product feedback</option>
              <option>Partner with us</option>
              <option>Other</option>
            </select>
          </label>
          <label className="full">Message<textarea required rows={5} name="message" /></label>
          <button className="btn btn-primary btn-lg full">Send Message</button>
          {sent && <p className="success-text full">✅ Thanks! Our team will reply within 24 hours.</p>}
        </form>
      </div>
    </>
  )
}
