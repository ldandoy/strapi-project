import { useContext, ReactNode } from 'react'
import {
    Route,
    Navigate,
    RouteObject
  } from "react-router-dom";

import Auth from '../../contexts/Auth'

const index  = ({ path, element }: {path: string, element: ReactNode}) : JSX.Element => {
    const {isAuthenticated} = useContext(Auth)

    return isAuthenticated ? (
        <Route path={path} element={element} />
    ) : (
        <Navigate to="/login" />
    )
}

export default index