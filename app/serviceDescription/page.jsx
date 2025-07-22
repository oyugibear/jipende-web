'use client'

import PictureHero from '@/components/Constants/PictureHero'
import InfoCard from '@/components/Pages/ServiceDescriptions/InfoCard'
import Image from 'next/image'
import React from 'react'

export default function page() {
    const serviceInfo = [
        {
            title: 'Solo Light Sessions', 
            subTitle: "Individual wellness programs",
            description: 'Our individual wellness programs help you to tackle emotional difficulties. Such as the following: relationship issues, loneliness, grief/loss, adjustment issues, identity crisis, stress, anger, eating disorder, mood disorder, depression, and anxiety. We do this through diverse talk therapies and workshops.',    
            benefits: [
                "It can be your first step in identifying where you need help and its the start to your personal growth journey.",
                "Our diverse behavioural treatment can help people identify, understand, learn, and work on their emotional difficulties that they are experiencing or the mental health condition that they have been diagnosed with.",
                "Our treatment will help them learn and design tools that can assist them with their lifestyle change."
            ],
            imgPath: '/assets/Services/solo.jpg',
            imgAlt: 'Therapy Image',
            side: 'left'
        },
        {
            title: 'Tribe Sessions',
            subTitle: "Group wellness programs",

            description: 'Our group wellness programs help you to tackle emotional difficulties. The different groups we work with are couples, familes, siblings and friends. An example of the topics we focus on are: anger management, relationship dynamics, stress manangement etc. We do this through diverse talk therapy and workshops.',
            benefits: [
                "You develop a positive support system by receiving support. You will also be able to share your experience with others who are going through a similar struggle.",
                "It’s a safe space for people not to feel alone.",
                "It’s a safe space for people to share their feelings and learn.",
                "It’s a safe place where you will learn new ways of thinking, and adapting new beliefs that may shift you and other people’s perspectives on how to handle pain."
            ],
            imgPath: '/assets/about/tribe.jpg',
            imgAlt: 'Therapy Image',
            side: 'right'
        },
        {
            title: 'Harmony Blueprint',
            subTitle: 'Corporate & School Wellness Programs',
            description: 'Harmony Blueprint is our specialized wellness program designed to support emotional, behavioral, and psychological growth in both schools and corporate settings. We focus on fostering self-awareness, healthy communication, emotional intelligence, and inclusive environments through engaging, expert-led sessions.',
            benefits: [
                "Participants will learn to identify their communication styles.",
                "Techniques for managing emotions and stress effectively.",
                "Awareness of inclusion, diversity, gender equality, and consent.",
                "Understanding and meeting psychological and emotional needs.",
                "Tools to build and sustain healthy peer and professional relationships.",
                "Foundational self-awareness and personal development practices.",
                "Mental health demystification and stigma reduction.",
            ],
            imgPath: '/assets/about/k2.jpg',
            imgAlt: 'Therapy Image',
            side: 'left',
              
        },
        

    ]
  return (
    <div className='w-full flex flex-col items-center justify-center'>
        <PictureHero title='Our Services' description='' imgPath='/assets/about/home.jpg' />
        <div className='flex max-w-[1024px] w-full p-4 my-12 flex-col items-center gap-6'>
            {serviceInfo.map((item, index) => (
                <div className=''>
                    <InfoCard key={index} data={item} />
                    <hr />
                </div>
            ))}

            <iframe
            
            src={`/assets/pdfs/Jipende_Services.pdf`}
            width="100%"
            height="600px"
            className='max-w-[1024px] w-full'
            />

            <hr className='pt-4 w-full'/>

            <div className='flex flex-col w-full my-8 text-center'>
                <h2 className='font-bold mb-8'>Watch Our Videos To Learn More About Our Members Experiences</h2>
                <div className='flex flex-wrap items-start justify-evenly gap-4'>
                    <iframe className='w-full md:w-1/4 h-full aspect-video shadow-xl' src='https://www.youtube.com/embed/g9gNYpPECcw' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen/>
                    <iframe className='w-full md:w-1/4 h-full aspect-video shadow-xl' src='https://www.youtube.com/embed/u2HLqjcCRp8' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen/>
                    <iframe className='w-full md:w-1/4 h-full aspect-video shadow-xl' src='https://www.youtube.com/embed/FnbdjosLRX8' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen/>
                </div>
            </div>
        </div>
    </div>
  )
}
