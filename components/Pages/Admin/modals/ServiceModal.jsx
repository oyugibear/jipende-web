'use client'

import BasicInputs from '@/components/Constants/fields/BasicInputs';
import BasicTextArea from '@/components/Constants/fields/BasicTextArea';
import { Button, message, Modal, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import BasicSelectArea from '@/components/Constants/fields/BasicSelectArea';
import { Basic } from 'next/font/google';
import axios from 'axios';
import { API_URL } from '@/config/api.config';

export default function ServiceModal({isOpen, setIsOpen, setRefresh, type, serviceDetails}) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [picture, setPicture] = useState(null);
    const [numberOfAttendees, setNumberOfAttendees] = useState('');
    const [location, setLocation] = useState('');
    const [duration, setDuration] = useState('');
    const [category, setCategory] = useState('');
    const [availability, setAvailability] = useState('');
    const [loading, setLoading] = useState(false);

    const props = {
        action: '//jsonplaceholder.typicode.com/posts/',
        listType: 'picture',
        accept: 'image/*',
        beforeUpload: (file) => {
          setPicture(file);
          return false; // Prevent automatic upload
        },
        onRemove: () => {
          setPicture(null);
        },
        previewFile(file) {
          console.log('Your upload file:', file);
          // Your process logic. Here we just mock to the same file
          return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
            method: 'POST',
            body: file,
          })
            .then((res) => res.json())
            .then(({ thumbnail }) => thumbnail);
        },
    };

    const handleAdd = async () => {
        try {
            if (
                !title ||
                !description ||
                !price ||
                !picture ||
                !numberOfAttendees ||
                !location ||
                !duration ||
                !category ||
                !availability
            ) {
                message.error('Please fill in all the fields');
                return;
            }

            const details = {
                title: title,
                description: description,
                price: price,
                picture: picture,
                number_of_attendees: numberOfAttendees,
                location: location,
                duration: duration,
                category: category,
                availability: availability,
            }
            
            const {data} = await axios.post(`${API_URL}/service/add`, details)
            if (data) {
                message.success('Service added successfully')
                setIsOpen(false);
                setRefresh(true);
            }
        } catch (error) {
            message.error('An error occured unable to add service')
            console.log(error)
        }
    }

    const handleUpdate = async () => {
        try {
          const updatedData = {};
          if (title !== serviceDetails?.title && title !== '') {
            updatedData.title = title;
          }
          if (description !== serviceDetails?.description && description !== '') {
            updatedData.description = description;
          }
          if (price !== serviceDetails?.price && price !== '') {
            updatedData.price = price;
          }
          if (picture !== serviceDetails?.picture && picture !== null) {
            updatedData.picture = picture;
          }
          if (numberOfAttendees !== serviceDetails?.number_of_attendees && numberOfAttendees !== '') {
            updatedData.number_of_attendees = numberOfAttendees;
          }
          if (location !== serviceDetails?.location && location !== '') {
            updatedData.location = location;
          }
          if (duration !== serviceDetails?.duration && duration !== '') {
            updatedData.duration = duration;
          }
          if (category !== serviceDetails?.category && category !== '') {
            updatedData.category = category;
          }
          if (availability !== serviceDetails?.availability && availability !== '') {
            updatedData.availability = availability;
          }
    
          if (Object.keys(updatedData).length === 0) {
            message.info('No changes to update');
            return;
          }
    
          const { data } = await axios.put(`${API_URL}/service/${serviceDetails.id}`, updatedData);
          if (data) {
            message.success('Service updated successfully');
            setRefresh(true);
            setIsOpen(false);
          }
        } catch (error) {
          message.error('An error occurred, unable to update service');
          console.log(error);
        }
    };

    const handleCancel = () => {
        setIsOpen(false);
    }

    const categories = [
        {label: 'Individual Awareness', value: 'Individual Awareness'},
        {label: 'Self Development', value: 'Self Development'},
        {label: 'Mental Awareness', value: 'Mental Awareness'},
        {label: 'Group Wellness', value: 'Group Wellness'},
    ]

    const durations = [
        {label: '30 Minutes', value: '30 Minutes'},
        {label: '1 Hour', value: '1 Hour'},
        {label: '2 Hours', value: '2 Hours'},
        {label: '3 Hours', value: '3 Hours'},   
    ]
    const statuses = [
        {label: 'Active', value: 'Active'},
        {label: 'Inactive', value: 'Inactive'},
    ]

    if (type == 'add') {
        return (
            <Modal title="Add new Service" onOk={handleAdd} open={isOpen} onCancel={handleCancel} footer={<Button key="submit" color="blue" variant="solid" loading={loading} onClick={handleAdd}> Submit</Button>}>
                <div className='flex flex-col gap-4 overflow-x-hidden'>
                    <BasicInputs label='Title' value={title} setValue={setTitle} />
                    <BasicInputs label='Price' value={price} setValue={setPrice} />
                    <BasicInputs label='Number of Attendees' value={numberOfAttendees} setValue={setNumberOfAttendees} />
                    <BasicInputs label='Location' value={location} setValue={setLocation} />
                    <BasicSelectArea label='Duration' value={duration} setValue={setDuration} options={durations}/>
                    <BasicSelectArea label='Category' value={category} setValue={setCategory} options={categories}/>
                    <BasicSelectArea label='Availability' value={availability} setValue={setAvailability} options={statuses}/>
                    <BasicTextArea label='Description' value={description} setValue={setDescription} />
                    <Upload {...props}>
                        <div className='flex flex-col gap-2'>
                            <label className='text-xs text-slate-800'>Upload Image</label>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </div>
                    </Upload>

                </div>
            </Modal>
        )
    }
    return (
            <Modal title="Edit Service" onOk={handleUpdate} open={isOpen} onCancel={handleCancel} footer={<Button key="submit" color="blue" variant="solid" loading={loading} onClick={handleAdd}> Submit</Button>}>
                <div className='flex flex-col gap-4 overflow-x-hidden'>
                    <BasicInputs label='Title' value={title} setValue={setTitle} />
                    <BasicInputs label='Price' value={price} setValue={setPrice} />
                    <BasicInputs label='Number of Attendees' value={numberOfAttendees} setValue={setNumberOfAttendees} />
                    <BasicInputs label='Location' value={location} setValue={setLocation} />
                    <BasicSelectArea label='Duration' value={duration} setValue={setDuration} options={durations}/>
                    <BasicSelectArea label='Category' value={category} setValue={setCategory} options={categories}/>
                    <BasicSelectArea label='Availability' value={availability} setValue={setAvailability} options={statuses}/>
                    <BasicTextArea label='Description' value={description} setValue={setDescription} />
                    <Upload {...props}>
                        <div className='flex flex-col gap-2'>
                            <label className='text-xs text-slate-800'>Upload Image</label>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </div>
                    </Upload>

                </div>
            </Modal>
    )
}
