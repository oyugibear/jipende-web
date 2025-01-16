import React from 'react'

export default function BasicTextArea({label, value, setValue}) {
  return (
    <div className='flex flex-col gap-2'>
        <label htmlFor="name">{label}</label>
        <textarea type="text" value={value} setValue={setValue} name="name" id="name" className='p-2 border border-gray-300 rounded-md' />
    </div>
  )
}
