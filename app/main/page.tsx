import JobCard from "@/components/JobCard";
import Navbar from "@/components/Navbar";
import OfferCard from "@/components/OfferCard";
import {
  WrenchIcon,
  BuildingOfficeIcon,
  MagnifyingGlassIcon,
  BriefcaseIcon,
  MagnifyingGlassCircleIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";

function page() {
  const jobs = [
    {
      id: 1,
      title: "SEO Analyst",
      image: "/logo.png",
      name: "collection tech",
      isCompany: true,
      salary: "Remote: Anywhere",
      time: "Full Time",
      description: "lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum",
    },
    {
      id: 2,
      title: "SEO Analyst",
      image: "/logo.png",
      name: "collection tech",
      isCompany: true,
      salary: "Remote: Anywhere",
      time: "Full Time",
      description: "lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum",
    },
    {
      id: 3,
      title: "SEO Analyst",
      image: "/logo.png",
      name: "collection tech",
      isCompany: true,
      salary: "Remote: Anywhere",
      time: "Full Time",
      description: "lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum",
    },
    {
      id: 4,
      title: "SEO Analyst",
      image: "/logo.png",
      name: "collection tech",
      isCompany: true,
      salary: "Remote: Anywhere",
      time: "Full Time",
      description: "lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum",
    },
    {
      id: 5,
      title: "SEO Analyst",
      image: "/logo.png",
      name: "collection tech",
      isCompany: true,
      salary: "Remote: Anywhere",
      time: "Full Time",
      description: "lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum",
    },
    {
      id: 6,
      title: "SEO Analyst",
      image: "/logo.png",
      name: "collection tech",
      isCompany: true,
      salary: "Remote: Anywhere",
      time: "Full Time",
      description: "lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum",
    },
  ];

  const services = [
    {
      id: 1,
      publisherImg: "/logo.png",
      companyImg: "/logo.png",
      publisherName: "Marvin",
      jobTitle: "Costumer Support",
      salary: 20,
    },
    {
      id: 2,
      publisherImg: "/logo.png",
      companyImg: "/logo.png",
      publisherName: "Marvin",
      jobTitle: "Costumer Support",
      salary: 20,
    },
    {
      id: 3,
      publisherImg: "/logo.png",
      companyImg: "/logo.png",
      publisherName: "Marvin",
      jobTitle: "Costumer Support",
      salary: 20,
    },
    {
      id: 4,
      publisherImg: "/logo.png",
      companyImg: "/logo.png",
      publisherName: "Marvin",
      jobTitle: "Costumer Support",
      salary: 20,
    },
    {
      id: 5,
      publisherImg: "/logo.png",
      companyImg: "/logo.png",
      publisherName: "Marvin",
      jobTitle: "Costumer Support",
      salary: 20,
    },
    {
      id: 6,
      publisherImg: "/logo.png",
      companyImg: "/logo.png",
      publisherName: "Marvin",
      jobTitle: "Costumer Support",
      salary: 20,
    },
  ];
  return (
    <div>
      <Navbar />
      <main className="bg-gray-200">
        {/* initial hero */}
        <div className="flex justify-between pb-4 pt-12 px-4">
          <div className="flex items-center space-x-2 ">
            <MagnifyingGlassIcon className="h-6 w-6 text-blue-500" />
            <p>Jobs For You</p>
          </div>
          <button className=" bg-blue-500 rounded-3xl px-8 py-1 text-white ">
            Post Job For Free
          </button>
        </div>

        {/* First Grid */}
        <div className="grid grid-cols-3 gap-x-4 gap-y-6">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              image={job.image}
              name={job.name}
              isCompany={job.isCompany}
              salary={job.salary}
              time={job.time}
              description={job.description}
            />
          ))}
        </div>
        <p className="text-blue-500 text-2xl text-center  mt-4">All Jobs</p>
        {/* Second Hero */}
        <div className="flex justify-between pb-4 pt-12 px-4">
          <div className="flex items-center space-x-2 ">
            <WrenchScrewdriverIcon className="h-6 w-6 text-blue-500" />
            <p>Featured Services</p>
          </div>
          <button className=" bg-blue-500 rounded-3xl px-8 py-1 text-white ">
            Offer Services
          </button>
        </div>
        {/* Second Grid */}
        <div className="grid grid-cols-3 gap-x-4 gap-y-6 p-4">
          {services.map((service) => (
            <OfferCard
              key={service.id}
              id={service.id}
              publisherImg={service.publisherImg}
              companyImg={service.companyImg}
              publisherName={service.publisherName}
              jobTitle={service.jobTitle}
              salary={service.salary}
            />
          ))}
        </div>
        <p className="text-blue-500 text-2xl text-center  mt-4">All Services</p>

        <div className="mt-28 pb-16">
          <h1 className="text-xl text-gray-600 mb-10 text-start font-semibold ml-12">
            Opportunities on COWORK
          </h1>
          <div className="grid grid-cols-2 grid-rows-3 p-14 ">
            <div className="flex bg-blue-100 space-x-4 p-2    mx-2 my-3">
              <BuildingOfficeIcon className="bg-white rounded-full h-20 w-20 p-4 text-blue-100" />
              <div className="flex flex-col space-y-2 justify-center items-start">
                <h1 className="text-xl font-semibold">Create Company Page</h1>
                <p className="text-xs">
                  Connect with your clients and job seekers
                </p>
              </div>
            </div>

            <div className="flex bg-purple-300 space-x-4 p-2    mx-2 my-3">
              <WrenchIcon className="bg-white rounded-full h-20 w-20 p-4 text-purple-300" />
              <div className="flex flex-col space-y-2 justify-center items-start">
                <h1 className="text-xl font-semibold">Buy Services</h1>
                <p className="text-xs">Find professional service</p>
              </div>
            </div>
            <div className="flex bg-gray-300 space-x-4 p-2    mx-2 my-3">
              <BriefcaseIcon className="bg-white rounded-full h-20 w-20 p-4 text-gray-300" />
              <div className="flex flex-col space-y-2 justify-center items-start">
                <h1 className="text-xl font-semibold">Post Jobs For Free</h1>
                <p className="text-xs">Find talent for you from any location</p>
              </div>
            </div>
            <div className="flex bg-gray-300 space-x-4 p-2    mx-2 my-3">
              <WrenchIcon className="bg-white rounded-full h-20 w-20 p-4 text-purple-300" />
              <div className="flex flex-col space-y-2 justify-center items-start">
                <h1 className="text-xl font-semibold">Offer Services</h1>
                <p className="text-xs">Offer professional service</p>
              </div>
            </div>
            <div className="flex bg-green-200 space-x-4 p-2    mx-2 my-3 col-span-2">
              <MagnifyingGlassCircleIcon className="bg-white rounded-full h-20 w-20 p-4 text-green-200" />
              <div className="flex flex-col space-y-2 justify-center items-center w-4/5">
                <h1 className="text-2xl font-semibold">Find Jobs</h1>
                <p className="text-xl">Find and apply to your dream job</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default page;
