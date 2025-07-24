'use client'

import BasicInputs from '@/components/Constants/fields/BasicInputs';
import BasicTextArea from '@/components/Constants/fields/BasicTextArea';
import { Button, message, Modal, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import BasicSelectArea from '@/components/Constants/fields/BasicSelectArea';
import axios from 'axios';
import { API_URL } from '@/config/api.config';

export default function BlogModal({isOpen, setIsOpen, setRefresh, type, details}) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [readingTime, setReadingTime] = useState('');
    const [picture, setPicture] = useState(null);
    const [blogText, setBlogText] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [publisherLink, setPublisherLink] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('not published');
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
          !readingTime ||
          !picture ||
          !blogText ||
          !author ||
          !publisher ||
          !publisherLink ||
          !category ||
          !status
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
        formData.append('reading_time', readingTime);
        formData.append('blog_text', blogText);
        formData.append('author', author);
        formData.append('publisher', publisher);
        formData.append('publisher_link', publisherLink);
        formData.append('category', category);
        formData.append('status', status);

        const { data } = await axios.post(`${API_URL}/blogs/add`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
        });

        if (data) {
          message.success('Blog added successfully');
          setIsOpen(false);
          setRefresh(true);
          setLoading(false);
        }
      } catch (error) {
        message.error('An error occured unable to add Blog')
        console.log(error)
      }
    }


    const handleUpdate = async () => {
        try {
            const updatedData = new FormData();
            if (title !== details?.title && title !== '') {
              updatedData.append('title', title);
            }
            if (description !== details?.description && description !== '') {
              updatedData.append('description', description);
            }
            if (readingTime !== details?.reading_time && readingTime !== '') {
              updatedData.append('reading_time', readingTime);
            }
            if (picture !== details?.picture && picture !== null) {
              updatedData.append('file', picture);
            }
            if (blogText !== details?.blog_text && blogText !== '') {
              updatedData.append('blog_text', blogText);
            }
            if (author !== details?.author && author !== '') {
              updatedData.append('author', author);
            }
            if (publisher !== details?.publisher && publisher !== '') {
              updatedData.append('publisher', publisher);
            }
            if (publisherLink !== details?.publisher_link && publisherLink !== '') {
              updatedData.append('publisher_link', publisherLink);
            }
            if (category !== details?.category && category !== '') {
              updatedData.append('category', category);
            }
            if (status !== details?.status && status !== '') {
              updatedData.append('status', status);
            }
            
            console.log(updatedData)
            if (!Array.from(updatedData.entries()).length) {
                message.info('No changes to update');
                return;
            }
        
            const { data } = await axios.put(`${API_URL}/blogs/${details?._id}`, updatedData);
            if (data) {
                message.success('blog updated successfully');
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

    // const durations = [
    //     {label: '30 Minutes', value: '30 Minutes'},
    //     {label: '1 Hour', value: '1 Hour'},
    //     {label: '2 Hours', value: '2 Hours'},
    //     {label: '3 Hours', value: '3 Hours'},   
    // ]
    const statuses = [
        {label: 'Active', value: 'Active'},
        {label: 'Inactive', value: 'Inactive'},
    ]

    if (type == 'add') {
        return (
            <Modal title="Add new Blog" onOk={handleAdd} open={isOpen} onCancel={handleCancel} footer={<Button key="submit" color="blue" variant="solid" loading={loading} onClick={handleAdd}> Submit</Button>}>
                <div className='flex flex-col gap-4 overflow-x-hidden'>
                    <BasicInputs label='Title' value={title} setValue={setTitle} />
                    <BasicInputs label='Reading Time' value={readingTime} setValue={setReadingTime} />
                    <BasicInputs label='Author' value={author} setValue={setAuthor} />
                    <BasicInputs label='Publisher' value={publisher} setValue={setPublisher} />
                    <BasicInputs label='Publisher Link' value={publisherLink} setValue={setPublisherLink} />
                    <BasicSelectArea label='Category' value={category} setValue={setCategory} options={categories}/>
                    <BasicSelectArea label='Status' value={status} setValue={setStatus} options={statuses}/>
                    <BasicTextArea label='Description' value={description} setValue={setDescription} />
                    <BasicTextArea label='Blog Text' value={blogText} setValue={setBlogText} />
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
            <Modal title="Edit Blog" onOk={handleUpdate} open={isOpen} onCancel={handleCancel} footer={<Button key="submit" color="blue" variant="solid" loading={loading} onClick={handleUpdate}> Submit</Button>}>
                <div className='flex flex-col gap-4 overflow-x-hidden'>
                    <BasicInputs label='Title' value={title} setValue={setTitle} />
                    <BasicInputs label='Reading Time' value={readingTime} setValue={setReadingTime} />
                    <BasicInputs label='Author' value={author} setValue={setAuthor} />
                    <BasicInputs label='Publisher' value={publisher} setValue={setPublisher} />
                    <BasicInputs label='Publisher Link' value={publisherLink} setValue={setPublisherLink} />
                    <BasicSelectArea label='Category' value={category} setValue={setCategory} options={categories}/>
                    <BasicSelectArea label='Status' value={status} setValue={setStatus} options={statuses}/>
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
