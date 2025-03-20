import React from 'react'

export default function BasicSelectArea({label, value, setValue, options}) {
  return (
    <div className='flex flex-col'>
     <label className='text-xs text-slate-800' >{label}</label>
     <select value={value} onChange={(e) => setValue(e.target.value)} className='p-2 border w-full rounded-md'>
       <option>-</option>
        {options.map((option) => (
          <>
            <option key={option.key} value={option.value}>{option.label}</option>
          </>
        ))}
      </select>
    </div>
  )
}
