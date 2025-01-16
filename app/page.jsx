import AboutUs from "@/components/Pages/Homepage/AboutUs";
import Blog from "@/components/Pages/Homepage/Blog";
import Cta from "@/components/Pages/Homepage/Cta";
import ReduxExample from "@/components/Pages/Homepage/ReduxExample";
import Services from "@/components/Pages/Homepage/Services";
import Slider from "@/components/Pages/Homepage/Slider";
import { API_URL } from "@/config/api.config";
import Image from "next/image";
import { PiArrowRightThin } from "react-icons/pi";

async function getBlogs(){
  const res = await fetch(`${API_URL}/blogs`,  {cache: "no-store"})
  return res.json()
}

export default async function Home() {

  const blogs = await getBlogs()
  const filteredBlogs = blogs.data.slice(0, 3)
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
