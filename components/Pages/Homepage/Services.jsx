import React from 'react'
import Card from './serviceCard/Card'

export default function Services() {

  const data = [
    {
      id: 1,
      title: 'Solo Light Session',
      description: 'The Solo Light Sessions are individual wellness programs that focuses on diverse talk therapy techniques, including CBT, ACT, and Psycho-therapy.',
      image: '/assets/homepage/serviceCardImgs/fix.jpg'
    },
    {
      id: 2,
      title: 'Tribe Session',
      description: 'The Tribe Sessions are community group therapy programs and workhops designed to target specific groups such as couples, friends, and family etc.',
      image: '/assets/homepage/services/sd.jpg'
    },
    // {
    //   id: 1,
    //   title: 'Mental Awarness',
    //   description: 'This holistic program is for a person who will be or has been diagnosed by the Diagnostic and Statistical manual of Mental Disorder (DSM-TR).',
    //   image: '/assets/homepage/services/ma.jpg'
    // },
    {
      id: 1,
      title: 'Harmony Blueprint',
      description: 'The Harmony Blueprint Sessions are school and corporate programs that are designed to implement student and employee wellbeing. ',
      image: '/assets/homepage/services/g1.jpg'
    }
  ]
  return (
    <div className="max-w-[1440px]">
        <div className="flex flex-col items-center justify-center py-12 text-sm my-12 px-4">
            <h2 className="text-2xl mb-4">Find Your <span className='text-yellow-500 animate-bounce'>Program</span></h2>
            <p className="max-w-[1000px] text-center mb-6">
              Step into a world of tailored well-being at Jipende! Unveil a personalized path crafted exclusively 
              for you. Embark on this thrilling journey to uncover a happier and healthier you!
            </p>

            <div className="flex flex-wrap items-center md:items-start gap-4 justify-center md:justify-evenly mt-4">
              {data.map((item) => (
                <Card key={item.id} title={item.title} description={item.description} image={item.image} />
              ))}
            </div>
        </div>
    </div>
  )
}
