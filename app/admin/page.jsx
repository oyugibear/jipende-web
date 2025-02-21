'use client'

import WebsiteControls from '@/components/Pages/Admin/WebsiteControls'
import { API_URL } from '@/config/api.config'
import { useUser } from '@/context'
import { Button, Upload, message } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BsDownload } from 'react-icons/bs'
import Widgets from './Widgets'
import Sessions from './Sessions'
import UserList from './UserList'
import PaymentsList from './PaymentsList'

async function getUsers(){
    const res = await fetch(`${API_URL}/users`, {cache: "reload"})
    return res.json()
}
async function getServices(){
    const res = await fetch(`${API_URL}/services`, {cache: "reload"})
    return res.json()
}
async function getBlogs(){
    const res = await fetch(`${API_URL}/blogs`, {cache: "reload"})
    return res.json()
}
async function getBookings(){
    const res = await fetch(`${API_URL}/bookings`, {cache: "reload"})
    return res.json()
}
async function getPayments(){
    const res = await fetch(`${API_URL}/payments`, {cache: "reload"})
    return res.json()
}


export default function page() {
    
    const { user } = useUser()
    const router = useRouter()
    useEffect(() => {
        if(!user){
            router.push("/")
        }
    }, [user])
    
    const [users, setUsers] = useState([]);
    const [services, setServices] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [payments, setPayments] = useState([]);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        getUsers().then(data => setUsers(data));
        getServices().then(data => setServices(data));
        getBlogs().then(data => setBlogs(data));
        getBookings().then(data => setBookings(data));
        getPayments().then(data => setPayments(data));
    }, []);

    console.log(users)
    
  return (
    <div className='w-full h-full flex flex-col justify-center items-center text-sm py-8'>
        <h1 className='head-text'>Admin Dashboard</h1>
        <div className='max-w-[1520px] w-full  px-4 flex flex-col'>
            <Widgets users={users} services={services} payments={payments} bookings={bookings}/>
            <hr />
            <WebsiteControls services={services} blogs={blogs}/>
            <hr />
            <Sessions bookings={bookings}/>
            <hr />
            <UserList users={users}/>
            <hr />
            <PaymentsList payments={payments}/>
        </div>
    </div>
  )
}
