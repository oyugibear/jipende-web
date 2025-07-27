import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PiClock, PiEye, PiCalendar, PiUser } from 'react-icons/pi'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default function BlogCard({data}) {
  const formatDate = (dateString) => {
    if (!dateString) return ''
    return dayjs(dateString).format('MMM D, YYYY')
  }

  const getTimeAgo = (dateString) => {
    if (!dateString) return ''
    return dayjs(dateString).fromNow()
  }

  return (
    <Link href={`/Blogs/${data._id}`} className="block group">
      <article className='bg-white rounded-xl shadow-md hover:shadow-xl max-w-[400px] transition-all duration-300 overflow-hidden h-full flex flex-col group-hover:transform group-hover:-translate-y-1'>
        {/* Image Container */}
        <div className='relative overflow-hidden'>
          <div className='aspect-video relative'>
            <Image 
              src={data.picture || '/assets/blogs/default-blog.jpg'} 
              alt={data?.title || 'Blog post'} 
              fill
              className='object-cover transition-transform duration-500 group-hover:scale-110'
            />
            {/* Overlay */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'/>
            
            {/* Reading Time Badge */}
            <div className='absolute top-4 right-4'>
              <div className='bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-xs font-medium text-gray-700'>
                <PiClock size={12} />
                {data?.reading_time || '5 min'} read
              </div>
            </div>

            {/* Category Badge */}
            {data?.category && (
              <div className='absolute top-4 left-4'>
                <span className='bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium'>
                  {data.category}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className='p-6 flex-1 flex flex-col'>
          {/* Meta Information */}
          <div className='flex items-center gap-4 text-xs text-gray-500 mb-3'>
            {data?.createdAt && (
              <div className='flex items-center gap-1'>
                <PiCalendar size={12} />
                <time dateTime={data.createdAt}>
                  {formatDate(data.createdAt)}
                </time>
              </div>
            )}
            {data?.author && (
              <div className='flex items-center gap-1'>
                <span>{data.author}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className='text-lg font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors duration-200' 
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
            {data?.title}
          </h3>

          {/* Description */}
          <p className='text-gray-600 text-sm leading-relaxed flex-1 mb-4'
             style={{
               display: '-webkit-box',
               WebkitLineClamp: 3,
               WebkitBoxOrient: 'vertical',
               overflow: 'hidden'
             }}>
            {data?.description || 'Discover insights and tips for your wellness journey...'}
          </p>

          {/* Footer */}
          <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
            {/* Read More */}
            <span className='text-yellow-600 font-medium text-sm group-hover:text-yellow-700 transition-colors duration-200'>
              Read More →
            </span>

            {/* Views (if available) */}
            {data?.views && (
              <div className='flex items-center gap-1 text-xs text-gray-500'>
                <PiEye size={12} />
                <span>{data.views} views</span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
