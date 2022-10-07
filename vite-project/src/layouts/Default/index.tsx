import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";

const index = ({children} : {children: JSX.Element}) => {
    const [isAuth, setIsAuth] = useState<boolean>(false)

    /*useEffect(() => {
        is
    }, [])*/

    return (<>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
        </nav>
        <div className="container">
            {children}
        </div>
    </>)
}

export default index