'use client'

import BlogCard from '@/components/Pages/Blogs/BlogCard'
import PictureHero from '@/components/Constants/PictureHero'
import { API_URL } from '@/config/api.config'
import React from 'react'


async function getBlogs(){
  const res = await fetch(`${API_URL}/blogs`, {cache: "reload"})
  return res.json()
}
export default async function page() {

  const blogs = await getBlogs()
  
  return (
    <div className='flex flex-col w-full'>
      <PictureHero title='Our Insights' description='' imgPath='/assets/blogs/dis.jpg'  />
      <div className='w-full flex flex-col items-center justify-center my-12 px-4'>
        <div className='max-w-[1440px] flex flex-wrap  justify-center md:grid grid-cols-2 lg:grid-cols-3 w-full gap-4 md:gap-12'>
          {blogs?.data?.map((blog) => (
            <BlogCard key={blog._id} data={blog}/>
          ))}
        </div>
      </div>
    </div>
  )
}
