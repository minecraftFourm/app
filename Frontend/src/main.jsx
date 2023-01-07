import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter  } from 'react-router-dom'
import { UserContext } from './Contexts/UserContext'
import Fetch from './Contexts/Fetch'
import Editor from './Components/Editor'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContext>
        <Editor>
          <Fetch>
            <App />
          </Fetch>
        </Editor>
      </UserContext>
    </BrowserRouter>
  </React.StrictMode>
)
