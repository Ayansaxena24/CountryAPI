import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <App navigate={() => {}}/>
  </React.StrictMode>,
  document.getElementById('root')
)
