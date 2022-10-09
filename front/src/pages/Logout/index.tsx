import React, { useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom"

import Auth from '../../contexts/Auth'

const index = () => {
  const { setIsAuthenticated } = useContext(Auth)
  let navigate = useNavigate()
  
  useEffect(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setIsAuthenticated(false)

    navigate("/login", { replace: true });
  }, [])

  return (
    <div>index</div>
  )
}

export default index