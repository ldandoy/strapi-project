import React, {useState, FormEvent, ChangeEvent} from 'react'
import { useNavigate } from "react-router-dom";

import {RegisterForm} from '../../types/Form'
import {register} from '../../services/auth'

const index = () => {
  const [form, setform] = useState<RegisterForm>({
    username: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState(null)
  let navigate = useNavigate()

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    setform({...form, [name]: value})
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const res = await register(form)

    if (res.error) {
      setError(res.error.message);
    } else {
      // SetUp the user
      navigate("/login", { replace: true });
    }
  }

  return (
    <div>
      <h1>Form register</h1>

      {error && <>
        {error}
      </>}

      <form onSubmit={onSubmit}>
      <div>
          <label>Username</label>
          <input type="text" name="username" value={form.username} onChange={onChangeInput} />
        </div>

        <div>
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={onChangeInput} />
        </div>

        <div>
          <label>Mot de passe</label>
          <input type="password" name="password" value={form.password} onChange={onChangeInput} />
        </div>

        <div>
          <input type="submit" value="créer" />
        </div>
      </form>
    </div>
  )
}

export default index