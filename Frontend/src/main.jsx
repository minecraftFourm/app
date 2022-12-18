import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter  } from 'react-router-dom'
import { UserContext } from './Contexts/UserContext'
import Fetch from './Contexts/Fetch'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <UserContext>
        <Fetch>
          <App />
        </Fetch>
      </UserContext>
    </BrowserRouter>
  // </React.StrictMode>
)
