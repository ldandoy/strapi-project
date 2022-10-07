import { useState, useEffect } from 'react'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Default from './layouts/Default'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Default><Home /></Default>} />
      <Route path="/register" element={<Default><Register /></Default>} />
      <Route path="/login" element={<Default><Login /></Default>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
