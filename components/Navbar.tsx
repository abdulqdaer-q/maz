import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import Dropdown from "./Dropdown";
function Navbar() {
  return (
    <div className="border-b border-gray-800 shadow-md  flex justify-start items-center sticky top-0 bg-white z-10">
      {/* Logo */}
      <Image src="/logo.png" alt="logo" height={100} width={100} />

      {/* Search Bar */}
      <div className="flex border border-gray-600 rounded-2xl items-center justify-center my-auto mx-2 ">
        <input
          type="text"
          placeholder="search jobs"
          className="mx-4 focus:outline-none text-sm p-2 text-start italic "
        />
        <MagnifyingGlassIcon className="h-full w-4 mr-1 text-gray-600" />
      </div>

      {/* DropDowns */}
      <div className="flex space-x-4 items-center">
        <Dropdown title="Find" start="Find" />
        <Dropdown title="Your Offer" start="Offer" />
        <a href="" className="text-sm  text-gray-600 hover:bg-gray-50">
          Companies
        </a>

        {/* Login */}
      </div>
      <div className="space-x-6 ml-auto mr-2">
        <button className="border border-blue-500 rounded-3xl px-8 py-1 text-blue-500">
          Login
        </button>
        <button className=" bg-blue-500 rounded-3xl px-8 py-1 text-white ">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Navbar;
