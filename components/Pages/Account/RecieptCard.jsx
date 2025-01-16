import React from 'react'
import { PiDownload } from 'react-icons/pi'



export default function RecieptCard({title, date}) {
  return (
    <div className='flex flex-col w-full px-4 my-4'>
        <div className='flex flex-row w-full py-4 justify-between items-center'>
        <div className='flex flex-col text-sm'>
            <p className='italic'>{title}</p>
            <p className='text-slate-400 '>{date}</p>
        </div>

        <button className='p-4 rounded-full bg-[#FFD02A] text-black w-fit'>
            <PiDownload size={20}/>
        </button>
        </div>
        <hr />
    </div>
  )
}
