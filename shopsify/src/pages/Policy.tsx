import { useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import NotFound from './NotFound'

const policies: Record<string, { title: string; sections: { h: string; p: string }[] }> = {
  shipping: {
    title: 'Shipping Policy',
    sections: [
      { h: 'Delivery areas', p: 'We deliver across 25 cities in India. Serviceability is confirmed using your pincode at checkout.' },
      { h: 'Delivery time', p: 'Express orders are delivered within 30 minutes. Scheduled orders are delivered within the slot you select.' },
      { h: 'Delivery charges', p: 'Free delivery on orders of ₹499 and above. A flat ₹40 fee applies to smaller orders.' },
    ],
  },
  returns: {
    title: 'Returns & Refunds',
    sections: [
      { h: 'Fresh produce', p: 'If fruits, vegetables or dairy are damaged or not fresh, report within 48 hours for a full refund or replacement.' },
      { h: 'Packaged goods', p: 'Unopened packaged items can be returned within 7 days of delivery.' },
      { h: 'Refund timeline', p: 'Refunds are processed within 24 hours to your original payment method; banks may take 3–5 working days.' },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    sections: [
      { h: 'Information we collect', p: 'We collect your name, contact details and address to process and deliver your orders.' },
      { h: 'How we use it', p: 'Your data is used only to fulfil orders, provide support and — with your consent — send offers.' },
      { h: 'Your rights', p: 'You can request a copy of your data or ask us to delete your account at any time by contacting support.' },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    sections: [
      { h: 'Use of service', p: 'By using FreshBasket you agree to provide accurate information and use the service lawfully.' },
      { h: 'Pricing', p: 'Prices and availability may change without notice. The price at the time of order placement applies.' },
      { h: 'Cancellations', p: 'Orders can be cancelled free of charge before they are packed.' },
    ],
  },
}

export default function Policy() {
  const { slug } = useParams()
  const policy = slug ? policies[slug] : undefined
  if (!policy) return <NotFound />

  return (
    <>
      <PageHeader title={policy.title} crumbs={[{ label: policy.title }]} subtitle="Last updated: November 2026" />
      <div className="container narrow section policy">
        {policy.sections.map((s) => (
          <section key={s.h}>
            <h3>{s.h}</h3>
            <p>{s.p}</p>
          </section>
        ))}
      </div>
    </>
  )
}
