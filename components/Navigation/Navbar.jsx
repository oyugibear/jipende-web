"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {PiBrainThin, PiPersonSimple, PiShoppingBagOpenLight, PiHouseLine, PiDoorOpen, PiSpeakerHifi, PiBrain, PiFacebookLogo, PiInstagramLogo, PiTwitterLogo, PiY, PiVideoCameraoutubeLogo, PiYoutu, PiPersonSimplebeLogo, PiYoutubeLogo, PiBookLight} from 'react-icons/pi'
import { AiOutlineMenu } from 'react-icons/ai'
import { BsPersonBadge } from 'react-icons/bs'
import { Drawer, Badge } from 'antd';
import { BiChevronDown } from 'react-icons/bi'

import { Dropdown, Space } from 'antd';
import { useRouter } from 'next/navigation'
import { useLogout, useUser } from '@/context'
import { useSelector } from 'react-redux'

 
export default function Navbar() {

    const quantity = useSelector((state) => state?.cart?.quantity)

    const [hasMounted, setHasMounted] = useState(false)
    const logout = useLogout()
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
      setOpen(true);
    };

    const { user } = useUser()
  
    const onClose = () => {
      setOpen(false);
    };

    useEffect(() => {
        setHasMounted(true)
    }, [])

    
    if (!hasMounted) return null
    const handleLogout = () => {
        logout()
        router.push("/auth/signin")
    } 

    const items = [
        {
          key: '1',
          label: (
            <Link href='/account'>
                <p className=''>
                Account
                </p>
            </Link>
          ),
        },
        {
          key: '2',
          label: (
            <Link href='/admin'>
                <p className=''>
                Admin
                </p>
            </Link>
          ),
        },
        {
          key: '2',
          label: (
            <button  onClick={handleLogout} className='text-red-600 w-full rounded-lg m-0 '>
                Log Out
            </button>
          ),
        },
        
      ];


  return (
    <div className='w-full h-full flex items-center justify-center z-10 sticky'>
        <div className='w-full max-w-[1440px] hidden md:flex flex-row items-center justify-between py-4 my-4 mx-4 md:mx-6 '>
            <Link href='/'>
                <Image src='/assets/logo.png' alt='logo' width={100} height={100} className=''/>
            </Link>
            <div className='flex flex-row items-center gap-6'>
                <Link href='/services'>
                    <button className='flex flex-row items-center'>
                        <PiBrainThin size={25} />
                        <p className='pl-2'>Services</p>
                    </button>
                </Link>
                { user ? (
                    <Link href='/sessions'>
                        <button className='flex flex-row items-center'>
                            <PiPersonSimple size={25} />
                            <p className='pl-2'>Sessions</p>
                        </button>
                    </Link>
                ) : (
                    <Link href='/Blogs'>
                        <button className='flex flex-row items-center'>
                            <PiBookLight size={25} />
                            <p className='pl-2'>Blogs</p>
                        </button>
                    </Link>
                )}
                <Badge count={quantity} showZero>
                    <Link href='/cart'>
                        <button className='flex flex-row items-center pr-4 '>
                            <PiShoppingBagOpenLight size={25} />
                            <p className='pl-2'>Cart</p>
                        </button>
                    </Link>
                </Badge>
            </div>
            { !user ? (
                <Link href='/auth/signin'>
                    <button>Sign In / Sign Up</button>
                </Link>
            ) : (
                // <Link href='/account'>
                <Dropdown menu={{ items }}  placement="bottomRight">
                    <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <p className='flex flex-row items-center gap-2'>
                            <p>{user.first_name}</p>
                            <BiChevronDown size={20}/>
                        </p>
                    </Space>
                    </a>
                </Dropdown>
                    
                // </Link>
            )}
        </div>

        {/* Mobile View */}
        <div className='w-full h-full py-4 md:hidden flex flex-row items-center justify-between shadow-sm px-4 '>
            <Link href='/'>
                <Image src='/assets/logo.svg' alt='logo' width={60} height={60} className=''/>
            </Link>
            <div onClick={showDrawer}>
                <AiOutlineMenu size={30}/>
            </div>
        </div>

        {/* Drawer/ SideBar */}
        <Drawer width={250} placement="left" onClose={onClose} closable={false} open={open}>
            <div className='flex flex-col w-full h-full justify-between'>
                <div className='flex flex-col items-center w-full h-full'>
                    <div className='flex flex-row items-center justify-between w-full'>
                        <Link href='/'>
                            <Image  src='/assets/logo.svg' alt='logo' width={60} height={60} className=''/>
                        </Link>
                        <Link href='/cart'>
                            <Badge count={5}>
                                <div className=' rounded-full'>
                                    <PiShoppingBagOpenLight size={25} />
                                </div>
                            </Badge>
                        </Link>
                    </div>

                    <div className='flex flex-col w-full mt-8 gap-4'>
                        <Link href='/'>
                            <div onClick={onClose} className='flex flex-row items-center p-4 w-full active:bg-yellow-500 rounded-md'>
                                <PiHouseLine size={30} />
                                <p className='pl-4'>Home Page</p>
                            </div>                
                        </Link>
                        <Link href='/services'>
                            <div onClick={onClose} className='flex flex-row items-center p-4 w-full active:bg-yellow-500 rounded-md'>
                                <PiBrain size={30} />
                                <p className='pl-4'>Services</p>
                            </div>                
                        </Link>
                        { user ? (
                            <>
                                <Link href='/sessions'>
                                    <div onClick={onClose} className='flex flex-row items-center p-4 w-full active:bg-yellow-500 rounded-md'>
                                        <PiPersonSimple size={30} />
                                        <p className='pl-4'>Sessions</p>
                                    </div>                
                                </Link>
                                <Link href='/account'>
                                    <div onClick={onClose} className='flex flex-row items-center p-4 w-full active:bg-yellow-500 rounded-md'>
                                        <BsPersonBadge size={30} />
                                        <p className='pl-4'>Account</p>
                                    </div>                
                                </Link>
                            </>
                        ) : (
                            <Link href='/Blogs'>
                                <div onClick={onClose} className='flex flex-row items-center p-4 w-full active:bg-yellow-500 rounded-md'>
                                    <PiBookLight size={30} />
                                    <p className='pl-4'>Blogs</p>
                                </div>                
                            </Link>
                        )}
                        <Link href='/auth/signin'>
                            <div onClick={onClose} className='flex flex-row items-center p-4 w-full active:bg-yellow-500 rounded-md'>
                                <PiDoorOpen size={30} />
                                <p className='pl-4'>Sign In</p>
                            </div>                
                        </Link>
                    </div>
                </div>

                <div className='flex flex-row items-center justify-evenly'>
                    <Link href='https://www.facebook.com/jipendewellness/' target='_blank'>
                        <div className='p-2 border rounded-full bg-yellow-500'>
                            <PiFacebookLogo size={25}/>
                        </div>
                    </Link>
                    <Link href='https://www.instagram.com/jipendewellness/?hl=en' target='_blank'>
                        <div className='p-2 border rounded-full bg-yellow-500'>
                            <PiInstagramLogo size={25}/>
                        </div>
                    </Link>
                    <Link href='https://x.com/jipendewellness?lang=en' target='_blank'>
                        <div className='p-2 border rounded-full bg-yellow-500'>
                            <PiTwitterLogo size={25}/>
                        </div>
                    </Link>
                    <Link href='https://www.youtube.com/@africajipendewellness9825' target='_blank'>
                        <div className='p-2 border rounded-full bg-yellow-500'>
                            <PiYoutubeLogo size={25}/>
                        </div>
                    </Link>
                </div>
            </div>
        </Drawer>


    </div>
  )
}
