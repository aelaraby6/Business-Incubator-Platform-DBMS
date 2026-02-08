import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    // Listen for test-event from main process
    if (window.electron) {
      window.electron.on('test-event', (data) => {
        console.log('App received test-event:', data)
        setMessages(prev => [...prev, { type: 'from-main', data }])
      })

      window.electron.on('test-response', (data) => {
        console.log('App received test-response:', data)
        setMessages(prev => [...prev, { type: 'from-main', data }])
      })
    }
  }, [])

  const sendTestMessage = () => {
    if (window.electron && inputValue.trim()) {
      console.log('Sending message:', inputValue)
      window.electron.send('test-channel', { userMessage: inputValue })
      setMessages(prev => [...prev, { type: 'to-main', data: { userMessage: inputValue } }])
      setInputValue('')
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Electron</h1>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <div className="card" style={{ marginTop: '2rem', textAlign: 'left', maxHeight: '300px', overflow: 'auto' }}>
        <h2>Electron IPC Test</h2>
        
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendTestMessage()}
            placeholder="Enter a test message"
            style={{ padding: '0.5rem', width: '80%' }}
          />
          <button onClick={sendTestMessage} style={{ marginLeft: '0.5rem', padding: '0.5rem' }}>
            Send to Main
          </button>
        </div>

        <div style={{ 
          background: '#1e1e1e', 
          padding: '1rem', 
          borderRadius: '4px',
          maxHeight: '200px',
          overflow: 'auto',
          color: '#e0e0e0'
        }}>
          <h3>Messages:</h3>
          {messages.length === 0 ? (
            <p style={{ color: '#888' }}>Waiting for messages...</p>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} style={{ 
                marginBottom: '0.5rem', 
                padding: '0.5rem',
                background: msg.type === 'from-main' ? '#1e3a8a' : '#3f0f5c',
                borderLeft: `4px solid ${msg.type === 'from-main' ? '#60a5fa' : '#c4b5fd'}`,
                borderRadius: '2px'
              }}>
                <strong>{msg.type === 'from-main' ? '📨 From Main:' : '📤 To Main:'}</strong>
                <pre style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', overflow: 'auto', color: '#e0e0e0' }}>
                  {JSON.stringify(msg.data, null, 2)}
                </pre>
              </div>
            ))
          )}
        </div>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App