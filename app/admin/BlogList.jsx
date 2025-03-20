"use client"
import SimpleTable from '@/components/Constants/tables/SimpleTable';
import BlogModal from '@/components/Pages/Admin/modals/BlogModal';
import Link from 'next/link';
import React, { useState } from 'react'

export default function BlogList({blogs, setRefresh}) {
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'reading time',
            dataIndex: 'reading_time',
            key: 'reading_time',
        },
        {
            title: 'publisher',
            dataIndex: 'publisher',
            key: 'publisher',
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Link href={`/admin/blogs/${record?.action._id}`}>
                    View
                </Link>
            )
        }
    ]

    const fixedData = blogs?.data?.map((item) => {
        return {
            title: item?.title,
            author: item?.author,
            reading_time: item?.reading_time,
            picture: item?.picture,
            blog_text: item?.blog_text,
            publisher: item?.publisher,
            publiseher_link: item?.publiseher_link,
            status: item?.status,
            category: item?.category,
            action: item
        }
    }) || []


    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (type) => {
        setIsModalOpen(true);
    };
  return (
    <div className='flex flex-col items-center w-full py-12'>
        <div className='flex flex-row items-end justify-between w-full max-w-[1240px]'>
            <h2 className='italic text-lg'>Blogs</h2>
            <button onClick={showModal} className='button text-sm'>
                Add New Blog
            </button>
        </div>

        <div className='flex flex-col items-center mt-8 w-full gap-4 max-w-[1240px]'>
            <SimpleTable data={fixedData} columns={columns} scroll={{ x: 1000 }}/>
        </div>
        { isModalOpen && (
            <BlogModal type='add' setIsOpen={setIsModalOpen} isOpen={isModalOpen} setRefresh={setRefresh}/>
        )}
    </div>
  )
}
