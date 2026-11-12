import { Link } from 'react-router-dom'

type Crumb = { label: string; to?: string }

export default function PageHeader({ title, crumbs = [], subtitle }: { title: string; crumbs?: Crumb[]; subtitle?: string }) {
  return (
    <div className="page-header">
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label}>
              {' / '}
              {c.to ? <Link to={c.to}>{c.label}</Link> : c.label}
            </span>
          ))}
        </nav>
        <h1>{title}</h1>
        {subtitle && <p className="muted">{subtitle}</p>}
      </div>
    </div>
  )
}
