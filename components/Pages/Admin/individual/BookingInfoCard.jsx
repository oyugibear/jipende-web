import { Descriptions } from 'antd'
import React, { useState } from 'react'
import { PiCaretDown, PiCaretRight } from 'react-icons/pi'

export default function BookingInfoCard({booking}) {
  console.log("booking", booking)
  
  const [isNotesExpanded, setIsNotesExpanded] = useState(false)
  
  const truncateText = (text, maxLength = 200) => {
    if (!text || text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }
  
  const isTextLong = (text, maxLength = 200) => {
    return text && text.length > maxLength
  }
  
  const renderTherapistNotes = (notes) => {
    if (!notes || notes === 'N/A') return 'N/A'
    
    const shouldShowToggle = isTextLong(notes)
    
    return (
      <div className="max-w-2xl">
        <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-lg p-3">
          <div className={`leading-relaxed whitespace-pre-wrap break-words ${
            !isNotesExpanded && shouldShowToggle ? 'overflow-hidden' : ''
          }`} style={!isNotesExpanded && shouldShowToggle ? {
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical'
          } : {}}>
            {isNotesExpanded ? notes : (shouldShowToggle ? notes : truncateText(notes))}
          </div>
          
          {shouldShowToggle && (
            <button
              onClick={() => setIsNotesExpanded(!isNotesExpanded)}
              className='mt-2 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200'
            >
              {isNotesExpanded ? (
                <>
                  <PiCaretDown size={12} />
                  Show Less
                </>
              ) : (
                <>
                  <PiCaretRight size={12} />
                  Show More
                </>
              )}
            </button>
          )}
        </div>
      </div>
    )
  }

  const items = [
    {
      key: '1',
      label: 'Client Name',
      children: `${booking?.postedBy?.first_name} ${booking?.postedBy?.second_name}`
    },
    {
      key: '2',
      label: 'Client Email',
      children: booking?.postedBy?.email
    },
    {
      key: '3',
      label: 'Date Selected',
      children: booking?.services[0].date
    },
    {
      key: '4',
      label: 'Time Selected',
      children: booking?.services[0].time
    },
    {
      key: '5',
      label: 'Location',
      children: booking?.services[0].location
    },
    {
      key: '6',
      label: 'Payment Status',
      children: booking?.paymentStatus == true ? 'Paid' : 'Not Paid'
    },
    {
      key: '7',
      label: 'Booking Status',
      children: booking?.status
    },
    {
      key: '8',
      label: 'Google Meet Link',
      children: booking?.status == 'link added' ? booking?.googleMeetLink : booking?.reschedule
    },
    {
      key: '9',
      label: 'Therapist',
      children: booking?.therapist ? booking?.therapist.first_name + " " + booking?.therapist.second_name : 'Not Assigned'
    },
    {
      key: '10',
      label: 'Reschedule Reason',
      children: booking?.rescheduleReason || 'N/A'
    },
    {
      key: '11',
      label: 'Reschedule Date',
      children: booking?.rescheduleDate || 'N/A'
    },
    {
      key: '12',
      label: 'Reschedule Time',
      children: booking?.rescheduleTime || 'N/A'
    },
    {
      key: '13',
      label: 'Reschedule Link',
      children: booking?.rescheduleLink || 'N/A'
    },
    {
      key: '14',
      label: 'Therapist Notes',
      children: renderTherapistNotes(booking?.therapistNotes)
    }
  ]
  return (
    <div className='my-4'>
      <Descriptions bordered items={items} />
    </div>
  )
}
