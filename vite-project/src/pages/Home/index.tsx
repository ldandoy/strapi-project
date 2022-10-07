import React, { useState, useEffect } from 'react'

import {getPage} from "../../services/page"
import Page from "../../types/Page"

const index = () => {
    const [page, setPage] = useState<Page>();

    useEffect(() => {
      const getData = async () => {
        const page:Page = await getPage(1)
        setPage(page)
      }
  
      getData()
    }, [])
  
    return (<>
        {page && <>
          <div>{page.name}</div>
          <div>{page.description}</div>
        </>}
    </>)
}

export default index