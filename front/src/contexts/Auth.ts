import {createContext} from 'react'

export default createContext({
    isAuthenticated: false,
    setIsAuthenticated: (value: boolean) => {}
})