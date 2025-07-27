"use client"

import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import countriesData from '@/data/countries.json';
import Link from 'next/link';

export default function RegisterPage() {
  const [hasMounted, setHasMounted] = useState(false)
  const { register } = useAuth();
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  const countries = countriesData.countries;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [nationality, setNationality] = useState('');
  const [residence, setResidence] = useState('Kenya');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setHasMounted(true)
  }, [])


  if (!hasMounted) return null

  const checkInputs = () => {
    if(!firstName){
      return false
    } else if(!lastName){
      return false
    }else if(!email){
      return false
    } else if(!phoneNumber){
      return false
    } else if(!dob){
      return false
    } else if(!password){
      return false
    } else if(!nationality){
      return false
    } else if(!residence){
      return false
    } 
    return true
  }

  const checkFields = checkInputs()


  const handleSubmit = async (e) => {
    e.preventDefault()
    let details = {
      first_name: firstName,
      second_name: lastName,
      email: email,
      phone_number: phoneNumber,
      country_of_residence: residence,
      nationality: nationality,
      date_of_birth: dob,
      password: password,
      role: "Client"

    }
    // console.log(details)

    
    try {
      const {data} = await axios.post(`${API_URL}/auth/register`, {
        first_name: firstName,
        second_name: lastName,
        email: email,
        phone_number: phoneNumber,
        country_of_residence: residence,
        nationality: nationality,
        date_of_birth: dob,
        password: password,
        role: "Client"
      }) 
      
      if(data){
        message.success("Your Account has Been Created")
        console.log(data)
        router.push("/")
      }
    } catch (error) {
      console.log(error)
      message.error("There was an issue with registration")
    }
  }
  return (
    <div className='w-full flex flex-col py-12  px-4 items-center justify-center'>
      <div className='flex flex-col items-center justify-center w-full max-w-[470px]'>
        <h1 className='text-md:3xl text-xl font-semibold'>Register</h1>

        <form onSubmit={(e) => handleSubmit(e)} className='my-8 w-full'>
          <div className='flex flex-col w-full items-start mt-4'>
            <label className='text-xs text-slate-800 font-thin'>First Name</label>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className='p-2 border w-full rounded-sm mt-1'/>
          </div>
          <div className='flex flex-col w-full items-start mt-4'>
            <label className='text-xs text-slate-800 font-thin'>Last Name</label>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className='p-2 border w-full rounded-sm mt-1'/>
          </div>
          <div className='flex flex-col w-full items-start mt-4'>
            <label className='text-xs text-slate-800 font-thin'>Phone Number</label>
            {/* <PhoneInput placeholder="Phone Number" value={value} onChange={setValue} country="US"/> */}
            <input value={phoneNumber} placeholder='+254 70000000' onChange={(e) => setPhoneNumber(e.target.value)} type="text" className='p-2 border w-full rounded-sm mt-1'/>
          </div>
          <div className='flex flex-col w-full items-start mt-4'>
            <label className='text-xs text-slate-800 font-thin'>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className='p-2 border w-full rounded-sm mt-1'/>
          </div>
          <div className='flex flex-col w-full items-start mt-4'>
            <label className='text-xs text-slate-800 font-thin'>Date Of Birth</label>
            <input value={dob} onChange={(e) => setDob(e.target.value)} type="date" className='p-2 border w-full rounded-sm mt-1'/>
          </div>
          <div className='flex flex-col w-full items-start mt-4'>
            <label className='text-xs text-slate-800 font-thin'>Nationality</label>
            <input value={nationality} onChange={(e) => setNationality(e.target.value)} type="text" className='p-2 border w-full rounded-sm mt-1'/>
          </div>
          <div className='flex flex-col w-full items-start mt-4'>
            <label className='text-xs text-slate-800 font-thin'>Country of Residence</label>
            <select value={residence} onChange={(e) => setResidence(e.target.value)} className='p-2 border w-full rounded-sm mt-1'>
              {countries?.map((country) => (
                <option key={country.name.official} value={country.name.common} className='text-sm'>{country.name.common}</option>
              ))}
            </select>
          </div>
          <div className='flex flex-col w-full items-start mt-4'>
            <label className='text-xs text-slate-800 font-thin'>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className='p-2 border w-full rounded-sm mt-1'/>
          </div>
          <div className='flex flex-col w-full items-start mt-4'>
            <label className='text-xs text-slate-800 font-thin'>Confirm Password</label>
            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className='p-2 border w-full rounded-sm mt-1'/>
          </div>

          <button type='submit' disabled={checkFields == false} className={`w-full bg-[#FFD02A] text-sm font-medium text-black uppercase flex cursor-pointer justify-center p-4 mt-8 ${checkFields == false && 'bg-gray-200 cursor-default'}`}>
            Register
          </button>
        </form>

      </div>
    </div>
  )
}
