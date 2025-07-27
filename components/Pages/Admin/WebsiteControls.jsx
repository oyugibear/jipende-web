'use client'

import React, { useState } from 'react'
import { API_URL } from '@/config/api.config'
import { Button, Upload, message } from 'antd'
import axios from 'axios'
import { BsDownload } from 'react-icons/bs'
import { useAuth } from '@/context/AuthContext'
import ServicesList from '@/app/admin/ServicesList'
import BlogList from '@/app/admin/BlogList'
import ServiceDescList from '@/app/admin/ServiceDescList'

export default function WebsiteControls({services, blogs, setRefresh}) {

    const [click, setClick] = useState('')

    return (
        <div className='flex flex-col py-12 items-center justify-center w-full'>
        <h2 className='head-text-2'>Website Controls</h2>
        <div className='flex flex-col md:flex-row items-center my-4 gap-4'>
            <button onClick={() => setClick('Service')} className='button'>
                Manage Services
            </button>
            <button onClick={() => setClick('Blogs')} className='button'>
                Manage Blogs
            </button>
            {/* <button onClick={() => setClick('Blogs')} className='button'>
                Manage Service Description
            </button> */}
        </div>

        { click == 'Service' ? (
            <ServicesList services={services} setRefresh={setRefresh}/>
        ) :  click == 'Blogs' ? (
            <BlogList blogs={blogs} setRefresh={setRefresh}/>
        ) : click == 'Service Description' ? (
            <ServiceDescList services={services} setRefresh={setRefresh}/>
        ) : null}

        

    </div>
    )
}
