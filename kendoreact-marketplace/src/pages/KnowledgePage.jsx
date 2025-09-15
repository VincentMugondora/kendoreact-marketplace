import { useState } from 'react'
import { Input } from '@progress/kendo-react-inputs'
import { Button } from '@progress/kendo-react-buttons'

export default function KnowledgePage() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])

  const onSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    // Mock a call to an external API like Nuclia. Replace with a real API call later.
    await new Promise((r) => setTimeout(r, 800))
    setResults([
      {
        id: 1,
        answer: `Answer for: ${query}`,
        sources: [
          { title: 'Sample Doc 1', url: 'https://docs.nuclia.dev' },
          { title: 'KendoReact Docs', url: 'https://www.telerik.com/kendo-react-ui/components/' }
        ]
      }
    ])
    setLoading(false)
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Knowledge Center</h2>
      <p className="k-text-secondary">Ask product questions. This page can later integrate Nuclia for RAG search.</p>
      <div style={{ display: 'flex', gap: 12, maxWidth: 720, marginTop: 12 }}>
        <Input
          value={query}
          onChange={(e) => setQuery(e.value)}
          placeholder="Ask a question..."
          onKeyDown={(e) => { if (e.key === 'Enter') onSearch() }}
        />
        <Button themeColor="primary" onClick={onSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </div>

      <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
        {results.map((r) => (
          <div key={r.id} className="k-card" style={{ padding: 16 }}>
            <div className="k-card-title" style={{ marginBottom: 8 }}>Answer</div>
            <div style={{ marginBottom: 8 }}>{r.answer}</div>
            <div className="k-text-muted">Sources:</div>
            <ul>
              {r.sources.map((s, idx) => (
                <li key={idx}><a href={s.url} target="_blank" rel="noreferrer">{s.title}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
