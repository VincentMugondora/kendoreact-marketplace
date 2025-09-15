import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@progress/kendo-react-buttons'
import { Tooltip } from '@progress/kendo-react-tooltip'
import BookingDialog from '../components/BookingDialog'
import { SAMPLE_SERVICES } from '../data/sampleServices'
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout'
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs'

export default function ServiceDetailPage() {
  const { id } = useParams()
  const service = useMemo(() => SAMPLE_SERVICES.find(s => String(s.id) === String(id)), [id])
  const [selectedService, setSelectedService] = useState(null)
  const [confirmed, setConfirmed] = useState(null)
  const [tab, setTab] = useState(0)

  if (!service) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Service not found</h2>
        <p>We couldn't find the service you're looking for.</p>
      </div>
    )
  }

  return (
    <div className="container" style={{ paddingTop: 24, paddingBottom: 24 }}>
      <div className="k-card" style={{ padding: 16, maxWidth: 900 }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <img src={service.image} alt={service.name} width={320} height={200} style={{ objectFit: 'cover', borderRadius: 8 }} />
          <div style={{ flex: 1, minWidth: 260 }}>
            <h2 className="k-card-title" style={{ marginTop: 0 }}>{service.name}</h2>
            <div className="k-text-muted">Category: {service.category}</div>
            <div style={{ marginTop: 8 }}>
              <strong>Price:</strong> ${service.price}
            </div>
            <div style={{ marginTop: 8 }}>
              <strong>Rating:</strong> {service.rating}
            </div>
            <p style={{ marginTop: 12 }}>{service.description}</p>
            <Tooltip anchorElement="target" position="top">
              <Button themeColor="primary" onClick={() => setSelectedService(service)} title="Book this service">Book Now</Button>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="k-card" style={{ padding: 16, marginTop: 16, maxWidth: 900 }}>
        <TabStrip selected={tab} onSelect={(e) => setTab(e.selected)}>
          <TabStripTab title="Description">
            <div style={{ padding: '12px 0' }}>
              <p>{service.description}</p>
            </div>
          </TabStripTab>
          <TabStripTab title="Reviews">
            <div style={{ padding: '12px 0' }}>
              <ul style={{ margin: 0 }}>
                <li>★★★★★ — “Excellent service and punctual!”</li>
                <li>★★★★★ — “Great value for money.”</li>
                <li>★★★★☆ — “Friendly and professional.”</li>
              </ul>
            </div>
          </TabStripTab>
        </TabStrip>
      </div>

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
