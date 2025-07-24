'use client'

import React, { useState } from 'react'
import { API_URL } from '@/config/api.config'
import { Button, Upload, message } from 'antd'
import axios from 'axios'
import { BsDownload } from 'react-icons/bs'
import { useAuth } from '@/context/AuthContext'
import ServicesList from '@/app/admin/ServicesList'
import BlogList from '@/app/admin/BlogList'

export default function WebsiteControls({services, blogs, setRefresh}) {

    const { user } = useAuth()

    const [click, setClick] = useState('')

    // values
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [picture, setPicture] = useState('')
    const [attendees, setAttendees] = useState('')
    const [location, setLocation] = useState('')
    const [duration, setDuration] = useState('')
    const [category, setCategory] = useState('')
    const [availability, setAvailability] = useState('')

    const [readingTime, setReadingTime] = useState('')    
    const [author, setAuthor] = useState('')    
    const [publisher, setPublisher] = useState('')
    const [blogText, setBlogText] = useState('')
    const [publisherLink, setPublisherLink] = useState('')

    const handleBlogSubmit = async (e) => {
        e.preventDefault()
        
        const details = {
            title: title,
            description: description,
            reading_time: readingTime,
            picture: picture,
            blog_text: blogText,
            author: author,
            publisher: publisher,
        }

        try {
            const {data} = await axios.post(`${API_URL}/blogs/add`, details)

            if(data){
                message.success("New Blog Created")
                console.log(data)
            }

        } catch (error) {
            console.log("error: ", error)
            message.error("New Blog Not Created")
        }
    }

    console.log("services: ", services)
    console.log("blogs: ", blogs)

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
