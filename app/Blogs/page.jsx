'use client'

import BlogCard from '@/components/Pages/Blogs/BlogCard'
import PictureHero from '@/components/Constants/PictureHero'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { api } from '@/utils/api'

export default function page() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await api.get('/blogs')
        setBlogs(response.data || [])
      } catch (error) {
        console.error("Error fetching blogs:", error)
        setError("Failed to load blogs. Please try again later.")
        setBlogs([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchBlogs()
  }, [])
  
  return (
    <div className='flex flex-col w-full'>
      <PictureHero title='Our Insights' description='' imgPath='/assets/blogs/dis.jpg'  />
      <div className='w-full flex flex-col items-center justify-center my-12 px-4'>
        {loading && (
          <div className="text-center py-8">
            <p>Loading blogs...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-8 text-red-600">
            <p>{error}</p>
          </div>
        )}
        
        {!loading && !error && (
          <div className='max-w-[1440px] flex flex-wrap justify-center md:grid grid-cols-2 lg:grid-cols-3 w-full gap-4 md:gap-12'>
            {blogs?.map((blog) => (
              <BlogCard key={blog._id} data={blog}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
