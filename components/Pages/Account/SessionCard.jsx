'use client'

import ChangeDateModal from '@/components/Constants/Modals/ChangeDateModal'
import Image from 'next/image'
import React from 'react'


export default function OnlineServiceCard({data,type}) {

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const showModal = (type) => {
  //     setIsModalOpen(true);
  // };
  return (
    <div className='flex flex-col p-4'>
        <div className='flex flex-col py-4 md:flex-row w-full items-start'>
          <div className='flex flex-row items-center justify-center'>
            <div className='flex flex-col w-full md:w-[500px] items-center justify-center shadow-sm p-2 rounded-md'>
              <Image src={data.picture} alt='service card image' width={216} height={145} className='w-full h-[180px] object-cover rounded-md'/>
            </div>
            <div className='w-full my-4 md:pl-4'>
            <p className='text-lg font-medium'>{data?.title}</p>
            <p className=' text-slate-400 my-2'> {data?.description?.substring(0, 100)}...</p>
            <p className='text-sm italic'> Date: {data?.date}</p>
            <p className='text-sm italic'> Time: {data?.time}</p>
            </div>
          </div>

          <div className='flex flex-col gap-2 w-full md:w-fit mt-2 text-sm'>
            {type == "Online" ? (
              <>
                {data?.meeting_link ? (
                    <button className='flex w-full bg-[#FFD02A] whitespace-nowrap justify-center py-2 px-4'>
                      Meeting Link
                    </button>
                ) : (
                  <button className='flex w-full bg-[#FFD02A] whitespace-nowrap justify-center py-2 px-4'>
                    Meeting Link Unavailable
                  </button>
                )}
              </>
            ) : null}
            {/* <button className='flex bg-black text-white whitespace-nowrap justify-center py-2 px-4'>
              Change Location & Time
            </button> */}
          </div>
        </div>
        <hr />
        {/* <ChangeDateModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} type={type} serviceDetails={data}/> */}
    </div>
  )
}
