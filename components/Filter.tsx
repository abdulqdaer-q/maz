'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
const Filter = () => {
    const form=useForm();
    const {register,handleSubmit}= form
    const categories=['Web,IT & Mobile' ,'medical & healthcare','medical & healthcare','design & creative','legal & finance' ]
    const jobtype=["part time", "full time"]

   type FormType={
    categorie:string,
    jobType:string,
    country:string,
    from:number,
    to:number

   }
    const onSubmit=(data:FormType)=>{
        console.log(data)
    }
  return (
    <div className='py-5'>
        <form className='flex flex-row lg:flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
        <div className=''>
            <label className='pl-3 '>Categories</label>
            <ul className='pt-2' >
                {categories.map((e)=>{
                    return(
                    <li className=' py-2 text-sm lg:text-base pl-7'>
                        <input type='radio' value={e} {...register("categorie")}/>
                        <label  htmlFor="">{e}</label>
                    </li>
                    )
                })}
            </ul> 
        </div>
        <div className='pb-5'>
        <label className='pl-3'>jobtype</label>
            <ul className='pt-2'>
            {jobtype.map((e)=>{
                return(
                    <li className='pl-7 text-sm lg:text-base py-2'>
                        <input type='radio' value={e} {...register("jobType")}/>
                        <label htmlFor="">{e}</label>
                    </li>
                )
            })}
             </ul> 
        </div>
            <div className='pb-5 pl-5 flex flex-col '>
            <label className='' htmlFor="">country</label> 
                <input className=' max-w-xs border-gray-400 border' type='text' {...register("country")} />
            <label className=' ' htmlFor="">From</label>
                <input className='max-w-xs border-gray-400 border' type="number" min={0} {...register("from")} />
            <label className='' htmlFor="">to</label>
                <input className=' max-w-xs border-gray-400 border' type="number" min={0} {...register("to")} />  
                < button type='submit' className= 'text-white mt-10 max-w-[200px]  bg-sky-400 px-10 py-2 rounded-xl ml-3'>Serach</button>
            </div>
            
 
            </form>
       
    </div>
  )
}

export default Filter