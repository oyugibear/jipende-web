'use client'

import BasicInputs from '@/components/Constants/fields/BasicInputs';
import BasicTextArea from '@/components/Constants/fields/BasicTextArea';
import { Button, message, Modal, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import BasicSelectArea from '@/components/Constants/fields/BasicSelectArea';
import axios from 'axios';
import { API_URL } from '@/config/api.config';
import { useAuth } from '@/context/AuthContext';

export default function ServiceModal({isOpen, setIsOpen, setRefresh, type, serviceDetails}) {

    const { token } = useAuth();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [picture, setPicture] = useState(null);
    const [numberOfAttendees, setNumberOfAttendees] = useState('');
    const [location, setLocation] = useState('');
    const [locationAddress, setLocationAddress] = useState('');
    const [duration, setDuration] = useState('');
    const [category, setCategory] = useState('');
    const [availability, setAvailability] = useState('');
    const [loading, setLoading] = useState(false);

  
    const props = {
        listType: "picture",
        accept: "image/*",
        onChange(info) {
          console.log("info", info.file);
          setPicture(info.file); // ✅ Use `info.file` directly
        },
        onRemove: () => {
          setPicture(null);
        },
        beforeUpload: () => false, // Prevent automatic upload
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

        setLoading(true);
        console.log("Uploading file:", picture);
        // Create a FormData object to send the image file
        const formData = new FormData();
        formData.append("file", picture);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('number_of_attendees', numberOfAttendees);
        formData.append('location', location);
        formData.append('location_address', locationAddress);
        formData.append('duration', duration);
        formData.append('category', category);
        formData.append('availability', availability);

        const { data } = await axios.post(`${API_URL}/service/add`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
        });

        if (data) {
          message.success('Service added successfully');
          setIsOpen(false);
          setRefresh(true);
          setLoading(false);
        }
      } catch (error) {
        message.error('An error occured unable to add service')
        console.log(error)
      }
    }


    const handleUpdate = async () => {
        try {
            const updatedData = new FormData();
            if (title !== serviceDetails?.title && title !== '') {
              updatedData.append('title', title);
            }
            if (description !== serviceDetails?.description && description !== '') {
              updatedData.append('description', description);
            }
            if (price !== serviceDetails?.price && price !== '') {
              updatedData.append('price', price);
            }
            if (picture !== serviceDetails?.picture && picture !== null) {
              updatedData.append('file', picture);
            }
            if (numberOfAttendees !== serviceDetails?.number_of_attendees && numberOfAttendees !== '') {
              updatedData.append('number_of_attendees', numberOfAttendees);
            }
            if (location !== serviceDetails?.location && location !== '') {
              updatedData.append('location', location);
            }
            if (locationAddress !== serviceDetails?.location_address && locationAddress !== '') {
              updatedData.append('location_address', locationAddress);
            }
            if (duration !== serviceDetails?.duration && duration !== '') {
              updatedData.append('duration', duration);
            }
            if (category !== serviceDetails?.category && category !== '') {
              updatedData.append('category', category);
            }
            if (availability !== serviceDetails?.availability && availability !== '') {
              updatedData.append('availability', availability);
            }
            
            console.log(updatedData)
            if (!Array.from(updatedData.entries()).length) {
                message.info('No changes to update');
                return;
            }
        
              const { data } = await axios.put(`${API_URL}/services/${serviceDetails?._id}`, updatedData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                ...(token && { Authorization: `Bearer ${token}` }),
              },
            });
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

    const locations = [
        {label: 'In Person', value: 'In Person'},
        {label: 'Online', value: 'Online'},
    ]

    if (type == 'add') {
        return (
            <Modal title="Add new Service" onOk={handleAdd} open={isOpen} onCancel={handleCancel} footer={<Button key="submit" color="blue" variant="solid" loading={loading} onClick={handleAdd}> Submit</Button>}>
                <div className='flex flex-col gap-4 overflow-x-hidden'>
                    <BasicInputs label='Title' value={title} setValue={setTitle} />
                    <BasicInputs label='Price' value={price} setValue={setPrice} type="number"/>
                    <BasicInputs label='Number of Attendees' value={numberOfAttendees} setValue={setNumberOfAttendees} type="number"/>
                    
                    <BasicSelectArea label='Location' value={location} setValue={setLocation} options={locations} />
                    {location == "In Person" && <BasicInputs label='Location Address' value={locationAddress} setValue={setLocationAddress} />}
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
            <Modal title="Edit Service" onOk={handleUpdate} open={isOpen} onCancel={handleCancel} footer={<Button key="submit" color="blue" variant="solid" loading={loading} onClick={handleUpdate}> Submit</Button>}>
                <div className='flex flex-col gap-4 overflow-x-hidden'>
                    <BasicInputs label='Title' value={title} setValue={setTitle} />
                    <BasicInputs label='Price' value={price} setValue={setPrice} />
                    <BasicInputs label='Number of Attendees' value={numberOfAttendees} setValue={setNumberOfAttendees} />
                    <BasicSelectArea label='Location' value={location} setValue={setLocation} options={locations} />
                    {location == "In Person" && <BasicInputs label='Location Address' value={locationAddress} setValue={setLocationAddress} />}
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
