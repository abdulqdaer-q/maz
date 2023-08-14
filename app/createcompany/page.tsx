import Navbar from "@/components/Navbar";
import CostumFileInput from "@/components/CostumFileInput";
function page() {
  return (
    <div className="bg-gray-200 pb-6">
      <Navbar />
      <main className="bg-white h-full m-20 rounded-3xl pt-4 shadow-md pb-24 px-12">
        <h2 className="text-blue-500 text-4xl text-center mt-6">
          Create Company Page
        </h2>
        <h1 className="text-lg text-gray-700 text-center  mt-2 mb-12">
          Let&apos;s Get Started With A Few Details About Your Buisness
        </h1>
        <form action="">
          <div className="grid grid-cols-5">
            <div className="col-span-1">
              <label className="flex w-full my-5 justify-center font-semibold">
                Company Information
              </label>
              <label className="flex w-full mb-5 justify-center mt-32 font-semibold">
                Location
              </label>
              <label className="flex w-full my-5 justify-center mt-8 font-semibold">
                Company Logo
              </label>
              <label className="flex w-full mt-32 justify-center font-semibold">
                Company Website
              </label>
              <label className="flex w-full mt-12 justify-center font-semibold">
                Company Tagline
              </label>
            </div>
            <div className="col-span-3 col-start-2">
              <input
                type="text"
                className="h-10 rounded-md border border-gray-400 ml-6 w-full my-4"
              />
              <select className="h-10 rounded-md border border-gray-400 ml-6 w-full my-4 text-gray-400">
                <option value="" disabled selected hidden className="">
                  Select Industry
                </option>
              </select>
              <select className="h-10 rounded-md border border-gray-400 ml-6 w-3/4 my-4 "></select>
              <CostumFileInput
                first="p-4 h-36 w-1/4 flex flex-col items-center gap-2 bg-blue-100 text-blue-400 rounded-full cursor-pointer border border-dashed mx-4 border-gray-400"
                second="p-4 mt-4 bg-blue-100 overflow-hidden text-ellipsis "
              />
              <input
                placeholder="Example www.Company.com"
                type="text"
                className="h-10 rounded-md border border-gray-400 ml-6 w-full my-4 pl-4"
              />
              <input
                placeholder="Example: One Of The World's Largest"
                type="text"
                className="h-20 rounded-md border border-gray-400 ml-6 w-full my-4 pl-4"
              />
            </div>
            <div className="col-span-1 col-start-5 row-end-4 pr-6">
              <button className="w-full bg-blue-600 h-12 mb-20 text-white text-sm col-span-2 col-start-2 rounded-lg mt-6">
                Create Company Page
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default page;
