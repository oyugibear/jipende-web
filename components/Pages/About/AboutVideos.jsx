import React from 'react'

export default function AboutVideos() {
  return (
    <div className='flex flex-col w-full my-6 text-center'>
        <h2 className='font-bold mb-4'>Watch Our Videos &amp; Colaborations</h2>
        <div className='flex flex-wrap items-start justify-evenly gap-4'>
            <iframe className='w-full md:w-1/4 h-full aspect-video shadow-xl' src='https://www.youtube.com/embed/4tnkaQNuUH8' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen/>
            <iframe className='w-full md:w-1/4 h-full aspect-video shadow-xl' src='https://www.youtube.com/embed/CZKvMSxjZXw' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen/>
            <iframe className='w-full md:w-1/4 h-full aspect-video shadow-xl' src='https://www.youtube.com/embed/vPkbDzN9ddU' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen/>
        </div>
    </div>
  )
}
