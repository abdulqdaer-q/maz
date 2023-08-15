import Navbar from '@/components/Navbar'
import React from 'react'
import offer from '../../assets/offer.png'
import Image from 'next/image'
import SearchBar from '@/components/SearchBar'
import OfferCard from '@/components/OfferCard'
import Filter from '@/components/Filter'
const page = () => {

    const offers=[{
    id:1,
    jobTitle:"Customer Support",
    companyImg:"https://materializecss.com/images/sample-1.jpg",
    publisherImg:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    publisherName:"mohammed mazktle",
    salary:23
    }]
  return (
    <div className=''>
        <Navbar/>
        <div className=' px-2 pt-5 lg:pt-0 lg:px-20 bg-[#D9EAF5] h-[720px] lg:h-[500px]  flex flex-row justify-center items-center flex-wrap'>
            <div className=' lg:w-[60%] flex flex-col gap-10 '>
                <h1 className=' text-[#444C63]  font-bold text-[45px] ' >Offer Service</h1>
                <p className='text-[1.5rem]  font-[400]' >find and order service from on demand professionals in 100+ categories.</p>
                <SearchBar/>
            </div>
            <div className=' lg:w-[40%]'>
                <Image className=''  width={500} height={500} src={offer} alt='offer.png' />
            </div>
        </div>

        <div className=' pt-5 px-5 flex flex-col  lg:flex-row  items-center gap-20'>
            <div>
                <Filter/>
            </div>
            <div className='  flex flex-row items-center justify-center flex-wrap gap-5'>
               {
                offers.map((e)=>{
                    return(
                        <OfferCard id={e.id} jobTitle={e.jobTitle} companyImg={e.companyImg} publisherImg={e.publisherImg} publisherName={e.publisherName} salary={e.salary}/>
                    )
                })
               }
            </div>
        </div>
    </div>
  )
}

export default page