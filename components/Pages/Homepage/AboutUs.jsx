import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function AboutUs() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 h-[600px] bg-fixed bg-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('/assets/homepage/about/aboutUs.png')" }} />

      {/* Content over Image */}
      <div className="relative max-w-[1040px] mx-auto px-4 py-24">
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-8">
          <h2 className="text-3xl mb-2">
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
            <button className="mt-4 rounded-lg text-sm uppercase bg-yellow-500 font-extrabold px-4 py-2 hover:scale-105 duration-300">
              Read More
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
