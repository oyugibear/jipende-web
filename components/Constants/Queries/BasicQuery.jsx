"use client"
import { API_URL } from '@/config/api.config'
import axios from 'axios'
import React, { useState } from 'react'
import BasicInputs from '../fields/BasicInputs'
import BasicTextArea from '../fields/BasicTextArea'
import { message } from 'antd'

export default function BasicQuery() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [messageText, setMessageText] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log({name, email, phone, message})

        if(!name || !email || !phone || !message){
            message.error("Please fill in all fields")
            return
        }

        const details = {
            name: name,
            email: email,
            phone_number: phone,
            message: messageText
        }

        try {
            const {data} = await axios.post(`${API_URL}/query/add`, details)

            if(data){
                message.success("Message Sent")
                console.log(data)
            }

        } catch (error) {
            console.log("error: ", error)
            message.error("Message Not Sent")
        }
    }

  return (
    <div className='flex flex-col max-w-[800px] w-full mx-auto my-8 px-4'>
        <h2>Have a question, Let us know below</h2>
        <div className='flex flex-col gap-4'>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 my-4'>
                    <BasicInputs label='Name' value={name} setValue={setName} />
                    <BasicInputs label='Email' value={email} setValue={setEmail} />
                    <BasicInputs label='Phone Number' value={phone} setValue={setPhone}  />
                    <BasicTextArea label='Message' value={messageText} setValue={setMessageText} />
                    <button type='submit' className='button'>Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}
