'use client'

import React, { useEffect, useState } from 'react'
import Information from '@/components/Pages/Account/Information'
import Hero from '@/components/Constants/Hero'
import { API_URL } from '@/config/api.config'
import { useUser } from '@/context'

async function getBookings(id){
  const res = await fetch(`${API_URL}/bookings/user/${id}`,  {cache: "no-store"})
  return res.json()
}

export default function Page() {
  const { user } = useUser()
  const [bookings, setBookings] = useState(null)

  useEffect(() => {
    if (user) {
      getBookings(user._id).then(setBookings)
    }
  }, [user])

  console.log(user)
  console.log(bookings)

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <Hero title="Your Account" description="Manage all your sessions from here"/>
      <Information bookings={bookings}/>
    </div>
  )
}