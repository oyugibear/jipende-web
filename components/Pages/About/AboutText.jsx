import React from 'react'

export default function AboutText() {
  return (
    <div className="max-w-[722px] w-full flex flex-col my-4 md:mt-0  gap-4">
        <div className='flex flex-col w-full'>
            <h2 className='font-bold'>What exactly do we do?</h2>
            <p>
                Africa Jipende Wellness Limited (AJW) is a practicing and research centre that takes on a therapeutic 
                holistic approach to the Mind, Body and Behaviour using multidisciplinary programmers to implement wellness.
            </p>
        </div>
        <div className='flex flex-col w-full'>
            <h2 className='font-bold'>Our History</h2>
            <p>
                Africa Jipende Wellness Limited was founded in November 2018 by Rubie Miseda with the goal of promoting holistic 
                mental health and wellness in Kenya and Africa as a whole. The founder identified that she and many around her didn&apos;t 
                have the appropriate support for their mental well-being.  
            </p>
        </div>
        <div className='flex flex-col w-full'>
            <h2 className='font-bold'>Yes, we have a vision</h2>
            <p>
                Our vision is to constantly promote wellness by offering a holistic service through merging different social, psychological, 
                physical and nutritional expertise in order to create a healthy community.
            </p>
        </div>
    </div>
  )
}
