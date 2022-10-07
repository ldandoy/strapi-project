import axios from 'axios'

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

        console.log('====================================');
        console.log(res.data);
        console.log('====================================');

        return res.data
    } catch(error:any) {
        console.log('An error occurred:', error.response);
        return error.response.data
    }
}