'use client'

import React, { useState } from 'react'
import { PiFileText, PiClock, PiUser, PiCaretDown, PiCaretRight } from 'react-icons/pi'
import dayjs from 'dayjs'

const TherapyNotes = ({ notes = [], className = '' }) => {
    const [expandedNotes, setExpandedNotes] = useState(new Set())

    const toggleNoteExpansion = (noteId) => {
        const newExpanded = new Set(expandedNotes)
        if (newExpanded.has(noteId)) {
            newExpanded.delete(noteId)
        } else {
            newExpanded.add(noteId)
        }
        setExpandedNotes(newExpanded)
    }

    const truncateText = (text, maxLength = 300) => {
        if (!text || text.length <= maxLength) return text
        return text.substring(0, maxLength) + '...'
    }

    const isTextLong = (text, maxLength = 300) => {
        return text && text.length > maxLength
    }

    if (notes.length === 0) {
        return (
            <div className={`mt-8 ${className}`}>
                <div className='flex items-center justify-between mb-4'>
                    <h3 className='text-lg font-semibold text-gray-900 flex items-center gap-2'>
                        <PiFileText size={20} className="text-blue-500" />
                        Therapy Notes
                    </h3>
                    <div className='text-sm text-gray-500'>
                        0 notes
                    </div>
                </div>
                
                <div className='py-12 flex flex-col gap-3 items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300'>
                    <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center'>
                        <PiFileText size={32} className="text-gray-400" />
                    </div>
                    <h4 className='text-lg font-medium text-gray-700'>No Therapy Notes Available</h4>
                    <p className='text-gray-500 text-center max-w-md'>
                        This client doesn't have any therapy notes yet. Notes will appear here after therapy sessions are completed.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className={`mt-8 ${className}`}>
            <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-semibold text-gray-900 flex items-center gap-2'>
                    <PiFileText size={20} className="text-blue-500" />
                    Therapy Notes
                </h3>
                <div className='text-sm text-gray-500'>
                    {notes.length} {notes.length === 1 ? 'note' : 'notes'}
                </div>
            </div>
            
            <div className='bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm'>
                <div className='overflow-x-auto'>
                    <table className='min-w-full'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b'>
                                    Date & Time
                                </th>
                                <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b'>
                                    Therapist Note
                                </th>
                                <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b'>
                                    Added By
                                </th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {[...notes].reverse().map((note, index) => {
                                const noteContent = note.note || note.content || 'No note content'
                                const noteId = note._id || `note-${index}`
                                const isExpanded = expandedNotes.has(noteId)
                                const shouldShowToggle = isTextLong(noteContent)
                                
                                return (
                                    <tr key={noteId} className='hover:bg-gray-50 transition-colors duration-150'>
                                        <td className='py-4 px-4 whitespace-nowrap align-top'>
                                            <div className='flex items-center gap-2'>
                                                <PiClock size={14} className="text-gray-400" />
                                                <div>
                                                    <div className='text-sm font-medium text-gray-900'>
                                                        {note.createdAt ? dayjs(note.createdAt).format('MMM D, YYYY') : 'No date'}
                                                    </div>
                                                    <div className='text-xs text-gray-500'>
                                                        {note.createdAt ? dayjs(note.createdAt).format('h:mm A') : ''}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-4 px-4 align-top max-w-xs lg:max-w-2xl'>
                                            <div className='text-sm text-gray-900'>
                                                <div className='bg-blue-50 border-l-4 border-blue-400 rounded-r-lg'>
                                                    <div className='p-3'>
                                                        <div className={`leading-relaxed whitespace-pre-wrap break-words ${
                                                            !isExpanded && shouldShowToggle ? 'overflow-hidden' : ''
                                                        }`} style={!isExpanded && shouldShowToggle ? {
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 4,
                                                            WebkitBoxOrient: 'vertical'
                                                        } : {}}>
                                                            {isExpanded ? noteContent : (shouldShowToggle ? noteContent : truncateText(noteContent))}
                                                        </div>
                                                        
                                                        {shouldShowToggle && (
                                                            <button
                                                                onClick={() => toggleNoteExpansion(noteId)}
                                                                className='mt-2 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200'
                                                            >
                                                                {isExpanded ? (
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
                                            </div>
                                        </td>
                                        <td className='py-4 px-4 whitespace-nowrap align-top'>
                                            <div className='flex items-center gap-2'>
                                                <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                                                    <PiUser size={14} className="text-blue-600" />
                                                </div>
                                                <div>
                                                    <div className='text-sm font-medium text-gray-900'>
                                                        {note.postedBy?.first_name && note.postedBy?.second_name 
                                                            ? `${note.postedBy.first_name} ${note.postedBy.second_name}`
                                                            : 'Therapist'
                                                        }
                                                    </div>
                                                    <div className='text-xs text-gray-500'>
                                                        {note.postedBy?.role || 'Staff'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TherapyNotes
