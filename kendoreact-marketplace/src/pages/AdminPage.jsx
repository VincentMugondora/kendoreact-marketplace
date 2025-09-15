import { useMemo, useState } from 'react'
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout'
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid'
import { Button } from '@progress/kendo-react-buttons'
import { NumericTextBox, Input } from '@progress/kendo-react-inputs'
import { DropDownList } from '@progress/kendo-react-dropdowns'
import { SAMPLE_SERVICES, CATEGORIES } from '../data/sampleServices'

export default function AdminPage() {
  const [selected, setSelected] = useState(0)

  return (
    <div style={{ padding: 24 }}>
      <h2>Admin Dashboard</h2>
      <TabStrip selected={selected} onSelect={(e) => setSelected(e.selected)}>
        <TabStripTab title="Services">
          <ServicesTab />
        </TabStripTab>
        <TabStripTab title="Users">
          <UsersTab />
        </TabStripTab>
        <TabStripTab title="Analytics">
          <AnalyticsTab />
        </TabStripTab>
      </TabStrip>
    </div>
  )
}

function ServicesTab() {
  const [data, setData] = useState(() => SAMPLE_SERVICES.map(s => ({ ...s, inEdit: false })))
  const categories = useMemo(() => CATEGORIES.filter(c => c !== 'All'), [])
  const editField = 'inEdit'

  const itemChange = (e) => {
    const { dataItem, field, value } = e
    setData(prev => prev.map(item => (item.id === dataItem.id ? { ...item, [field]: value } : item)))
  }

  const addNew = () => {
    const newId = (data.reduce((max, it) => Math.max(max, it.id), 0) || 0) + 1
    setData([{ id: newId, name: '', category: categories[0] || 'General', price: 0, rating: 0, description: '', image: '', inEdit: true, isNew: true }, ...data])
  }

  const edit = (dataItem) => {
    dataItem[editField] = true
    setData([...data])
  }

  const save = (dataItem) => {
    dataItem[editField] = false
    dataItem.isNew = false
    setData([...data])
  }

  const cancel = (dataItem) => {
    if (dataItem.isNew) {
      setData(data.filter(d => d.id !== dataItem.id))
    } else {
      dataItem[editField] = false
      setData([...data])
    }
  }

  const remove = (dataItem) => {
    setData(data.filter(d => d.id !== dataItem.id))
  }

  const CommandCell = (props) => {
    const { dataItem } = props
    return (
      <td>
        {dataItem[editField] ? (
          <>
            <Button themeColor="primary" size="small" onClick={() => save(dataItem)} style={{ marginRight: 8 }}>Save</Button>
            <Button size="small" onClick={() => cancel(dataItem)}>Cancel</Button>
          </>
        ) : (
          <>
            <Button size="small" onClick={() => edit(dataItem)} style={{ marginRight: 8 }}>Edit</Button>
            <Button themeColor="error" size="small" onClick={() => remove(dataItem)}>Remove</Button>
          </>
        )}
      </td>
    )
  }

  const CategoryCell = (props) => {
    const { dataItem, field } = props
    return (
      <td>
        {dataItem[editField] ? (
          <DropDownList
            data={categories}
            value={dataItem[field]}
            onChange={(e) => itemChange({ dataItem, field, value: e.value })}
            style={{ width: '100%' }}
          />
        ) : (
          <span>{dataItem[field]}</span>
        )}
      </td>
    )
  }

  const TextCell = (props) => {
    const { dataItem, field } = props
    return (
      <td>
        {dataItem[editField] ? (
          <Input
            value={dataItem[field]}
            onChange={(e) => itemChange({ dataItem, field, value: e.value })}
          />
        ) : (
          <span>{dataItem[field]}</span>
        )}
      </td>
    )
  }

  const NumericCell = (props) => {
    const { dataItem, field } = props
    return (
      <td>
        {dataItem[editField] ? (
          <NumericTextBox
            value={dataItem[field]}
            onChange={(e) => itemChange({ dataItem, field, value: e.value })}
            min={0}
            step={5}
            format="$#,##0.##"
            width="100%"
          />
        ) : (
          <span>{dataItem[field]}</span>
        )}
      </td>
    )
  }

  return (
    <div>
      <Grid
        data={data}
        editField={editField}
        onItemChange={itemChange}
        style={{ maxWidth: 1100 }}
      >
        <GridToolbar>
          <Button themeColor="primary" onClick={addNew}>Add Service</Button>
        </GridToolbar>
        <GridColumn field="name" title="Name" cell={TextCell} width="220" />
        <GridColumn field="category" title="Category" cell={CategoryCell} width="160" />
        <GridColumn field="price" title="Price" cell={NumericCell} width="140" />
        <GridColumn field="rating" title="Rating" cell={NumericCell} width="140" />
        <GridColumn field="description" title="Description" cell={TextCell} width="300" />
        <GridColumn title="Actions" cell={CommandCell} width="220" />
      </Grid>
    </div>
  )
}

function UsersTab() {
  const [users] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', bookings: 3 },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', bookings: 1 },
    { id: 3, name: 'Charlie Lee', email: 'charlie@example.com', bookings: 5 }
  ])
  return (
    <Grid data={users} style={{ maxWidth: 800 }}>
      <GridColumn field="name" title="Name" width="220" />
      <GridColumn field="email" title="Email" width="280" />
      <GridColumn field="bookings" title="Bookings" width="140" />
    </Grid>
  )
}

function AnalyticsTab() {
  const [services] = useState(SAMPLE_SERVICES)
  const stats = useMemo(() => {
    const totalBookings = services.length * 4 // mock
    const totalRevenue = services.reduce((sum, s) => sum + s.price * 4, 0)
    const topService = services[0]?.name ?? 'N/A'
    return { totalBookings, totalRevenue, topService }
  }, [services])

  const Card = ({ title, value }) => (
    <div className="k-card" style={{ padding: 16, minWidth: 240 }}>
      <div className="k-card-title" style={{ marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 24, fontWeight: 600 }}>{value}</div>
    </div>
  )

  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8 }}>
      <Card title="Total Bookings" value={stats.totalBookings} />
      <Card title="Est. Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} />
      <Card title="Top Service" value={stats.topService} />
    </div>
  )
}
