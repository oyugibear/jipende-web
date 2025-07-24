'use client'

import React, { useEffect, useState } from 'react'
import SessionCard from '@/components/Pages/Account/SessionCard'
import Hero from '@/components/Constants/Hero'
import { useAuth } from '@/context/AuthContext'
import { bookingAPI } from '@/utils/api'

export default function page() {
    const { user, isAuthenticated } = useAuth()
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedSession, setSelectedSession] = useState('Online')

    useEffect(() => {
        const fetchBookings = async () => {
            if (user && isAuthenticated) {
                try {
                    setLoading(true)
                    setError(null)
                    const response = await bookingAPI.getUserBookings(user._id)
                    if (response && response.status && response.data) {
                        // Ensure we have an array
                        setBookings(Array.isArray(response.data) ? response.data : [])
                    } else {
                        setBookings([])
                    }
                } catch (error) {
                    console.error('Error fetching bookings:', error)
                    setError('Failed to load sessions. Please try again later.')
                    setBookings([])
                } finally {
                    setLoading(false)
                }
            } else {
                setLoading(false)
            }
        }

        fetchBookings()
    }, [user, isAuthenticated])

    console.log(bookings)
    const onlineBookings = Array.isArray(bookings) ? bookings?.filter(booking => 
        booking?.services?.some(service => service?.location == "Online")
    ) : [];
    const offlineBookings = Array.isArray(bookings) ? bookings?.filter(booking => 
        booking?.services?.some(service => service?.location != "Online")
    ) : [];

    const [newDate, setNewDate] = useState("")
    const [newTime, setNewTime] = useState("")
    
    console.log("onlineBookings", onlineBookings)
    
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
                    <p className="text-gray-600">Please log in to view your sessions.</p>
                </div>
            </div>
        );
    }

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
                                <SessionCard type={selectedSession} data={service} />
                            ))
                        ))}
                    </div>
                    ) : selectedSession == "In Person" ? (
                    <div className='flex flex-col w-full'>
                        {offlineBookings?.map((booking) => (
                            booking.services.map(service => (
                                <SessionCard type={selectedSession} data={service}/>
                            ))
                        ))}
                    </div>
                ) : null}
            </div>

        </div>
    </div>
  )
}
