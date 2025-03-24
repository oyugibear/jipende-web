'use client'

import { API_URL } from '@/config/api.config'
import { Descriptions, Image, Modal } from 'antd'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ConfirmationModal from '@/components/Constants/Modals/ConfirmationModal'
import { useRouter } from 'next/navigation'
import BlogModal from '@/components/Pages/Admin/modals/BlogModal'
 
async function getBlog(id){
    const res = await axios.get(`${API_URL}/blog/${id}`)
    return res.data
}

export default function page({}) {

    const [blog, setBlog] = useState(null)
    const { id } = useParams();
    const [refresh, setRefresh] = useState(false)


    const router = useRouter()

    const getData = async () => {
      const data = await getBlog(id) || null
      setBlog(data.data)
    }
  
    useEffect(() => {
      getData()
    }, [refresh])

    console.log("blog", blog)

    const items = [
        {
            key: '1',
            label: 'Title',
            children: blog?.title
        },
        {
            key: '2',
            label: 'Reading Time',
            children: blog?.reading_time
        },
        {
            key: '3',
            label: 'Author',
            children: blog?.author
        },
        {
            key: '4',
            label: 'Publisher',
            children: blog?.publisher
        },
        {
            key: '5',
            label: 'Status',
            children: blog?.status
        },
        {
            key: '6',
            label: 'Category',
            children: blog?.category
        },
        {
            key: '7',
            label: 'Publisher Link',
            children: blog?.publisher
        },
        {
            key: '8',
            label: 'Description',
            children: blog?.description,
            span: 'filled'
        },
        {
            key: '8',
            label: 'Blog Text',
            children: blog?.blog_text,
            span: 'filled'
        },

    ]

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    

    const [deleteOpen, setDeleteOpen] = useState(false);
    
    const handleDelete = async () => {
        try {
            const {data} = await axios.delete(`${API_URL}/blog/${blog?._id}`)
            if(data){
                setDeleteOpen(false);
                setRefresh(true);
                router.push('/admin')
                console.log(data);
                
            }
        } catch (error) {
            console.log("error: ", error)
        }
    }

    const showDeleteModal = () => {
        setDeleteOpen(true);
    };


    return (
        <div className='flex flex-col w-full items-center justify-center py-12 p-4'>
            <div className='max-w-[1440px] w-full flex flex-col'>
                <h1 className='text-xl font-medium'>Blog Information</h1>
                <p>Below are are all the details concerning this blog</p>
                <div className='my-6 w-full'>
                    {/* <Image src={blog?.picture} alt='blog image' width={216} height={145} className='w-full md:max-w-[180px]'/> */}
                    <div className='w-full flex flex-row items-end justify-between my-4'>
                        <Image src={blog?.picture}  alt='blog image' className='w-full aspect-auto max-w-sm'/>
                        <div className='flex flex-row gap-3'>                        
                            <button  onClick={showModal} className='button hover:bg-yellow-300 text-sm font-bold'>
                                Edit
                            </button>
                            <button  onClick={showDeleteModal} className='button bg-red-500 hover:bg-red-300 text-sm font-bold'>
                                Delete
                            </button>
                        </div>
                    </div>
                    <Descriptions bordered layout="vertical" items={items} />
                </div>
            </div>
            <BlogModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} type='edit' details={blog} setRefresh={setRefresh}/>
            <ConfirmationModal isOpen={deleteOpen} setIsOpen={setDeleteOpen} handleFunction={handleDelete} />
        </div>
    )
}
