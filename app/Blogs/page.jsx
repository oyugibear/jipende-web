'use client'

import BlogCard from '@/components/Pages/Blogs/BlogCard'
import PictureHero from '@/components/Constants/PictureHero'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { api } from '@/utils/api'
import { PiArticle, PiEye, PiHeart, PiMagnifyingGlass, PiCalendar } from 'react-icons/pi'
import { FiSearch, FiBookOpen, FiRefreshCw } from 'react-icons/fi'

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredBlogs, setFilteredBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await api.get('/blogs')
        const blogData = response.data || []
        setBlogs(blogData)
        setFilteredBlogs(blogData)
      } catch (error) {
        console.error("Error fetching blogs:", error)
        setError("Failed to load blogs. Please try again later.")
        setBlogs([])
        setFilteredBlogs([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchBlogs()
  }, [])

  // Filter blogs based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredBlogs(blogs)
    } else {
      const filtered = blogs.filter(blog =>
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredBlogs(filtered)
    }
  }, [searchTerm, blogs])

  const handleRetry = () => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await api.get('/blogs')
        const blogData = response.data || []
        setBlogs(blogData)
        setFilteredBlogs(blogData)
      } catch (error) {
        console.error("Error fetching blogs:", error)
        setError("Failed to load blogs. Please try again later.")
        setBlogs([])
        setFilteredBlogs([])
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }
  
  return (
    <div className='flex flex-col w-full min-h-screen '>
      <PictureHero 
        title='Our Insights & Wellness Blog' 
        description='Discover expert tips, wellness advice, and inspiring stories to enhance your journey to better health and happiness.' 
        imgPath='/assets/blogs/dis.jpg'  
      />
      
      <div className='w-full flex flex-col items-center justify-center px-4 py-12'>
        <div className='max-w-[1440px] w-full'>
          {/* Stats and Search Section */}
          <div className='flex flex-col lg:flex-row justify-between items-center mb-12 gap-6'>
            {/* Blog Stats */}
            <div className='flex items-center gap-6'>
              <div className='flex items-center gap-2 text-gray-600'>
                <PiArticle size={24} className='text-yellow-500' />
                <span className='text-lg font-medium'>
                  {!loading && (
                    <>
                      {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''}
                      {searchTerm && ` found`}
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Search Bar */}
            <div className='relative w-full max-w-md'>
              <FiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200'
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500 mb-6"></div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Articles</h3>
                <p className="text-gray-500">Fetching the latest wellness insights for you...</p>
              </div>
            </div>
          )}
          
          {/* Error State */}
          {error && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="bg-red-50 rounded-full p-6 mb-6">
                <FiRefreshCw size={48} className="text-red-500" />
              </div>
              <div className="text-center max-w-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
                <p className="text-gray-600 mb-6">{error}</p>
                <button
                  onClick={handleRetry}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 mx-auto"
                >
                  <FiRefreshCw size={16} />
                  Try Again
                </button>
              </div>
            </div>
          )}
          
          {/* No Results State */}
          {!loading && !error && filteredBlogs.length === 0 && searchTerm && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="bg-gray-100 rounded-full p-6 mb-6">
                <PiMagnifyingGlass size={48} className="text-gray-400" />
              </div>
              <div className="text-center max-w-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any articles matching "{searchTerm}". Try searching with different keywords.
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Show All Articles
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && blogs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="bg-yellow-50 rounded-full p-6 mb-6">
                <FiBookOpen size={48} className="text-yellow-500" />
              </div>
              <div className="text-center max-w-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles yet</h3>
                <p className="text-gray-600">
                  We're working on bringing you amazing wellness content. Check back soon for inspiring articles and expert tips!
                </p>
              </div>
            </div>
          )}
          
          {/* Blog Grid */}
          {!loading && !error && filteredBlogs.length > 0 && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {filteredBlogs.map((blog, index) => (
                <div
                  key={blog._id}
                  className="transform transition-all duration-300 hover:scale-105"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  <BlogCard data={blog} />
                </div>
              ))}
            </div>
          )}

          {/* Search Results Info */}
          {!loading && !error && searchTerm && filteredBlogs.length > 0 && (
            <div className="text-center mt-12 p-4 bg-yellow-50 rounded-lg">
              <p className="text-yellow-800">
                Showing {filteredBlogs.length} result{filteredBlogs.length !== 1 ? 's' : ''} for "{searchTerm}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
