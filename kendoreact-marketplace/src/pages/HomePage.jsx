import { useMemo, useState } from 'react'
import { Input } from '@progress/kendo-react-inputs'
import { AutoComplete } from '@progress/kendo-react-dropdowns'
import { ListView } from '@progress/kendo-react-listview'
import { Button } from '@progress/kendo-react-buttons'
import { Tooltip } from '@progress/kendo-react-tooltip'
import { Link } from 'react-router-dom'
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs'
import BookingDialog from '../components/BookingDialog'
import { SAMPLE_SERVICES } from '../data/sampleServices'

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [selectedService, setSelectedService] = useState(null)
  const [confirmed, setConfirmed] = useState(null)

  const serviceNames = useMemo(() => SAMPLE_SERVICES.map((s) => s.name), [])
  const filtered = useMemo(() => {
    if (!query) return SAMPLE_SERVICES.slice(0, 6)
    const q = query.toLowerCase()
    return SAMPLE_SERVICES.filter(
      (s) => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
    )
  }, [query])

  const Item = (props) => {
    const s = props.dataItem
    return (
      <div className="k-card" style={{ padding: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
        <img src={s.image} alt={s.name} width={100} height={60} style={{ objectFit: 'cover', borderRadius: 6 }} />
        <div style={{ flex: 1 }}>
          <div className="k-card-title">{s.name}</div>
          <div className="k-text-secondary">{s.description}</div>
          <div className="k-text-muted">Category: {s.category} • ${s.price}</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Tooltip anchorElement="target" position="top">
            <Button themeColor="primary" onClick={() => setSelectedService(s)} title="Book this service">
              Book Now
            </Button>
          </Tooltip>
          <Link to={`/service/${s.id}`} style={{ textDecoration: 'none' }}>
            <Button>Details</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{ paddingTop: 24, paddingBottom: 24 }}>
      <section className="hero">
        <h1>Find services. Book instantly.</h1>
        <p>Discover high‑quality services near you. Search by name or category and book in seconds.</p>
        <div style={{ display: 'flex', gap: 12, maxWidth: 720, flexWrap: 'wrap' }}>
          <Input value={query} onChange={(e) => setQuery(e.value)} placeholder="Search services..." />
          <AutoComplete
            data={serviceNames}
            placeholder="Quick select..."
            value={query}
            onChange={(e) => setQuery(e.value)}
            suggest
            style={{ width: 260 }}
          />
          <Link to="/search" style={{ textDecoration: 'none' }}>
            <Button themeColor="primary">Explore Marketplace</Button>
          </Link>
        </div>
      </section>

      <h3 style={{ marginTop: 24, marginBottom: 12 }}>Featured services</h3>
      <ListView data={filtered} item={Item} style={{ maxWidth: 980 }} />

      <BookingDialog
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onConfirm={(payload) => {
          console.log('booking', payload)
          setSelectedService(null)
          setConfirmed(payload)
        }}
      />

      {confirmed && (
        <Dialog title="Booking Confirmed" onClose={() => setConfirmed(null)} width={420}>
          <div style={{ display: 'grid', gap: 8 }}>
            <div>
              Your booking for <strong>{confirmed.service.name}</strong> is confirmed.
            </div>
            <div className="k-text-muted">
              Date: {confirmed.date?.toLocaleDateString?.() || String(confirmed.date)}
              <br />
              Time: {confirmed.time?.toLocaleTimeString?.([], { hour: '2-digit', minute: '2-digit' }) || String(confirmed.time)}
            </div>
          </div>
          <DialogActionsBar>
            <Button themeColor="primary" onClick={() => setConfirmed(null)}>OK</Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  )
}
