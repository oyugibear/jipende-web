'use client'

import React, { useState } from 'react'
import OverflowBtn from '@/components/Constants/OverflowBtn'
import Image from 'next/image'
import RecieptCard from '@/components/Pages/Account/RecieptCard'
import { PiDownload, PiPen } from 'react-icons/pi'
import { message } from 'antd'

export default function Information({data}) {

    const [selected, setSelected] = useState('Reciepts')
    const [selectedReciept, setSelectedReciept] = useState('Reciepts')
  
    const [editName, setEditName] = useState(false)
    const [name, setName] = useState('')
    const [editEmail, setEditEmail] = useState(false)
    const [email, setEmail] = useState('')
    const [editNumber, setEditNumber] = useState(false)
    const [number, setNumber] = useState('')
    const [editGender, setEditGender] = useState(false)
    const [gender, setGender] = useState('')
    const [editAge, setEditAge] = useState(false)
    const [age, setAge] = useState('')
    const [editPassword, setEditPassword] = useState(false)
    const [password, setPassword] = useState('')

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    const handleDeleteAccount = () => { 
        message.error('You will be email soon about deleting your account')
    }

  return (
    <div className='flex flex-col my-12 w-full md:max-w-[900px] '>
        <div className='flex flex-row items-center md:justify-evenly px-4 pb-4 md:pb-0 md:px-0 w-full gap-4 overflow-x-auto'>
            <OverflowBtn setSelected={setSelected} selected={selected} title='Reciepts' />
            {/* <OverflowBtn setSelected={setSelected} selected={selected} title='Edit Account Info' /> */}
            <OverflowBtn setSelected={setSelected} selected={selected} title='Account Setting' />
        </div>

        <div className='my-12 flex flex-col'>
        { selected == 'Reciepts' ? (
            <div className='flex flex-col items-center w-full'>
            <div className='flex flex-row gap-4'>
                {/* <div onClick={() => setSelectedReciept("Invoices")} className='flex flex-col justify-center items-center'>
                <p>Invoices</p>
                <hr className={`${selectedReciept == "Invoices" && "block border border-yellow-400  max-w-[30px] w-full "} `}/>
                </div> */}
                <div onClick={() => setSelectedReciept("Reciepts")} className='flex flex-col justify-center items-center'>
                <p>Reciepts</p>
                <hr className={`${selectedReciept == "Reciepts" && "block  border border-yellow-400  max-w-[30px] w-full"} `}/>
                </div>
            </div>
            
            <div className='flex flex-col w-full my-8'>
                { selectedReciept == "Invoices" ? (
                    <div className='flex flex-col w-full'>
                        <RecieptCard title='Invoice for in person therapy' link='/' date='12/12/23'/>
                    </div>
                ) : (
                    <div className='flex flex-col w-full'>
                        {data?.bookings?.data?.map((booking) => (
                            data?.payments?.data?.map((payment) => (
                                <RecieptCard
                                key={payment?.id} // Ensure each element has a unique key
                                title={`Receipt For Therapy On ${formatDate(booking?.createdAt)}`}
                                link={payment?.receipt_pdf}
                                date={`${booking?.services[0]?.date} ${booking?.services[0]?.time}`}
                                />
                            ))
                        ))}
                
                    </div>
                )}
            </div>
            </div>
        ) : selected == 'Edit Account Info' ? (
            <div className='flex flex-col items-center w-full my-8 px-4'>
            <div className='flex flex-col w-full '>
                <div className='flex flex-row w-full items-center my-4 '>
                <div className='flex flex-col text-sm w-full'>
                    <p className='text-xs text-slate-400'>Name</p>
                    <p>Arthur Oduor</p>
                </div>

                <PiPen onClick={() => setEditName((prev) => !prev)} size={20}/>
                </div>

                { editName ? (
                <div className='my-4 w-full flex flex-col'>
                    <label className='text-xs text-slate-400'>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='p-2 border rounded-md w-full' />
                </div>
                ): null}
                <hr />
            </div>
            <div className='flex flex-col w-full '>
                <div className='flex flex-row w-full items-center my-4 '>
                <div className='flex flex-col text-sm w-full'>
                    <p className='text-xs text-slate-400'>Email</p>
                    <p>a@x.com</p>
                </div>

                <PiPen onClick={() => setEditEmail((prev) => !prev)} size={20}/>
                </div>

                { editEmail ? (
                <div className='my-4 w-full flex flex-col'>
                    <label className='text-xs text-slate-400'>Email</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className='p-2 border rounded-md w-full' />
                </div>
                ): null}
                <hr />
            </div>
            <div className='flex flex-col w-full '>
                <div className='flex flex-row w-full items-center my-4 '>
                <div className='flex flex-col text-sm w-full'>
                    <p className='text-xs text-slate-400'>Phone Number</p>
                    <p>+254 70000000</p>
                </div>

                <PiPen onClick={() => setEditNumber((prev) => !prev)} size={20}/>
                </div>

                { editNumber ? (
                <div className='my-4 w-full flex flex-col'>
                    <label className='text-xs text-slate-400'>Phone Number</label>
                    <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} className='p-2 border rounded-md w-full' />
                </div>
                ): null}
                <hr />
            </div>
            <div className='flex flex-col w-full '>
                <div className='flex flex-row w-full items-center my-4 '>
                <div className='flex flex-col text-sm w-full'>
                    <p className='text-xs text-slate-400'>Gender</p>
                    <p>Male</p>
                </div>

                <PiPen onClick={() => setEditGender((prev) => !prev)} size={20}/>
                </div>

                { editGender ? (
                <div className='my-4 w-full flex flex-col'>
                    <label className='text-xs text-slate-400'>Gender</label>
                    <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className='p-2 border rounded-md w-full' />
                </div>
                ): null}
                <hr />
            </div>
            <div className='flex flex-col w-full '>
                <div className='flex flex-row w-full items-center my-4 '>
                <div className='flex flex-col text-sm w-full'>
                    <p className='text-xs text-slate-400'>Age</p>
                    <p>22</p>
                </div>

                <PiPen onClick={() => setEditAge((prev) => !prev)} size={20}/>
                </div>

                { editAge ? (
                <div className='my-4 w-full flex flex-col'>
                    <label className='text-xs text-slate-400'>How old are you</label>
                    <input type="text" value={age} onChange={(e) => setAge(e.target.value)} className='p-2 border rounded-md w-full' />
                </div>
                ): null}
                <hr />
            </div>
            <div className='flex flex-col w-full '>
                <div className='flex flex-row w-full items-center my-4 '>
                <div className='flex flex-col text-sm w-full'>
                    <p className='text-xs text-slate-400'>Change Password</p>
                    <p>••••••••</p>
                </div>

                <PiPen onClick={() => setEditPassword((prev) => !prev)} size={20}/>
                </div>

                { editPassword ? (
                <div className='my-4 w-full flex flex-col'>
                    <label className='text-xs text-slate-400'>Change Pasword</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='p-2 border rounded-md w-full' />
                </div>
                ): null}
                <hr />
            </div>
            
            <button className='bg-[#FFD02A] rounded-sm w-full md:w-fit px-4 py-2 text-black mt-4'>
                Change
            </button>
            </div>
        ) : selected == 'Account Setting' ? (
            <div className='flex flex-col items-center w-full'>
            <div className='my-8 flex flex-col justify-center items-center'>
                <p className='text-lg font-bold text-red-700'>Delete Account</p>
                <p className='text-slate-400 my-4'>
                By deleting your account you will be deleting all the information you have given us through this website
                </p>
                <button onClick={handleDeleteAccount} className='px-4 py-2 w-full md:w-fit bg-red-600 text-white text-sm rounded-md mt-4'>
                    Delete Now
                </button>
            </div>
            </div>
        ) : null}
        </div>

    </div>
  )
}
