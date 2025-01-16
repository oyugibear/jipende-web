import Hero from '@/components/Pages/Services/Hero'
import Card from '@/components/Pages/Services/ServiceCard/Card'
import { API_URL } from '@/config/api.config'

import React from 'react'
import { IoIosArrowDropdownCircle } from 'react-icons/io'

async function getServices(){
    const res = await fetch(`${API_URL}/services`,  {cache: "no-store"})
    return res.json()
}

const page = async () => {

    const services = await getServices()
    // console.log("services: ", services)
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
        <Hero />
        <div className='flex flex-col w-full max-w-[1440px] my-8 items-center justify-center'>
            <div className='flex flex-row items-start md:items-center w-full md:justify-evenly md:max-w-[800px] whitespace-nowrap overflow-x-auto pb-42 md:pb-0'>
                <div className='flex flex-row mx-4 items-center '>
                    <p className='mr-2 font-light'>Therapy Type</p>
                    <IoIosArrowDropdownCircle className='text-[#FFD02A]'/>
                </div>
                <div className='flex flex-row mx-4 items-center'>
                    <p className='mr-2 font-light'>Commitments</p>
                    <IoIosArrowDropdownCircle className='text-[#FFD02A]'/>
                </div>
                <div className='flex flex-row mx-4 items-center'>
                    <p className='mr-2 font-light'>Price</p>
                    <IoIosArrowDropdownCircle className='text-[#FFD02A]'/>
                </div>
                <div className='flex flex-row mx-4 items-center'>
                    <p className='mr-2 font-light'>Location</p>
                    <IoIosArrowDropdownCircle className='text-[#FFD02A]'/>
                </div>
            </div>
            {/* Cards */}
            <div className='flex flex-wrap justify-evenly items-start w-full gap-y-4 my-12 px-4'>
                {services?.data?.map((service) => (
                    <Card service={service} key={service._id}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default page