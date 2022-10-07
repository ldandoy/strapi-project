import axios from 'axios'

import Page from "../types/Page"

export const getPage = async (id: number): Promise<Page> => {
    const res = await axios.get(`http://localhost:1337/page/${id}`)
    return res.data
}