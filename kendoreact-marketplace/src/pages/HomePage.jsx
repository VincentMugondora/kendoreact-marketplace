import { useMemo, useState } from 'react'
import { Input } from '@progress/kendo-react-inputs'
import { AutoComplete } from '@progress/kendo-react-dropdowns'
import { ListView } from '@progress/kendo-react-listview'
import { Button } from '@progress/kendo-react-buttons'
import { Tooltip } from '@progress/kendo-react-tooltip'
import BookingDialog from '../components/BookingDialog'
import { SAMPLE_SERVICES } from '../data/sampleServices'

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [selectedService, setSelectedService] = useState(null)

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
        <Tooltip anchorElement="target" position="top">
          <Button themeColor="primary" onClick={() => setSelectedService(s)} title="Book this service">
            Book Now
          </Button>
        </Tooltip>
      </div>
    )
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <h2>Find your next service</h2>
        <div style={{ display: 'flex', gap: 12, maxWidth: 640 }}>
          <Input value={query} onChange={(e) => setQuery(e.value)} placeholder="Search services..." />
          <AutoComplete
            data={serviceNames}
            placeholder="Quick select..."
            value={query}
            onChange={(e) => setQuery(e.value)}
            suggest
            style={{ width: 260 }}
          />
        </div>
      </div>

      <ListView data={filtered} item={Item} style={{ maxWidth: 860 }} />

      <BookingDialog
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onConfirm={(payload) => {
          console.log('booking', payload)
          setSelectedService(null)
          alert('Booking confirmed!')
        }}
      />
    </div>
  )
}
