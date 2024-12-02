import React from 'react'
import Card from './serviceCard/Card'

export default function Services() {

  const data = [
    {
      id: 1,
      title: 'Self Awarness',
      description: 'Its focus is to implement independent personal therapy as way of developing assistance to people who may need an outlet to express their problems.',
      image: '/assets/homepage/serviceCardImgs/serviceCardImg.png'
    },
    {
      id: 2,
      title: 'Self Development',
      description: 'Its focus is to implement independent personal therapy as way of developing assistance to people who may be experiencing anxiety, etc.',
      image: '/assets/Homepage/services/sd.jpg'
    },
    {
      id: 1,
      title: 'Mental Awarness',
      description: 'This holistic program is for a person who will be or has been diagnosed by the Diagnostic and Statistical manual of Mental Disorder (DSM-TR).',
      image: '/assets/Homepage/services/ma.jpg'
    },
    {
      id: 1,
      title: 'Group Wellness',
      description: 'Its focus is to implement community group therapy and workhop designed to target specific issues such as anger,anxiety, depression grief etc. ',
      image: '/assets/Homepage/services/g1.jpg'
    }
  ]
  return (
    <div className="max-w-[1440px] ">
        <div className="flex flex-col items-center justify-center py-12 text-sm my-12 px-4">
            <h2 className="text-2xl mb-4">Find Your <span className='text-yellow-500 animate-bounce'>Program</span></h2>
            <p className="max-w-[1000px] text-center mb-6">
                Step into a world of tailored well-being at Jipende! Unveil a personalized path crafted exclusively 
                for you. Embark on this thrilling journey to uncover a happier and healthier you!
            </p>

            <div className="flex flex-wrap items-center md:items-start gap-4 justify-center md:justify-between mt-4">
              {data.map((item) => (
                <Card key={item.id} title={item.title} description={item.description} image={item.image} />
              ))}
            </div>
        </div>
    </div>
  )
}
