import Image from "next/image";

function page() {
  return (
    <div className="bg-white">
      <main className="bg-gray-200  h-full m-20 rounded-3xl relative">
        <div className="grid grid-cols-2 h-full">
          <div className=" border-r border-gray-400 h-full relative">
            <Image src="/logo.png" alt="logo" fill={true} />
          </div>
          <div>
            <h2 className="text-blue-500 text-4xl text-center  mt-16">Login</h2>
            <h1 className="text-sm text-gray-700 text-center  mt-8">
              if you have an account, please enter your email and password
            </h1>
            <form action="" className="flex flex-col items-start mt-16 px-8">
              <label className="flex flex-col w-full mb-5">
                Email
                <input type="email" className="h-12 rounded-md" />
              </label>
              <label className="flex flex-col w-full">
                Password
                <input type="password" className="h-12 rounded-md" />
              </label>
              <label className="text-sm flex items-end">
                <input
                  type="checkbox"
                  className="h-4 w-4 mt-2 mr-2 appearance-none border-2 border-blue-500 rounded-sm bg-gray-200
                  checked:bg-blue-600 checked:border-0
  focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-blue-100
  disabled:border-steel-400 disabled:bg-steel-400"
                />
                Remember Me
              </label>
              <button className="w-full bg-blue-600 h-10 mt-6 mb-44 text-white text-lg">
                Login
              </button>
            </form>
          </div>
        </div>
        <Image
          src="/logo.png"
          alt="logo"
          height={100}
          width={100}
          className="absolute left-3 bottom-3"
        />
      </main>
    </div>
  );
}

export default page;
