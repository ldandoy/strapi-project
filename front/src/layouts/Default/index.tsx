import { useContext, ReactNode, useEffect, useState } from 'react'
import { Link, Navigate } from "react-router-dom";

import Auth from '../../contexts/Auth';

const index = ({children, privated } : {children: ReactNode, privated?: boolean}) => {
    const { isAuthenticated } = useContext(Auth)
    const [showChildren, setShowchildren] = useState(false)

    useEffect(() => {
        setShowchildren(false)
        if( !privated ) {
            setShowchildren(true)
        } else {
            if (isAuthenticated) {
                setShowchildren(true)
            }
        }
    }, [children])

    return (<>
        <nav>
            <Link to="/">Home</Link>
            { (!isAuthenticated && (
                <>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </>
            ) || (
                <>
                    <Link to="/profile">Mon compte</Link>
                    <Link to="/logout">Déconnexion</Link>
                </>
            ))}
        </nav>
        <div className="container">
            { showChildren ? children : <Navigate to="/login" replace={true} /> }
        </div>
    </>)
}

export default index