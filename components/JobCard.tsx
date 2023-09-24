import { BASE_SERVEFR_URL } from "@/utils/constant";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

type props = {
  id: number;
  title: string;
  image: string;
  name: string;
  isCompany: boolean;
  salary: string;
  time: string;
  description: string;
  style?: string
};

function JobCard({
  id,
  title,
  image,
  name,
  isCompany,
  salary,
  time,
  description,
  style
}: props) {
  return (
    <Link href={`offer-job/${id}`}>
      <div className={`bg-white shadow-lg p-4 ${style}`}>
        <h1 className="font-semibold text-xl">{title}</h1>

        <div className="flex items-center mb-4">
          <Image style={{
            borderRadius: '50%'
          }} src={image} alt="company logo" width={70} height={70} />
          <p className="text-lg">{name}</p>

          <CheckCircleIcon className="w-6 h-6 ml-3 text-blue-400" />

        </div>

        <p className="mb-2">{salary}</p>
        <p className="mb-4">{time}</p>
        <p className="text-xs">{description}</p>
      </div>
    </Link>
  );
}

export default JobCard;
