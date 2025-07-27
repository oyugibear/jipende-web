'use client'

import Link from 'next/link'
import React from 'react'
import { PiUser, PiEnvelope, PiPhone, PiShield, PiEye } from 'react-icons/pi'

export default function UserCard({ user }) {
    return (
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200'>
            {/* User Header */}
            <div className='flex items-start justify-between mb-4'>
                <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                        <PiUser size={20} className='text-blue-600' />
                    </div>
                    <div>
                        <h3 className='font-semibold text-gray-900 truncate'>
                            {`${user?.first_name || ''} ${user?.second_name || ''}`.trim() || 'Unknown User'}
                        </h3>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            user?.role === 'admin' 
                                ? 'bg-red-100 text-red-700' 
                                : user?.role === 'user'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-700'
                        }`}>
                            {user?.role || 'Unknown'}
                        </span>
                    </div>
                </div>
            </div>

            {/* User Details */}
            <div className='space-y-3 mb-4'>
                <div className='flex items-center gap-2 text-sm'>
                    <PiEnvelope size={16} className='text-gray-400 flex-shrink-0' />
                    <span className='text-gray-600 truncate'>{user?.email || 'No email'}</span>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                    <PiPhone size={16} className='text-gray-400 flex-shrink-0' />
                    <span className='text-gray-600'>{user?.phone_number || 'No phone'}</span>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                    <PiShield size={16} className='text-gray-400 flex-shrink-0' />
                    <span className='text-gray-600'>{user?.profile_status || 'Profile not started'}</span>
                </div>
            </div>

            {/* Actions */}
            <div className='pt-4 border-t border-gray-100'>
                <Link 
                    href={`/admin/users/${user._id}`}
                    className='w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 text-sm'
                >
                    <PiEye size={16} />
                    View Details
                </Link>
            </div>
        </div>
    )
}
