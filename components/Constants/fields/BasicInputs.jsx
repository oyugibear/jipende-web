'use client'
import React from 'react'

export default function BasicInputs({label, value, setValue, type}) {
  return (
    <div className='flex flex-col'>
     <label className='text-xs text-slate-800' htmlFor='name'>{label}</label>
     {type == 'number' ? (
       <input type="number" value={value} onChange={(e) => setValue(e.target.value)} name="name" id="name" className='p-2 border w-full rounded-md' />
     ) : type == 'email' ? (
       <input type="email" value={value} onChange={(e) => setValue(e.target.value)} name="name" id="name" className='p-2 border w-full rounded-md' />
     ) : (
       <input type="text" value={value} onChange={(e) => setValue(e.target.value)} name="name" id="name" className='p-2 border w-full rounded-md' />
     )}
    </div>
  )
}
