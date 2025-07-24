'use client'

import SimpleLoading from "@/components/Constants/Loading/SimpleLoading";
import AboutUs from "@/components/Pages/Homepage/AboutUs";
import Blog from "@/components/Pages/Homepage/Blog";
import Cta from "@/components/Pages/Homepage/Cta";
import Services from "@/components/Pages/Homepage/Services";
import Slider from "@/components/Pages/Homepage/Slider";
import { API_URL } from "@/config/api.config";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PiArrowRightThin } from "react-icons/pi";

async function getBlogs(){
  const res = await fetch(`${API_URL}/blogs`,  {cache: "reload"})
  return res.json()
}

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setHasMounted(true)
    
    const fetchBlogs = async () => {
      try {
        const blogData = await getBlogs()
        setBlogs(blogData.data || [])
      } catch (error) {
        console.error("Error fetching blogs:", error)
        setBlogs([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchBlogs()
  }, [])

  if (!hasMounted || loading) return (<SimpleLoading />)
  
  const filteredBlogs = blogs.slice(0, 3)
  
  return (
    <main className='w-full h-full flex flex-col justify-center items-center text-sm'>
      <Slider />
      <Services />
      <AboutUs />
      <Blog blogs={filteredBlogs}/>
      <Cta />
      {/* <ReduxExample /> */}
    </main>
  )
}