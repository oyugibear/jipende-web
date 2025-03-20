import React from 'react'

export default function BasicTextArea({label, value, setValue}) {
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className='flex flex-col gap-2'>
        <label className='text-xs text-slate-800'>{label}</label>
        <textarea type="text" value={value} onChange={handleChange} name="name" id="name" className='p-2 border w-full rounded-md' />
    </div>
  )
}
