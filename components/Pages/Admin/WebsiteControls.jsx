'use client'

import React, { useState } from 'react'
import { API_URL } from '@/config/api.config'
import { Button, Upload, message } from 'antd'
import axios from 'axios'
import { BsDownload } from 'react-icons/bs'
import { useUser } from '@/context'

export default function WebsiteControls() {

    const { user } = useUser()

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // const formData = new FormData();
        // formData.append("title", title);
        // formData.append("description", description);
        // formData.append("price", price);
        // formData.append("picture", picture); // Append the file
        // formData.append("number_of_attendees", attendees);
        // formData.append("location", location);
        // formData.append("duration", duration);
        // formData.append("category", category);
        // formData.append("availability", availability);
        // formData.append("postedBy", user?._id);

        const details = {
        title: title,
        description: description,
        price: price,
        picture: picture,
        number_of_attendees: attendees,
        location: location,
        duration: duration,
        category: category,
        availability: availability,
        postedBy: user?._id
        }

        try {
        const {data} = await axios.post(`${API_URL}/service/add`, details)

        if(data){
            message.success("New Service Created")
            console.log(data)
        }
        } catch (error) {
        console.log("error: ", error)
        message.error("New Service Not Created")
        }
    }

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
            const {data} = await axios.post(`${API_URL}/blog/add`, details)

            if(data){
                message.success("New Blog Created")
                console.log(data)
            }

        } catch (error) {
            console.log("error: ", error)
            message.error("New Blog Not Created")
        }
    }

    return (
        <div className='flex flex-col py-12 items-center justify-center w-full'>
        <h2 className='head-text-2'>Website Controls</h2>
        <div className='flex flex-col md:flex-row items-center my-4 gap-4'>
            <button onClick={() => setClick('Service')} className='button'>
                Add New Service
            </button>
            <button onClick={() => setClick('Booking')} className='button'>
                Add New Booking
            </button>
            <button onClick={() => setClick('Blogs')} className='button'>
                Add New Blog
            </button>
        </div>

        { click == 'Service' ? (
            <div className='flex flex-col my-6 w-full'>
                <form onSubmit={(e) => handleSubmit(e)} className='w-full '>
                    <div className='flex flex-col md:flex-row gap-4 py-4 w-full'>
                        <div className='flex flex-col w-full'>
                            <label className='text-xs text-slate-400'>Title</label>
                            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className='admin-input'/>
                        </div>
                        <div className='flex flex-col w-full'>
                            <label className='text-xs text-slate-400'>Description</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} type="text" className='admin-input'/>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row gap-4 py-4 w-full'>
                        <div className='flex flex-col w-full'>
                            <label className='text-xs text-slate-400'>Max number of attendants</label>
                            <input value={attendees} onChange={(e) => setAttendees(e.target.value)} type="number" className='admin-input'/>
                        </div>
                        <div className='flex flex-col w-full'>
                            <label className='text-xs text-slate-400'>Location (type online if online)</label>
                            <input value={location} onChange={(e) => setLocation(e.target.value)} type="text" className='admin-input'/>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row gap-4 py-4 w-full'>
                        <div className='flex flex-col w-full'>
                            <label className='text-xs text-slate-400'>Time Duration (mins)</label>
                            <input value={duration} onChange={(e) => setDuration(e.target.value)} type="number" className='admin-input'/>
                        </div>
                        <div className='flex flex-col w-full'>
                            <label className='text-xs text-slate-400'>Category</label>
                            <select placeholder='notice' id='notice' value={category} onChange={(e) => setCategory(e.target.value)} className='admin-input'>
                                <option value={"Outdoors Group Therapy"}>Outdoors Group Therapy</option>
                                <option value={"Outdoors Indiviual Therapy"}>Outdoors Indiviual Therapy</option>
                                <option value={"Online Indivual Therapy"}>Online Indivual Therap </option>
                                <option value={"Online Group Therapy"}>Online Group Therapy </option>
                                <option value={"In-Person Group Therapy"}>In-Person Group Therapy</option>
                                <option value={"In-Person Indivual Therapy"}>In-Person Indivual Therapy</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row gap-4 py-4 w-full'>
                        <div className='flex flex-col w-full'>
                            <label className='text-xs text-slate-400'>Availability</label>
                            <input value={availability} onChange={(e) => setAvailability(e.target.value)} type="text" className='admin-input'/>
                        </div>
                        <div className='flex flex-col w-full'>
                            <label className='text-xs text-slate-400'>Price</label>
                            <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" className='admin-input'/>
                        </div>
                    </div>
                    <div className='flex flex-col my-8'>
                        <label className='text-xs text-slate-400'>Upload Cover Imgae</label>
                        <Upload
                            beforeUpload={(file) => {
                                setPicture(file);
                                return false; // Prevent actual upload for now
                            }}
                            listType="picture"
                        >
                            <Button icon={<BsDownload />}>Upload</Button>
                        </Upload>
                    </div>

                    <button className='button mt-4'>
                        Submit
                    </button>
                </form>
            </div>
        
        ) : click == 'Booking' ? (
            <div className='flex flex-col my-6 w-full'>
                <form onSubmit={(e) => handleSubmit(e)} className='w-full '>
                    <div className='flex flex-col md:flex-row gap-4 py-4 w-full'>
                        <div className='flex flex-col w-full'>
                            <label className='text-xs text-slate-400'>Title</label>
                            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className='admin-input'/>
                        </div>
                        <div className='flex flex-col w-full'>
                            <label className='text-xs text-slate-400'>Description</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} type="text" className='admin-input'/>
                        </div>
                    </div>
                </form>
            </div>
        ) : click == 'Blogs' ? (
            <div className='flex flex-col my-6 w-full'>
                <form onSubmit={handleBlogSubmit} className='w-full '>
                    <div className='flex flex-col md:flex-col gap-4 py-4 w-full'>
                        <div className='flex flex-row gap-6'>
                            <div className='flex flex-col w-full'>
                                <label className='text-xs text-slate-400'>Title</label>
                                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className='admin-input'/>
                            </div>
                            <div className='flex flex-col w-full'>
                                <label className='text-xs text-slate-400'>Reading Time (3 mins)</label>
                                <input value={readingTime} onChange={(e) => setReadingTime(e.target.value)} type="text" className='admin-input'/>
                            </div>
                            <div className='flex flex-col w-full'>
                                <label className='text-xs text-slate-400'>Publisher Link</label>
                                <input value={publisherLink} onChange={(e) => setPublisherLink(e.target.value)} type="text" className='admin-input'/>
                            </div>
                        </div>
                        <div className='flex flex-row gap-6'>
                            <div className='flex flex-col w-full'>
                                <label className='text-xs text-slate-400'>Publisher</label>
                                <input value={publisher} onChange={(e) => setPublisher(e.target.value)} type="text" className='admin-input'/>
                            </div>
                            <div className='flex flex-col w-full'>
                                <label className='text-xs text-slate-400'>Author</label>
                                <input value={author} onChange={(e) => setAuthor(e.target.value)} type="text" className='admin-input'/>
                            </div>
                            <div className='flex flex-col w-full'>
                                <label className='text-xs text-slate-400'>Image Url</label>
                                <input value={picture} onChange={(e) => setPicture(e.target.value)} type="text" className='admin-input'/>
                            </div>
                        </div>
                        <div className='flex flex-row gap-6'>
                            <div className='flex flex-col w-full'>
                                <label className='text-xs text-slate-400'>Description</label>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} type="text" className='admin-input'/>
                            </div>
                            <div className='flex flex-col w-full'>
                                <label className='text-xs text-slate-400'>Blog Text</label>
                                <textarea value={blogText} onChange={(e) => setBlogText(e.target.value)} type="text" className='admin-input'/>
                            </div>
                        </div>
                    </div>

                    <button className='button mt-4'>
                        Submit
                    </button>
                </form>
            </div>
        ) : null}


    </div>
    )
}
