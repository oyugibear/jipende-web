'use client'

import PictureHero from '@/components/Constants/PictureHero'
import { API_URL } from '@/config/api.config'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

async function getBlog(productId) {
  const res = await fetch(`${API_URL}/blog/${productId}`, {cache: "no-store"})
  return res.json()
}

export default function page({params}) {
  const [data, setData] = useState({})
  const fetcher = async () => {
    const dt = await getBlog(params.id)
    setData(dt.data)
  } 

  useEffect(() => {
    fetcher()
  }, [])

  console.log(data)

  return (
    <div className='flex flex-col w-full items-center justify-center'>
      <PictureHero title={data.title} description={data.reading_time + " | Publisher: " + data.publisher} imgPath={data.picture} />
      <div className='flex flex-col max-w-[772px] my-12 p-4'>
        <p style={{ whiteSpace: 'pre-wrap' }}>{data.blog_text}</p>
        <div className='my-4 '>
          <p className='font-bold'>Author:</p>
          <p>{data.author}</p>
        </div>
      </div>
    </div>
  )
}
