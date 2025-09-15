import { useMemo, useState } from 'react'
import { Grid, GridColumn } from '@progress/kendo-react-grid'
import { DropDownList } from '@progress/kendo-react-dropdowns'
import { NumericTextBox } from '@progress/kendo-react-inputs'
import { Button } from '@progress/kendo-react-buttons'
import { Tooltip } from '@progress/kendo-react-tooltip'
import BookingDialog from '../components/BookingDialog'
import { SAMPLE_SERVICES, CATEGORIES } from '../data/sampleServices'

export default function SearchPage() {
  const [category, setCategory] = useState('All')
  const [maxPrice, setMaxPrice] = useState()
  const [selectedService, setSelectedService] = useState(null)

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
        <Tooltip anchorElement="target" position="top">
          <Button themeColor="primary" size="small" onClick={() => setSelectedService(s)} title="Book this service">
            Book
          </Button>
        </Tooltip>
      </td>
    )
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Search Services</h2>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
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
          alert('Booking confirmed!')
        }}
      />
    </div>
  )
}
