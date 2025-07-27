import Image from 'next/image'
import React from 'react'
import { PiArrowRight } from 'react-icons/pi'
import Card from './blogCard/Card'
import BlogCard from '../Blogs/BlogCard'

export default function Blog({blogs}) {
  
  return (
    <div className='max-w-[1540px]'>
        <div className='flex flex-col items-center justify-center text-sm my-12 py-12 px-4'>
            <h2 className='text-3xl mb-2'>Our Latest <span className='text-yellow-500'>Insights</span></h2>
            <p className='text-center max-w-[1000px] mb-6'>
              <span className='text-yellow-500 font-bold shadow-sm animate-pulse'>Normalize{" "}</span>
               the conversation through learning
            </p>

            <div className='w-full flex flex-wrap items-start justify-evenly gap-4'>
              {blogs?.map((blog) => (
                <BlogCard key={blog._id} data={blog}/>
              ))}
            </div>
        </div>
    </div>
  )
}
