'use client'

import { useUser } from '@/context'
import React, { useEffect, useState } from 'react'
import SessionCard from '@/components/Pages/Account/SessionCard'
import { API_URL } from '@/config/api.config'
import Hero from '@/components/Constants/Hero'


async function getBookings(id){
    const res = await fetch(`${API_URL}/bookings/user/${id}`,  {cache: "no-store"})
    return res.json()
}

export default function page() {
    const { user } = useUser()
    const [bookings, setBookings] = useState(null)
    const [selectedSession, setSelectedSession] = useState('Online')

    useEffect(() => {
        if (user) {
          getBookings(user._id).then(setBookings)
        }
    }, [user])

    console.log(bookings)
    const onlineBookings = bookings?.data.filter(booking => booking.services.some(service => service.location == "Online"));
    const offlineBookings = bookings?.data.filter(booking => booking.services.some(service => service.location != "Online"));
    
    console.log("onlineBookings", onlineBookings)
  return (
    <div className='flex flex-col w-full'>
        <Hero title={'All Your Sessions'} description={'Below you will find all the sessions you have paid for.'}/>
        <div className='flex flex-col items-center w-full py-12'>
            <div className='flex flex-row gap-4'>
                <div onClick={() => setSelectedSession("Online")} className='flex flex-col justify-center items-center'>
                <p>Online</p>
                <hr className={`${selectedSession == "Online" && "block border border-yellow-400  max-w-[30px] w-full "} `}/>
                </div>
                <div onClick={() => setSelectedSession("In Person")} className='flex flex-col justify-center items-center'>
                <p>In Person</p>
                <hr className={`${selectedSession == "In Person" && "block  border border-yellow-400  max-w-[30px] w-full"} `}/>
                </div>
            </div>

            <div className='flex flex-col w-full my-8 max-w-[1240px]'>
                { selectedSession == "Online" ? (
                    <div className='flex flex-col w-full'>
                        {onlineBookings?.map((booking) => (
                            booking?.services.map(service => (
                                <SessionCard data={service}/>
                            ))
                        ))}
                    </div>
                    ) : selectedSession == "In Person" ? (
                    <div className='flex flex-col w-full'>
                        {offlineBookings?.map((booking) => (
                            booking.services.map(service => (
                                <SessionCard data={service}/>
                            ))
                        ))}
                    </div>
                ) : null}
            </div>

        </div>
    </div>
  )
}
