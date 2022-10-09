import React, {useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import FormLogin from '../../components/FormLogin'
import Auth from '../../contexts/Auth'

const index = () => {
  const { isAuthenticated } = useContext(Auth)
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [history, isAuthenticated])

  return (
    <div className="register">
        <FormLogin />
    </div>
  )
}

export default index