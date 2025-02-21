import React from 'react'

export default function BasicSelectArea({label, value, setValue, options}) {
  return (
    <div className='flex flex-col'>
     <label className='text-xs text-slate-800' htmlFor='name'>{label}</label>
     <select value={value} onChange={(e) => setValue(e.target.value)} className='p-2 border w-full rounded-md'>
        {options.map((option) => (
          <option key={option.key} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}
