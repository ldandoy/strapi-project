import axios from 'axios'
import jwtDecode, { JwtPayload } from 'jwt-decode';

import {RegisterForm, LoginForm} from '../types/Form'

export const register = async (form: RegisterForm): Promise<any> => {
    try {
        const res = await axios.post(
            `http://localhost:1337/api/auth/local/register`, 
            form
        )

        console.log('====================================');
        console.log(res.data);
        console.log('====================================');

        return res.data
    } catch(error:any) {
        console.log('An error occurred:', error.response);
        return error.response.data
    }
}

export const login = async (form: LoginForm): Promise<any> => {
    try {
        const res = await axios.post(
            `http://localhost:1337/api/auth/local`, 
            form
        )
        return res.data
    } catch(error:any) {
        console.log('An error occurred:', error.response);
        return error.response.data
    }
}

export const hasAuthenticated = () => {
    const token = localStorage.getItem('token')

    const result = token ? tokenIsValid(token) : false

    if (result === false) {
        localStorage.removeItem('token')
    }
    
    return result
}

const tokenIsValid = (token: string) => {
    const { exp } = jwtDecode<JwtPayload>(token)

    if (typeof exp !== 'undefined' && exp * 1000 > new Date().getTime()) {
        return true
    }

    return false
}