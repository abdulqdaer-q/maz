import { axios } from "@/utils/axios";
import {
  BriefcaseIcon,
  ChatBubbleBottomCenterTextIcon, MapPinIcon
} from "@heroicons/react/24/outline";
import { Card, Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function PromotionFeed() {
  const [stats, setStats] = useState<any>({});
  useEffect(() => {
    const fn = async () => {
      const _stats: any = {};
      const { total } = await axios.get('/user-infos?pagination[limit]=1');
      _stats['users'] = total;
      const { total: totalCompanies } = await axios.get('/companies?pagination[limit]=1');
      _stats['companies'] = totalCompanies;
      const { total: totalJobs } = await axios.get('/jobs?pagination[limit]=1');
      _stats['jobs'] = totalJobs;

      setStats(_stats);
    };
    fn();
  }, []);
  return (
    <div>

      <section className="flex border border-b-gray-300 pb-10">
        <div className="flex flex-col justify-center ml-16 mt-20">
          <h2 className="text-blue-500 text-4xl">COWORK</h2>
          <h1 className="text-3xl text-gray-700">jobs & services</h1>
          <p className="my-6 w-2/3">
            The job marketplace and community that connects and matches
            companies with remote professionals
          </p>

        </div>
        <Image src="/logo.png" alt="logo" height={400} width={400} />
      </section>
      <section className="bg-blue-200 pt-12">
        <h1 className="text-4xl   text-gray-700 text-center">Cowork in Numbers</h1>
        <h1 className="text-lg mt-6 text-gray-700 text-center px-80">
          Find The Best Talent For Your Full-Time, Part-Time, Contract,
          Internship Or Freelance Jobs In Any Location
        </h1>

        <div className="mx-auto mt-5 container py-5">

          <Row gutter={16} className='my-5'>
            <Col span={8}>
              <Card>
                <h2>Total Users</h2>
                <p>Over {stats?.['users']} registered users</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <h2>Total Companies</h2>
                <p>We have {stats?.['companies']} Compnies Registered With us </p>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <h2>Job Listings</h2>
                <p>More than {stats?.['jobs']}  job listings</p>
              </Card>
            </Col>
          </Row>
          {/* Add more statistics here using Row, Col, and Card components */}
        </div>
      </section>
      <section>
        <h1 className="text-4xl  mt-12 text-gray-700 text-center">
          Why COWORK?
        </h1>

        <div className="grid grid-cols-3 mt-12  mb-28">
          <div className="flex flex-col items-center space-y-3  p-1">
            <ChatBubbleBottomCenterTextIcon className="h-20 w-20 bg-purple-400 rounded-full p-4" />
            <h1 className="text-xl text-gray-700">Free Job Posting</h1>
            <p className="text-xs text-center text-gray-700 px-10 py-2">
              Post an unlimited number of your open vacancies absolutely for
              free.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-3  p-1">
            <BriefcaseIcon className="h-20 w-20 bg-purple-700 rounded-full p-4" />
            <h1 className="text-xl text-gray-700">All Types of Jobs</h1>
            <p className="text-xs text-center text-gray-700 px-10 py-2">
              From full-time and part-time jobs, to contract, internship and
              freelance.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-3  p-1">
            <MapPinIcon className="h-20 w-20 bg-blue-400 rounded-full p-4" />
            <h1 className="text-xl text-gray-700">All Locations</h1>
            <p className="text-xs text-center text-gray-700 px-10 py-2">
              From remote in any location to specific regions, countries and
              non-remote jobs.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-blue-200 pt-12">
        <h1 className="text-4xl   text-gray-700 text-center">For Employers</h1>
        <h1 className="text-lg mt-6 text-gray-700 text-center px-80">
          Find The Best Talent For Your Full-Time, Part-Time, Contract,
          Internship Or Freelance Jobs In Any Location
        </h1>

        <div className="grid grid-cols-3 mt-20  mb-20 ">
          <div className="flex flex-col items-center space-y-3  p-1 bg-white rounded-xl mb-12 mx-20 border-2 border-blue-400 relative pt-10">
            <ChatBubbleBottomCenterTextIcon className="h-24 w-24 bg-purple-400 rounded-full p-4 border-2 border-blue-400 absolute -top-14" />
            <h1 className="text-xl text-gray-700 text-center">
              Post Jobs For Free
            </h1>
            <p className="text-xs text-center text-gray-700 px-10">
              Find Professionals from around the world and across all skills
            </p>
          </div>

          <div className="flex flex-col items-center space-y-3  p-1 bg-white rounded-xl mb-12 mx-20 border-2 border-blue-400 relative pt-10">
            <BriefcaseIcon className="h-24 w-24 bg-purple-700 rounded-full p-4 border-2 border-blue-400 absolute -top-14" />
            <h1 className="text-xl text-gray-700 text-center">
              Get Best Matches For Your Jobs
            </h1>
            <p className="text-xs text-center text-gray-700 px-10">
              Get the best candidates on top of your list of job applications
            </p>
          </div>

          <div className="flex flex-col items-center space-y-3  p-1 bg-white rounded-xl mb-12 mx-20 border-2 border-blue-400 relative pt-10">
            <MapPinIcon className="h-24 w-24 bg-blue-200 rounded-full p-4 border-2 border-blue-400 absolute -top-14" />
            <h1 className="text-xl text-gray-700 text-center">
              Browse Services And Portfolios
            </h1>
            <p className="text-xs text-center text-gray-700 px-10 ">
              Choose people by their creativity and previous projects, not just
              resumes.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <h1 className="text-4xl text-gray-700 text-center">For Job Seekers</h1>
        <h1 className="text-lg mt-6 text-gray-700 text-center  px-80 ">
          Expand Your Network And Portfolio, Recieve Work Recommendations And
          Get Hired For Your Dream Job
        </h1>

        <div className="grid grid-cols-3 mt-20   ">
          <div className="flex flex-col items-center space-y-3  p-1 bg-blue-200 rounded-xl mb-12 mx-20 border-2 border-blue-400 relative pt-10">
            <ChatBubbleBottomCenterTextIcon className="h-24 w-24 bg-purple-400 rounded-full p-4 border-2 border-blue-400 absolute -top-14" />
            <h1 className="text-xl text-gray-700 text-center">
              Chat With Employers And Get Hired
            </h1>
            <p className="text-xs text-center text-gray-700 px-10">
              Chat to discuss details, and start employment, contract or a
              freelance project.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-3  p-1 bg-blue-200 rounded-xl mb-12 mx-20 border-2 border-blue-400 relative pt-10">
            <BriefcaseIcon className="h-24 w-24 bg-purple-700 rounded-full p-4 border-2 border-blue-400 absolute -top-14" />
            <h1 className="text-xl text-gray-700 text-center">
              Post Service And Portfolios
            </h1>
            <p className="text-xs text-center text-gray-700 px-10">
              Showcase your creativity, experince, skills and past projects.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-3  p-1 bg-blue-200 rounded-xl mb-12 mx-20 border-2 border-blue-400 relative pt-10">
            <MapPinIcon className="h-24 w-24 bg-blue-200 rounded-full p-4 border-2 border-blue-400 absolute -top-14" />
            <h1 className="text-xl text-gray-700 text-center">
              Expand Your Professional Network
            </h1>
            <p className="text-xs text-center text-gray-700 px-10 ">
              Choose people by their creativity and previous projects, not just
              resumes.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default PromotionFeed;
