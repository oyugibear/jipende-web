'use client'
import BookingInfoCard from '@/components/Pages/Admin/individual/BookingInfoCard'
import { API_URL } from '@/config/api.config'
import { message } from 'antd'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

async function getBooking(id){
  const res = await axios.get(`${API_URL}/booking/${id}`)
  return res.data
}

export default function page() {

  const [booking, setBooking] = useState(null)
  const { id } = useParams();

  const getData = async () => {
    const data = await getBooking(id) || null
    setBooking(data)
  }

  useEffect(() => {
    getData()
  }, [])

  console.log(booking)

  const [type, setType] = useState('create')
  
  // values to be saved
  const [link, setLink] = useState('')
  const [therapyName, setTherapyName] = useState('')
  
  const [reason, setReason] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newTime, setNewTime] = useState('')
  const [newLink, setNewLink] = useState('')

  const [nextBooking, setNextBooking] = useState('')
  const [meetingNotes, setMeetingNotes] = useState('')

  
  // api calls
  // add link to booking and send email
  const handleAddLink = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.put(`${API_URL}/booking/addlink/${id}`, {googleMeetLink: link, therapistName: therapyName, status: "link added"})
      if(data){
          message.success("Meeting Link Added")
          console.log(data)
      }
    } catch (error) {
      message.error("Something went wrong")
      console.log(error)
    }
  }

  // reschedule booking
  const handleReschedule = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.put(`${API_URL}/booking/rescheduleBooking/${id}`, {
        rescheduleReason: reason, 
        rescheduleDate: newDate, 
        rescheduleTime: newTime, 
        rescheduleLink: newLink, 
        status: "rescheduled"
      })
      if(data){
          message.success("Meeting Rescheduled")
          console.log(data)
      }
    } catch (error) {
      message.error("Something went wrong")
      console.log(error)
    }
  }
  
  // complete booking
  const handleCompleteBooking = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.put(`${API_URL}/booking/completeBooking/${id}`, {
        therapistNotes: meetingNotes, 
        nextBookingDate: nextBooking, 
        status: "completed"
      })
      if(data){
          message.success("Meeting Completed")
          console.log(data)
      }
    } catch (error) {
      message.error("Something went wrong")
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col w-full items-center justify-center py-12 p-4'>
      <div className='max-w-[1440px] w-full flex flex-col'>
        <h1 className='text-xl font-medium'>Booking Information</h1>
        <p>Below are are all the details concerning the booking</p>

        <BookingInfoCard booking={booking}/>

        <h2 className='text-lg font-medium'>Booking Controls</h2>
        <div className='flex flex-wrap items-center  gap-4 mt-2'>
          <button onClick={() => setType('create')} className={`px-4 py-2 text-sm border-b ${ type == 'create' && 'border-b border-yellow-400'}`}>
            Create Meeting
          </button>
          <button onClick={() => setType('reschedule')} className={`px-4 py-2 text-sm border-b ${ type == 'reschedule' && 'border-b border-yellow-400'}`}>
            Reschedule Session
          </button>
          <button onClick={() => setType('complete')} className={`px-4 py-2 text-sm border-b ${ type == 'complete' && 'border-b border-yellow-400'}`}>
            Complete Session
          </button>
        </div>

        {type == 'create' ? (
          <div className='flex flex-col items-start  my-8 w-full'>
            <div className='py-8 flex flex-wrap gap-4'>
              <div>
                <label className='text-xs text-slate-500'>Google Meet Link</label>
                <input type="text" value={link} onChange={(e) => setLink(e.target.value)} className='w-full max-w-[500px] px-4 py-2 border rounded-sm'/>
              </div>
              <div>
                <label className='text-xs text-slate-500'>Therapist Name</label>
                <input type="text" value={therapyName} onChange={(e) => setTherapyName(e.target.value)} className='w-full max-w-[500px] px-4 py-2 border rounded-sm'/>
              </div>
            </div>
            <button onClick={(e) => handleAddLink(e)} className='px-4 py-2 bg-green-500 hover:text-white rounded-md'>
              Save &amp; Send
            </button>
          </div>
        ) : type == 'reschedule' ? (
          <div className='flex flex-col items-start  my-8 w-full'>
            <div className='py-8 flex flex-wrap gap-4 w-full'>
              <div className='w-full'>
                <label className='text-xs text-slate-500'>Reason</label>
                <textarea type="text" value={reason} onChange={(e) => setReason(e.target.value)} className='w-full px-4 py-2 border rounded-sm'/>
              </div>
              <div>
                <label className='text-xs text-slate-500'>New Date</label>
                <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className='w-full max-w-[500px] px-4 py-2 border rounded-sm'/>
              </div>
              <div>
                <label className='text-xs text-slate-500'>New Time</label>
                <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} className='w-full max-w-[500px] px-4 py-2 border rounded-sm'/>
              </div>
              <div>
                <label className='text-xs text-slate-500'>Google Meet Link</label>
                <input type="text" value={newLink} onChange={(e) => setNewLink(e.target.value)} className='w-full max-w-[500px] px-4 py-2 border rounded-sm'/>
              </div>
            </div>
            <button onClick={(e) => handleReschedule(e)} className='px-4 py-2 bg-green-500 hover:text-white rounded-md'>
              Save &amp; Send
            </button>
          </div>
        ) : type == 'complete' ? (
          <div className='flex flex-col items-start  my-8 w-full'>
            <div className='py-8 flex flex-wrap gap-4 w-full'>
              <div className='w-full'>
                <label className='text-xs text-slate-500'>Meeting Notes</label>
                <textarea type="text" value={meetingNotes} onChange={(e) => setMeetingNotes(e.target.value)} className='w-full px-4 py-2 border rounded-sm '/>
              </div>
              <div>
                <label className='text-xs text-slate-500'>Next Booking Date</label>
                <input type="date" value={nextBooking} onChange={(e) => setNextBooking(e.target.value)} className='w-full max-w-[500px] px-4 py-2 border rounded-sm'/>
              </div>
              
            </div>
            <button onClick={(e) => handleCompleteBooking(e)} className='px-4 py-2 bg-green-500 hover:text-white rounded-md'>
              Save
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
