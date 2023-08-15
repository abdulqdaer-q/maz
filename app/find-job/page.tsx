import React from 'react'
import Navbar from '@/components/Navbar'
import SearchBar from '@/components/SearchBar'
import Image from 'next/image'
import findjop from '../../assets/findJob2.png'
import Filter from '@/components/Filter'
const page = () => {
  return (
    <div>
        <Navbar/>
        <div className=' px-10 pt-5 lg:pt-0 lg:px-20 bg-[#D9EAF5] h-[750px] lg:h-[500px]  flex flex-row justify-center  items-center flex-wrap'>
            <div className=' lg:w-[60%] flex flex-col gap-10 '>
                <h1 className=' text-[#444C63]  font-bold text-[45px] ' >Find Job</h1>
                <p className='text-[1.5rem]  font-[400]' >create a profile and apply for new job opportunities find professionals that best match your job requirements</p>
                <SearchBar/>
            </div>
            <div className=' lg:w-[40%]'>
                <Image className=' m-auto'  width={400} height={400} src={findjop} alt='offer.png' />
            </div>
        </div>
        <div className=' pt-5 px-5 flex flex-col  lg:flex-row  items-center gap-20'>
            <div>
                <Filter/>
            </div>
            <div className='  flex flex-row items-center justify-center flex-wrap gap-5'>
               
            </div>
        </div>
    </div>
  )
}

export default page