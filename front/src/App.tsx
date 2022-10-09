import { useState, useEffect } from 'react'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import Default from './layouts/Default'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Profile from './pages/Profile'

import { hasAuthenticated } from './services/auth'
import Auth from './contexts/Auth'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated())

  return (
    <Auth.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Default privated={false} ><Home /></Default>} />
          <Route path="/register" element={<Default privated={false} ><Register /></Default>} />
          <Route path="/login" element={<Default privated={false} ><Login /></Default>} />
          <Route path="/logout" element={<Default privated={false} ><Logout /></Default>} />
          <Route path="/profile" element={<Default privated={true}><Profile /></Default>} />
        </Routes>
      </BrowserRouter>
    </Auth.Provider>
  )
}

export default App
