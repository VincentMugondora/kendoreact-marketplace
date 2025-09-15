import { useState } from 'react'
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs'
import { DatePicker, TimePicker } from '@progress/kendo-react-dateinputs'
import { Input } from '@progress/kendo-react-inputs'
import { Button } from '@progress/kendo-react-buttons'

export default function BookingDialog({ service, onClose, onConfirm }) {
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')

  if (!service) return null

  const handleConfirm = () => {
    onConfirm?.({ service, date, time, name, contact })
  }

  return (
    <Dialog title={`Book: ${service.name}`} onClose={onClose} width={480}>
      <div style={{ display: 'grid', gap: 12 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 4 }}>Date</label>
          <DatePicker value={date} onChange={(e) => setDate(e.value)} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 4 }}>Time</label>
          <TimePicker value={time} onChange={(e) => setTime(e.value)} format="hh:mm a" />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 4 }}>Name</label>
          <Input value={name} onChange={(e) => setName(e.value)} placeholder="Your name" />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 4 }}>Contact</label>
          <Input value={contact} onChange={(e) => setContact(e.value)} placeholder="Email or phone" />
        </div>
      </div>
      <DialogActionsBar>
        <Button onClick={onClose}>Cancel</Button>
        <Button themeColor="primary" onClick={handleConfirm} disabled={!name || !contact}>Confirm</Button>
      </DialogActionsBar>
    </Dialog>
  )
}
