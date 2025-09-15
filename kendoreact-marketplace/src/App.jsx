import './App.css'
import { useEffect, useState } from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import { AppBar, AppBarSection, AppBarSpacer } from '@progress/kendo-react-layout'
import { Switch } from '@progress/kendo-react-inputs'

import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import AdminPage from './pages/AdminPage'
import KnowledgePage from './pages/KnowledgePage'
import ServiceDetailPage from './pages/ServiceDetailPage'

function App() {
  const [dark, setDark] = useState(() => (
    typeof window !== 'undefined' ? (localStorage.getItem('theme') === 'dark') : false
  ))

  useEffect(() => {
    document.body.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  const linkStyle = ({ isActive }) => ({
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: 6,
    fontWeight: isActive ? 600 : 500,
    color: isActive ? 'var(--kendo-color-primary, #3f51b5)' : 'inherit',
  })

  return (
    <div>
      <AppBar>
        <AppBarSection>
          <span className="k-font-weight-bold">Kendo Marketplace</span>
        </AppBarSection>
        <AppBarSpacer style={{ width: 16 }} />
        <AppBarSection>
          <nav style={{ display: 'flex', gap: 8 }}>
            <NavLink to="/" style={linkStyle} end>Home</NavLink>
            <NavLink to="/search" style={linkStyle}>Search</NavLink>
            <NavLink to="/admin" style={linkStyle}>Admin</NavLink>
            <NavLink to="/knowledge" style={linkStyle}>Knowledge</NavLink>
          </nav>
        </AppBarSection>
        <AppBarSpacer style={{ flex: 1 }} />
        <AppBarSection>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="k-text-muted">Dark</span>
            <Switch checked={dark} onChange={(e) => setDark(e.value)} />
          </div>
        </AppBarSection>
      </AppBar>

      <main style={{ padding: 24 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/knowledge" element={<KnowledgePage />} />
          <Route path="/service/:id" element={<ServiceDetailPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
