import Navbar from "@/components/Navbar";
import CostumFileInput from "@/components/CostumFileInput";
function page() {
  return (
    <div className="bg-gray-200 pb-6">
      <Navbar />
      <main className="bg-white h-full m-20 rounded-3xl pt-4 shadow-md">
        <h2 className="text-blue-500 text-4xl text-start ml-10">Signup</h2>
        <h1 className="text-sm text-gray-700 text-start  mt-2 ml-10">
          Enter your information to be able to post on our website.
        </h1>

        <form action="" className="grid grid-cols-2">
          <div className="grid grid-cols-3 mt-8">
            <div className="col-span-1 space-y-10">
              <label className="flex w-full mb-5 justify-center ">
                First Name
              </label>
              <label className="flex w-full mb-5 justify-center">
                Last Name
              </label>
              <label className="flex w-full mb-5 justify-center">
                Birthday
              </label>
              <label className="flex w-full mb-5 justify-center">
                Location
              </label>
              <label className="flex w-full mb-5 justify-center">Mobile</label>
              <label className="flex w-full mb-5 justify-center">
                Job Title
              </label>
              <label className="flex w-full mb-5 justify-center">
                Your Profile Image
              </label>
            </div>
            <div className="col-span-2 space-y-6">
              <input
                type="text"
                className="h-10 rounded-md border border-black ml-6"
              />
              <input
                type="text"
                className="h-10 rounded-md border border-black ml-6"
              />
              <input
                type="date"
                className="h-10 rounded-md border border-black ml-6"
              />
              <input
                type="text"
                className="h-10 rounded-md border border-black ml-6"
              />
              <input
                type="number"
                className="h-10 rounded-md border border-black ml-6"
                placeholder="+963"
              />
              <input
                type="text"
                className="h-10 rounded-md border border-black ml-6"
              />
              <CostumFileInput
                first="p-4 h-28 flex flex-col items-center gap-2 bg-blue-100 text-blue-400 rounded-lg cursor-pointer border border-dashed mx-4 border-gray-600"
                second="p-4 mt-4 bg-blue-100 overflow-hidden text-ellipsis "
              />
            </div>
          </div>

          <div className="grid grid-cols-3 mt-8">
            <div className="col-span-1 space-y-10">
              <label className="flex w-full mb-5 justify-center items-start ">
                Email
              </label>
              <label className="flex w-full mb-5 justify-center items-start mt-4">
                Password
              </label>
              <label className="flex w-full mb-5 justify-center items-start mt-4">
                Confirm
              </label>
              <label className="flex w-full mb-5 justify-center items-start mt-4">
                ID Number
              </label>
              <label className="flex w-full mb-5 justify-center items-start mt-4">
                CV
              </label>
            </div>

            <div className="col-span-2 space-y-6">
              <input
                type="email"
                className="h-10 rounded-md border border-black ml-6"
              />
              <input
                type="password"
                className="h-10 rounded-md border border-black ml-6"
              />
              <input
                type="password"
                className="h-10 rounded-md border border-black ml-6"
              />
              <input
                type="text"
                className="h-10 rounded-md border border-black ml-6"
              />

              <CostumFileInput
                first="p-4 h-28 flex flex-col items-center gap-2 bg-blue-100 text-blue-400 rounded-lg cursor-pointer border border-dashed mx-4 border-gray-600"
                second="p-4 mt-4 bg-blue-100 overflow-hidden text-ellipsis "
              />
            </div>

            <p className="col-span-2 col-start-2 mt-4">
              if you do not have a CV,
              <a className="text-blue-400 hover:cursor-pointer">click here</a>
              to create one
            </p>
            <button className="w-4/5 bg-blue-600 h-12 mb-20 text-white text-lg col-span-2 col-start-2 mt-20">
              Submit
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default page;
