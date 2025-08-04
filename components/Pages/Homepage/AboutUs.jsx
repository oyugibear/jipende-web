"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState, useRef } from 'react'

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <Image
          src="/assets/homepage/about/aboutUs.png"
          alt="About Us Background"
          fill
          className={`object-cover object-center transition-all duration-1000 ease-out ${
            isVisible ? 'scale-100 opacity-100' : 'scale-110 opacity-90'
          }`}
          priority
        />
      </div>

      {/* Content over Image */}
      <div className="relative w-full h-full flex items-center justify-center px-4 py-16 md:py-24">
        <div className="w-full max-w-[1040px] mx-auto">
          <div className={`bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-6 md:p-8 mx-4 md:mx-0 transition-all duration-1000 ease-out ${
            isVisible ? 'transform translate-y-0 opacity-100' : 'transform translate-y-4 opacity-80'
          }`}>
            <h2 className="text-2xl md:text-3xl mb-2">
              Our <span className="text-yellow-500">Story</span>
            </h2>
          <p className="my-4 text-justify">
            <b>What exactly do we do?</b>
            <br />
            Africa Jipende Wellness Limited (AJW) is a practicing and research centre that takes on a therapeutic holistic approach to the Mind, Body and Behaviour using multidisciplinary programs to implement wellness.
            <br /><br />
            <b>Our History</b>
            <br />
            Africa Jipende Wellness Limited was founded in November 2018 by Rubie Miseda with the goal of promoting holistic mental health and wellness in Kenya and Africa as a whole. The founder identified that she and many around her didn’t have the appropriate support for their mental well-being.
            <br /><br />
            <b>Yes, we have a vision</b>
            <br />
            Our vision is to constantly promote wellness by offering a holistic service through merging different social, psychological, physical and nutritional expertise in order to create a healthy community.
          </p>
          <Link href="/about">
            <button className="mt-4 rounded-lg text-sm  bg-yellow-500 font-medium px-4 py-2 hover:scale-105 duration-300">
              Read More
            </button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
