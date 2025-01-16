import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function AboutUs() {
  return (
    <div className="max-w-[1540px] w-full">
        <div className="flex items-center flex-col md:flex-row md:my-12  py-12 justify-between w-full">
            <Image src='/assets/homepage/about/aboutUs.png' width={722} height={509} alt='Our people' className='md:shadow-2xl hover:scale-105 duration-500 md:rounded-t-lg md:shadow-yellow-400' />
            <div className="max-w-[722px] w-full flex flex-col mt-8 md:mt-0 px-4">
              <h2 className="text-3xl mb-2">Our <span className='text-yellow-500'>Story</span></h2>
              <p className="my-4 text-justify">
                <b>What exactly do we do?</b>
                <br />
                Africa Jipende Wellness Limited (AJW) is a practicing and research centre that takes on a therapeutic holistic approach to the Mind, Body and Behaviour using multidisciplinary programmers to implement wellness.
                <br />
                <br />
                <b>Our History</b>
                <br />
                Africa Jipende Wellness Limited was founded in November 2018 by Rubie Miseda with the goal of promoting holistic mental health and wellness in Kenya and Africa as a whole. The founder identified that she and many around her didn’t have the appropriate support for their mental well-being.  
                <br />
                <br />
                <b>Yes, we have a vision</b>
                <br />
                Our vision is to constantly promote wellness by offering a holistic service through merging different social, psychological, physical and nutritional expertise in order to create a healthy community.
              </p>
              <Link href='/about'>
                <button className="md:max-w-[200px] rounded-lg mt-4 text-sm uppercase bg-yellow-500 font-extrabold px-4 py-2 hover:scale-105">
                  Read More
                </button>
              </Link>
            </div>
        </div>
    </div>      
  )
}
