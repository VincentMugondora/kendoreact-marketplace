import { useState } from 'react'
import './App.css'
import { Button } from '@progress/kendo-react-buttons'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: 24 }}>
      <h1>KendoReact + Vite</h1>
      <p>Theme loaded. Try the KendoReact button below:</p>
      <div className="card" style={{ marginTop: 12 }}>
        <Button themeColor="primary" onClick={() => setCount(count + 1)}>
          Clicked {count} times
        </Button>
      </div>
    </div>
  )
}

export default App
