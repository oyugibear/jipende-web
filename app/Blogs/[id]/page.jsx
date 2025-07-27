'use client'

import PictureHero from '@/components/Constants/PictureHero'
import { API_URL } from '@/config/api.config'
import React, { useEffect, useState } from 'react'

async function getBlog(productId) {
  const res = await fetch(`${API_URL}/blogs/${productId}`, { cache: "no-store" })
  return res.json()
}

export default function Page({ params }) {
  const [data, setData] = useState({})
  
  const fetcher = async () => {
    const dt = await getBlog(params.id)
    setData(dt.data)
  }

  useEffect(() => {
    fetcher()
  }, [params.id])

  return (
    <div className='flex flex-col w-full items-center justify-center'>
    <PictureHero title={data.title} description={`${data.reading_time} | Author: ${data.author} | Publisher: ${data.publisher}`} imgPath={data.picture} />
      <div className='flex flex-col max-w-[772px] my-12 p-4'>
        <p style={{ whiteSpace: 'pre-wrap' }}>{data.blog_text}</p>
        <div className='my-4'>
          <p className='font-bold'>Author:</p>
          <p>{data.author}</p>
          <p className='italic text-xs'>{data.about_author}</p>
        </div>
      </div>
    </div>
  )
}