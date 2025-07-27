'use client'

import React, { useState } from 'react'
import { PiClockFill } from 'react-icons/pi'
import { FiShoppingCart } from 'react-icons/fi'
import { Modal, message, DatePicker } from 'antd'
import dayjs from 'dayjs'

export default function BookingModal({ 
    isOpen, 
    onCancel, 
    onConfirm, 
    serviceData 
}) {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    const handleCancel = () => {
        setDate('');
        setTime('');
        onCancel();
    };

    const handleConfirm = () => {
        if (!date || !time) {
            message.error('Please select both date and time');
            return;
        }
        
        onConfirm({ date, time });
        setDate('');
        setTime('');
    };

    const disabledDate = (current) => {
        // Disable days before today and weekends (Saturday and Sunday)
        return (
            current &&
            (current < dayjs().endOf('day') || current.day() === 0 || current.day() === 6)
        );
    };

    // Generate available time slots for dropdown
    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 8; hour < 19; hour++) {
            slots.push({
                value: `${hour.toString().padStart(2, '0')}:00`,
                label: `${hour.toString().padStart(2, '0')}:00 (${dayjs(`2000-01-01 ${hour}:00`).format('h:mm A')})`
            });
            slots.push({
                value: `${hour.toString().padStart(2, '0')}:30`,
                label: `${hour.toString().padStart(2, '0')}:30 (${dayjs(`2000-01-01 ${hour}:30`).format('h:mm A')})`
            });
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();

    return (
        <Modal 
            title={null}
            open={isOpen} 
            onCancel={handleCancel} 
            footer={null}
            width={600}
            centered
            className="booking-modal"
        >
            <div className='flex flex-col items-center p-6'>
                {/* Header */}
                <div className="text-center mb-6">
                    <h3 className='text-2xl font-bold text-gray-800 mb-2'>Book Your Session</h3>
                    <p className='text-sm text-gray-600 max-w-md'>
                        Choose your preferred date and time for <span className="font-semibold text-yellow-600">{serviceData?.title}</span>
                    </p>
                </div>
                
                {/* Service Info Card */}
                <div className="w-full bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <PiClockFill className="text-yellow-600" />
                            <span className="text-gray-700">Duration: {serviceData?.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-700">Price: </span>
                            <span className="font-bold text-green-600">KSH {serviceData?.price}</span>
                        </div>
                    </div>
                </div>
                
                {/* Date and Time Selection */}
                <div className='w-full space-y-6'>
                    <div className='grid md:grid-cols-2 gap-6'>
                        <div className='flex flex-col space-y-2'>
                            <label className='text-sm font-medium text-gray-700 flex items-center gap-2'>
                                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                                Select Date
                            </label>
                            <DatePicker
                                className="w-full h-12 rounded-lg border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                                format="YYYY-MM-DD"
                                placeholder="Choose a date"
                                disabledDate={disabledDate}
                                onChange={(value, dateString) => {
                                    console.log('Formatted Selected Date: ', dateString);
                                    setDate(dateString)
                                }}
                                size="large"
                                value={date ? dayjs(date) : null}
                            />
                            <p className="text-xs text-gray-500">Available Monday - Friday</p>
                        </div>
                        
                        <div className='flex flex-col space-y-2'>
                            <label className='text-sm font-medium text-gray-700 flex items-center gap-2'>
                                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                                Select Time
                            </label>
                            <select
                                value={time}
                                onChange={(e) => {
                                    setTime(e.target.value);
                                    console.log('Selected Time: ', e.target.value);
                                }}
                                className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 bg-white text-gray-700 appearance-none cursor-pointer transition-all duration-200 hover:border-yellow-400"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                                    backgroundPosition: 'right 0.75rem center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '1.5em 1.5em'
                                }}
                            >
                                <option value="" disabled>Choose your preferred time</option>
                                {timeSlots.map((slot) => (
                                    <option key={slot.value} value={slot.value}>
                                        {slot.label}
                                    </option>
                                ))}
                            </select>
                            <p className="text-xs text-gray-500">Available from 8:00 AM to 7:00 PM</p>
                        </div>
                    </div>
                    
                    {/* Selected Summary */}
                    {(date || time) && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-blue-800 mb-2">Your Selection:</h4>
                            <div className="space-y-1 text-sm text-blue-700">
                                {date && <p>📅 Date: {dayjs(date).format('dddd, MMMM D, YYYY')}</p>}
                                {time && <p>🕐 Time: {time} ({dayjs(`2000-01-01 ${time}`).format('h:mm A')})</p>}
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8 w-full">
                    <button 
                        onClick={handleCancel}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleConfirm}  
                        disabled={!date || !time}
                        className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                            (!date || !time) 
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                : 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                        }`}
                    > 
                        <FiShoppingCart className="w-4 h-4" />
                        Add to Cart
                    </button>
                </div>

                {/* Help Text */}
                <p className="text-xs text-gray-500 text-center mt-4 max-w-md">
                    You can review and modify your booking in the cart before completing your purchase.
                </p>
            </div>
        </Modal>
    )
}
