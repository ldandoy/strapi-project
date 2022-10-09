import React, { useState, useEffect } from 'react'

import User from "../../types/User"

const index = () => {
  const [user, setUser] = useState<User|null>(null)

  useEffect(() => {
    let stored = localStorage.getItem('user')
    let parsed = stored ? JSON.parse(stored) : null
    setUser(parsed)
  }, [])

  return (
    <div>Bienvenue {user && user.username} !</div>
  )
}

export default index