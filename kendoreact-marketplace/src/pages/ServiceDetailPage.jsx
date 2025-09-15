import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@progress/kendo-react-buttons'
import { Tooltip } from '@progress/kendo-react-tooltip'
import BookingDialog from '../components/BookingDialog'
import { SAMPLE_SERVICES } from '../data/sampleServices'

export default function ServiceDetailPage() {
  const { id } = useParams()
  const service = useMemo(() => SAMPLE_SERVICES.find(s => String(s.id) === String(id)), [id])
  const [selectedService, setSelectedService] = useState(null)

  if (!service) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Service not found</h2>
        <p>We couldn't find the service you're looking for.</p>
      </div>
    )
  }

  return (
    <div style={{ padding: 24 }}>
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
