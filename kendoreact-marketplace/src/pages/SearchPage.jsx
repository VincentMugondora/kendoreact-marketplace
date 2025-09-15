import { useMemo, useState } from 'react'
import { Grid, GridColumn } from '@progress/kendo-react-grid'
import { DropDownList } from '@progress/kendo-react-dropdowns'
import { NumericTextBox } from '@progress/kendo-react-inputs'
import { Button } from '@progress/kendo-react-buttons'
import { Tooltip } from '@progress/kendo-react-tooltip'
import { DatePicker } from '@progress/kendo-react-dateinputs'
import { Link } from 'react-router-dom'
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs'
import BookingDialog from '../components/BookingDialog'
import { SAMPLE_SERVICES, CATEGORIES } from '../data/sampleServices'

export default function SearchPage() {
  const [category, setCategory] = useState('All')
  const [maxPrice, setMaxPrice] = useState()
  const [selectedService, setSelectedService] = useState(null)
  const [confirmed, setConfirmed] = useState(null)

  const filtered = useMemo(() => {
    return SAMPLE_SERVICES.filter((s) => {
      const byCat = category === 'All' || s.category === category
      const byPrice = !maxPrice || s.price <= maxPrice
      return byCat && byPrice
    })
  }, [category, maxPrice])

  const BookCell = (props) => {
    const s = props.dataItem
    return (
      <td>
        <div style={{ display: 'flex', gap: 8 }}>
          <Tooltip anchorElement="target" position="top">
            <Button themeColor="primary" size="small" onClick={() => setSelectedService(s)} title="Book this service">
              Book
            </Button>
          </Tooltip>
          <Link to={`/service/${s.id}`} style={{ textDecoration: 'none' }}>
            <Button size="small">Details</Button>
          </Link>
        </div>
      </td>
    )
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Search Services</h2>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
        <label>Category</label>
        <DropDownList
          data={CATEGORIES}
          value={category}
          onChange={(e) => setCategory(e.value)}
          style={{ width: 200 }}
        />
        <label>Max Price</label>
        <NumericTextBox
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.value)}
          min={0}
          step={5}
          format="$#,##0"
          placeholder="Any"
          style={{ width: 160 }}
        />
        <label>Date</label>
        <DatePicker style={{ width: 180 }} />
        <Button onClick={() => { setCategory('All'); setMaxPrice(undefined) }}>Reset</Button>
      </div>

      <Grid data={filtered} style={{ maxWidth: 1000 }}>
        <GridColumn field="name" title="Name" width="240" />
        <GridColumn field="category" title="Category" width="140" />
        <GridColumn field="price" title="Price" width="120" />
        <GridColumn field="rating" title="Rating" width="120" />
        <GridColumn title="Actions" cell={BookCell} width="140" />
      </Grid>

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
