import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { img } from '../data/products'

const team = [
  { name: 'Arjun Mehta', role: 'Founder & CEO', color: '#0c831f' },
  { name: 'Sneha Rao', role: 'Head of Sourcing', color: '#ff7a00' },
  { name: 'Vikram Singh', role: 'Operations Lead', color: '#2563eb' },
  { name: 'Meera Iyer', role: 'Customer Happiness', color: '#db2777' },
]

const collage = ['tomatoes', 'broccoli', 'banana', 'paneer', 'basmati-rice', 'strawberries']

export default function About() {
  return (
    <>
      <PageHeader title="About Us" crumbs={[{ label: 'About' }]} />
      <div className="container section about">
        <div className="about-grid">
          <div>
            <span className="pill">Our story</span>
            <h2>Bringing the farm to your doorstep since 2020</h2>
            <p>
              FreshBasket started with a simple idea — everyone deserves fresh, healthy
              groceries without the hassle of crowded markets. We partner directly with
              over 500 local farmers so you get produce that was harvested just hours ago.
            </p>
            <p>
              Today we serve more than 10,000 families every day with fruits, vegetables,
              dairy, staples and household essentials — delivered in 30 minutes.
            </p>
            <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
          </div>
          <div className="about-art">
            {collage.map((s) => (
              <img key={s} src={img(s)} alt="" loading="lazy" />
            ))}
          </div>
        </div>

        <div className="stats-band">
          <div><b>500+</b><span>Partner farmers</span></div>
          <div><b>10k+</b><span>Daily orders</span></div>
          <div><b>25</b><span>Cities</span></div>
          <div><b>30 min</b><span>Avg. delivery</span></div>
        </div>

        <div className="values">
          <div className="card"><span className="feature-icon">🌱</span><h3>Freshness first</h3><p>Every item is quality checked before it leaves our store.</p></div>
          <div className="card"><span className="feature-icon">🤝</span><h3>Fair to farmers</h3><p>We pay farmers fairly and on time, cutting out middlemen.</p></div>
          <div className="card"><span className="feature-icon">♻️</span><h3>Sustainable</h3><p>Plastic-free packaging and electric delivery bikes.</p></div>
        </div>

        <h2 className="center">Meet our team</h2>
        <div className="team">
          {team.map((t) => (
            <div key={t.name} className="card team-card">
              <span className="avatar" style={{ background: t.color }}>
                {t.name.split(' ').map((w) => w[0]).join('')}
              </span>
              <b>{t.name}</b>
              <span className="muted">{t.role}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
