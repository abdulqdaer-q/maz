import React from 'react'

const SearchBar = () => {
  return (
    <form>
        <div className="flex pr-4">
            <div className="relative w-full">
                <input type="search" id="search-dropdown" className=" pl-3 rounded-[35px] rounded-r-[35px]   block py-5 w-full z-20 text-sm text-gray-900 bg-[#FFF]  focus:outline-none border-l-gray-50 border-l-2 border border-gray-300 " placeholder="search service by title" required/>
                <button type="submit" className="   rounded-r-[35px]   absolute top-0 right-0 py-5 px-6 text-sm font-medium h-full text-white bg-sky-500  border  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>   
                </button>
            </div>
        </div>
    </form>
  )
}

export default SearchBar