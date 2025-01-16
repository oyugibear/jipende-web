import React from 'react'

export default function OverflowBtn({setSelected, title, selected}) {
  return (
    <div onClick={() => setSelected(title)} className='flex flex-col justify-center items-center'>
        <p className={`${selected == title ? " text-black" : "text-slate-500"} whitespace-nowrap`}>{title}</p>
        <hr className={`${selected == title && "border border-yellow-400  max-w-[30px] w-full"} `}/>
    </div>
  )
}
