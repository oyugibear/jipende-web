"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {PiBrainThin, PiPersonSimple, PiShoppingBagOpenLight, PiHouseLine, PiDoorOpen, PiSpeakerHifi, PiBrain, PiFacebookLogo, PiInstagramLogo, PiTwitterLogo, PiY, PiVideoCameraoutubeLogo, PiYoutu, PiPersonSimplebeLogo, PiYoutubeLogo, PiBookLight, PiInfo, PiPhone, PiFileText} from 'react-icons/pi'
import { AiOutlineMenu } from 'react-icons/ai'
import { BsPersonBadge } from 'react-icons/bs'
import { Drawer, Badge } from 'antd';
import { BiChevronDown } from 'react-icons/bi'

import { Dropdown, Space } from 'antd';
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useSelector } from 'react-redux'
import SimpleLoading from '../Constants/Loading/SimpleLoading'
import { MdAdminPanelSettings } from 'react-icons/md'

 
export default function Navbar() {

    const quantity = useSelector((state) => state?.cart?.quantity)
    const { user, isAuthenticated, logout } = useAuth()

    const [hasMounted, setHasMounted] = useState(false)
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
      setOpen(true);
    };
  
    const onClose = () => {
      setOpen(false);
    };

    const handleLogout = () => {
        logout()
        router.push("/auth/login")
    } 

    const items = [
        {
          key: '1',
          label: (
            <Link href='/account'>
                Account
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
    
    const adminItems = [
    {
        key: '1',
        label: (
        <Link href='/account'>
            Account
        </Link>
        ),
    },
    {
        key: '2',
        label: (
        <Link href='/admin'>
            Admin
        </Link>
        ),
    },
    {
        key: '3',
        label: (
        <button  onClick={handleLogout} className='text-red-600 w-full rounded-lg m-0 '>
            Log Out
        </button>
        ),
    },
    
    ];


  return (
    <div className='w-full h-full flex items-center justify-center z-10 sticky'>
        <div className='w-full max-w-[1440px] hidden md:flex flex-row items-center justify-between py-4  mx-4 md:mx-6 '>
            <Link href='/'>
                <Image src='/assets/logo1.png' alt='logo' width={100} height={100} className=''/>
            </Link>
            <div className='flex flex-row items-center gap-6'>
                <Link href='/services'>
                    <button className='flex flex-row items-center'>
                        <PiBrainThin size={25} />
                        <p className='pl-2'>Services</p>
                    </button>
                </Link>
                { isAuthenticated ? (
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
            { !isAuthenticated ? (
                <Link href='/auth/login'>
                    <button>Sign In / Sign Up</button>
                </Link>
            ) : (
                user?.role === 'Admin' ? (
                    <Dropdown menu={{ items: adminItems }}  placement="bottomRight">
                        <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <div className='flex flex-row items-center gap-2'>
                                <span>{user?.first_name || 'Admin'}</span>
                                <BiChevronDown size={20}/>
                            </div>
                        </Space>
                        </a>
                    </Dropdown>
                ) : (
                    <Dropdown menu={{ items }}  placement="bottomRight">
                        <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <div className='flex flex-row items-center gap-2'>
                                <span>{user?.first_name || 'User'}</span>
                                <BiChevronDown size={20}/>
                            </div>
                        </Space>
                        </a>
                    </Dropdown>
                )
            )}
        </div>

        {/* Mobile View */}
        <div className='w-full h-full py-4 md:hidden flex flex-row items-center justify-between shadow-sm px-4 '>
            <Link href='/'>
                <Image src='/assets/logo1.png' alt='logo' width={60} height={60} className=''/>
            </Link>
            <div onClick={showDrawer}>
                <AiOutlineMenu size={30}/>
            </div>
        </div>

        {/* Drawer/ SideBar */}
        <Drawer 
            width={280} 
            placement="left" 
            onClose={onClose} 
            closable={false} 
            open={open}
            styles={{
                body: { padding: 0 }
            }}
        >
            <div className='flex flex-col w-full h-full justify-between bg-white'>
                {/* Header Section */}
                <div className='flex flex-col w-full'>
                    {/* Top Bar with Logo and Cart */}
                    <div className='flex flex-row items-center justify-between w-full p-6 pb-4 border-b border-yellow-200/50'>
                        <Link href='/' onClick={onClose}>
                            <Image src='/assets/logo1.png' alt='logo' width={70} height={70} className='hover:scale-105 transition-transform duration-200'/>
                        </Link>
                        <Link href='/cart' onClick={onClose}>
                            <Badge count={quantity} showZero>
                                <div className='p-3 rounded-full bg-white/80 shadow-sm hover:bg-white hover:shadow-md transition-all duration-200'>
                                    <PiShoppingBagOpenLight size={24} className="text-gray-700" />
                                </div>
                            </Badge>
                        </Link>
                    </div>

                    {/* User Welcome Section */}
                    {user && (
                        <div className='px-6 py-4 border-b border-yellow-200/50'>
                            <div className='flex items-center gap-3'>
                                <div className='w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center'>
                                    <span className='text-white font-semibold text-lg'>
                                        {user.first_name?.charAt(0) || 'U'}
                                    </span>
                                </div>
                                <div>
                                    <p className='font-semibold text-gray-800'>
                                        Hello, {user.first_name || 'User'}!
                                    </p>
                                    <p className='text-sm text-gray-600'>Welcome back</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Menu */}
                    <div className='flex flex-col w-full px-4 py-6 gap-2'>
                        <Link href='/' onClick={onClose}>
                            <div className='flex flex-row items-center p-4 w-full hover:bg-white/60 active:bg-yellow-100 rounded-xl transition-all duration-200 group'>
                                <div className='p-2 rounded-lg bg-white/80 group-hover:bg-yellow-500 group-hover:text-white transition-all duration-200'>
                                    <PiHouseLine size={24} />
                                </div>
                                <p className='pl-4 font-medium text-gray-800 group-hover:text-gray-900'>Home</p>
                            </div>                
                        </Link>
                        
                        <Link href='/services' onClick={onClose}>
                            <div className='flex flex-row items-center p-4 w-full hover:bg-white/60 active:bg-yellow-100 rounded-xl transition-all duration-200 group'>
                                <div className='p-2 rounded-lg bg-white/80 group-hover:bg-yellow-500 group-hover:text-white transition-all duration-200'>
                                    <PiBrain size={24} />
                                </div>
                                <p className='pl-4 font-medium text-gray-800 group-hover:text-gray-900'>Services</p>
                            </div>                
                        </Link>

                        <Link href='/Blogs' onClick={onClose}>
                            <div className='flex flex-row items-center p-4 w-full hover:bg-white/60 active:bg-yellow-100 rounded-xl transition-all duration-200 group'>
                                <div className='p-2 rounded-lg bg-white/80 group-hover:bg-yellow-500 group-hover:text-white transition-all duration-200'>
                                    <PiBookLight size={24} />
                                </div>
                                <p className='pl-4 font-medium text-gray-800 group-hover:text-gray-900'>Blogs</p>
                            </div>                
                        </Link>

                        <Link href='/about' onClick={onClose}>
                            <div className='flex flex-row items-center p-4 w-full hover:bg-white/60 active:bg-yellow-100 rounded-xl transition-all duration-200 group'>
                                <div className='p-2 rounded-lg bg-white/80 group-hover:bg-yellow-500 group-hover:text-white transition-all duration-200'>
                                    <PiInfo size={24} />
                                </div>
                                <p className='pl-4 font-medium text-gray-800 group-hover:text-gray-900'>About Us</p>
                            </div>                
                        </Link>

                        <Link href='/contacts' onClick={onClose}>
                            <div className='flex flex-row items-center p-4 w-full hover:bg-white/60 active:bg-yellow-100 rounded-xl transition-all duration-200 group'>
                                <div className='p-2 rounded-lg bg-white/80 group-hover:bg-yellow-500 group-hover:text-white transition-all duration-200'>
                                    <PiPhone size={24} />
                                </div>
                                <p className='pl-4 font-medium text-gray-800 group-hover:text-gray-900'>Contact</p>
                            </div>                
                        </Link>
                        
                        { user ? (
                            <>
                                <div className='w-full h-px  my-2'></div>
                                
                                <Link href='/sessions' onClick={onClose}>
                                    <div className='flex flex-row items-center p-4 w-full hover:bg-white/60 active:bg-yellow-100 rounded-xl transition-all duration-200 group'>
                                        <div className='p-2 rounded-lg bg-white/80 group-hover:bg-yellow-500 group-hover:text-white transition-all duration-200'>
                                            <PiPersonSimple size={24} />
                                        </div>
                                        <p className='pl-4 font-medium text-gray-800 group-hover:text-gray-900'>My Sessions</p>
                                    </div>                
                                </Link>
                                
                                <Link href='/account' onClick={onClose}>
                                    <div className='flex flex-row items-center p-4 w-full hover:bg-white/60 active:bg-yellow-100 rounded-xl transition-all duration-200 group'>
                                        <div className='p-2 rounded-lg bg-white/80 group-hover:bg-yellow-500 group-hover:text-white transition-all duration-200'>
                                            <BsPersonBadge size={24} />
                                        </div>
                                        <p className='pl-4 font-medium text-gray-800 group-hover:text-gray-900'>My Account</p>
                                    </div>                
                                </Link>

                                {user?.role === 'Admin' && (
                                    <Link href='/admin' onClick={onClose}>
                                        <div className='flex flex-row items-center p-4 w-full hover:bg-white/60 active:bg-yellow-100 rounded-xl transition-all duration-200 group'>
                                            <div className='p-2 rounded-lg bg-white/80 group-hover:bg-purple-500 group-hover:text-white transition-all duration-200'>
                                                <MdAdminPanelSettings size={24} />
                                            </div>
                                            <p className='pl-4 font-medium text-gray-800 group-hover:text-gray-900'>Admin Panel</p>
                                        </div>                
                                    </Link>
                                )}
                            </>
                        ) : (
                            <>
                                <div className='w-full h-px  my-4'></div>
                                
                                <Link href='/auth/login' onClick={onClose}>
                                    <div className='flex flex-row items-center p-4 w-full hover:bg-white/60 active:bg-yellow-100 rounded-xl transition-all duration-200 group'>
                                        <div className='p-2 rounded-lg bg-yellow-500 text-white group-hover:bg-yellow-600 transition-all duration-200'>
                                            <PiDoorOpen size={24} />
                                        </div>
                                        <p className='pl-4 font-medium text-gray-800 group-hover:text-gray-900'>Sign In / Sign Up</p>
                                    </div>                
                                </Link>
                            </>
                        )}

                        {user && (
                            <>
                                <div className='w-full h-px  my-4'></div>
                                
                                <button 
                                    onClick={() => {
                                        handleLogout();
                                        onClose();
                                    }}
                                    className='flex flex-row items-center p-4 w-full hover:bg-red-50 active:bg-red-100 rounded-xl transition-all duration-200 group'
                                >
                                    <div className='p-2 rounded-lg bg-red-500 text-white group-hover:bg-red-600 transition-all duration-200'>
                                        <PiDoorOpen size={24} />
                                    </div>
                                    <p className='pl-4 font-medium text-red-600 group-hover:text-red-700'>Log Out</p>
                                </button>
                            </>
                        )}

                        {/* Terms and Privacy Links */}
                        <div className='mt-6 pt-4 border-t border-yellow-200/50'>
                            <Link href='/terms' onClick={onClose}>
                                <div className='flex flex-row items-center p-3 w-full hover:bg-white/40 rounded-lg transition-all duration-200'>
                                    <PiFileText size={18} className="text-gray-500" />
                                    <p className='pl-3 text-sm text-gray-600'>Terms & Privacy</p>
                                </div>                
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer Social Links */}
                <div className='px-6 py-6 border-t border-yellow-200/50 bg-white/30'>
                    <p className='text-sm text-gray-600 mb-4 text-center font-medium'>Connect with us</p>
                    <div className='flex flex-row items-center justify-center gap-4'>
                        <Link href='https://www.facebook.com/jipendewellness/' target='_blank'>
                            <div className='p-3 rounded-full bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105'>
                                <PiFacebookLogo size={20} className="text-white"/>
                            </div>
                        </Link>
                        <Link href='https://www.instagram.com/jipendewellness/?hl=en' target='_blank'>
                            <div className='p-3 rounded-full bg-pink-500 hover:bg-pink-600 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105'>
                                <PiInstagramLogo size={20} className="text-white"/>
                            </div>
                        </Link>
                        <Link href='https://x.com/jipendewellness?lang=en' target='_blank'>
                            <div className='p-3 rounded-full bg-black hover:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105'>
                                <PiTwitterLogo size={20} className="text-white"/>
                            </div>
                        </Link>
                        <Link href='https://www.youtube.com/@africajipendewellness9825' target='_blank'>
                            <div className='p-3 rounded-full bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105'>
                                <PiYoutubeLogo size={20} className="text-white"/>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </Drawer>


    </div>
  )
}
