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
            imgPath: '/assets/contacts/c3.png',
            imgAlt: 'Therapy Image',
            side: 'left'
        },
        {
            title: 'Tribe Sessions',
            subTitle: "Group wellness programs",
            description: 'Our group wellness programs help you to tackle emotional difficulties. Such as the following: relationship issues, loneliness, grief/loss, adjustment issues, identity crisis, stress, anger, eating disorder, mood disorder, depression, and anxiety. We do this through diverse talk therapies and workshops.',
            benefits: [
                "It can be your first step in identifying where you need help and its the start to your personal growth journey.",
                "Our diverse behavioural treatment can help people identify, understand, learn, and work on their emotional difficulties that they are experiencing or the mental health condition that they have been diagnosed with.",
                "Our treatment will help them learn and design tools that can assist them with their lifestyle change."
            ],
            imgPath: '/assets/contacts/c3.png',
            imgAlt: 'Therapy Image',
            side: 'right'
        },
        {
            title: 'Harmony Blueprint', 
            subTitle: "Corporate & School wellness programs",
            description: 'This wellness programs help you to tackle emotional difficulties. Such as the following: relationship issues, loneliness, grief/loss, adjustment issues, identity crisis, stress, anger, eating disorder, mood disorder, depression, and anxiety. We do this through diverse talk therapies and workshops.',    
            benefits: [
                "It can be your first step in identifying where you need help and its the start to your personal growth journey.",
                "Our diverse behavioural treatment can help people identify, understand, learn, and work on their emotional difficulties that they are experiencing or the mental health condition that they have been diagnosed with.",
                "Our treatment will help them learn and design tools that can assist them with their lifestyle change."
            ],
            imgPath: '/assets/contacts/c3.png',
            imgAlt: 'Therapy Image',
            side: 'left'
        },
        

    ]
  return (
    <div className='w-full flex flex-col items-center justify-center'>
        <PictureHero title='Our services' description='' imgPath='/assets/blogs/home.png' />
        <div className='flex max-w-[1024px] w-full p-4 my-12 flex-col items-center gap-6'>
            {serviceInfo.map((item, index) => (
                <div className=''>
                    <InfoCard key={index} data={item} />
                    <hr />
                </div>
            ))}

            <iframe
            
            src={`/assets/pdfs/pdfs.pdf`}
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
