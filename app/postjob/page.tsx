'use client'
import Navbar from "@/components/Navbar";
import CostumFileInput from "@/components/CostumFileInput";
import Input from "@/components/Input";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from "@/components/Select";
import { useEffect, useState } from "react";
import RadioGroup from "@/components/RadioGroup";
import TextArea from "@/components/TextArea";
import ImageUploader from "@/components/ImageUploader";
import { axios } from "@/utils/axios";
import { message } from "antd";
function Index() {
	const [kind, setKind] = useState<string>('job');
  const [Categoryoptions, setCategories] = useState([]);
  useEffect(() => {
    const fetchall =async() => {
      const {data:{data}} = await axios.get('/categories');
      setCategories(data.map((e:any) =>({
        value: e.id,
        label: e.attributes.category
      })))
    }
    fetchall();
  },[]);
  const Locationsoptions = [
    { value: 'remote', label: 'Remote' },
    { value: 'nonremote', label: 'Non Remote' },
   
  ];
  const Typesoptions = [
    { value: 'contract', label: 'Full time' },
    { value: 'Freelance', label: 'Part time' },
   
  ];
 
  const kindoptions = [
    { value: 'service', label: 'Service' },
    { value: 'job', label: 'Job' },
   
  ];
  console.log(kind)

  const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
	} = useForm<any>();
	
	const onSubmit: SubmitHandler<any> = async (x) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear(); // Get the current year (e.g., 2023)
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get the current month (0-indexed)
    const day = String(currentDate.getDate()).padStart(2, '0'); // Get the current day
    
    const formattedDate = `${year}-${month}-${day}`;		const data = {
      salary: x.Salary,
      job: x.jobTitle,
      category: x.Category,
      type: x.JobType,
      description: x.jobDescription ,
      publishDate: formattedDate
    };
    await axios.post('/jobs', {data})
    message.success('posted job successfully');
	};
  return (
	<div className="bg-gray-200 pb-6">
		
  <main className="bg-white h-full m-6 md:m-20 rounded-3xl pt-4 shadow-md pb-24 px-6 md:px-12">
    <h2 className="text-blue-500 text-2xl md:text-4xl text-center mt-6">
      Hire the talent you need
    </h2>
    <h1 className="text-1xl md:text-2xl text-gray-700 text-center mt-2 mb-12">
      Post your job requirements to reach the right candidates
    </h1>
    <form  onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mx-3">
        <Controller
          name="kind"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <RadioGroup
              options={kindoptions}
              onChange={(value: string) => {
                field.onChange(value);
                setKind(value);
				
              }}
              label={"Kind"}
              lableStyle="pt-5 pl-1 w-full md:w-[8.375rem] text-black font-dosis text-xs  text-xs lg:text-lg xl:text-xl  font-medium leading-normal lg:mr-[8.8rem] mr-[0rem] mb-[3.06rem] items-center"
              optionStyle="text-gray-700 font-dosis  text-xs lg:text-lg xl:text-xl  font-normal"
            />
          )}
        />
        {errors.kind && (
          <p className="text-sm text-red-700">
            {"kind is required"}
          </p>
        )}

        <Controller
          name="JobTitle"
          control={control}
          rules={{ required: kind==="job" ? true:false }}
          render={({ field }) => (
            <Input
              inputProps={{
                ...field,
                id: "JobTitle",
                name: "JobTitle",
                type: "text",
                placeholder: "Job Title",
              }}
              inputStyle="flex pl-1 w-full md:w-[70rem] h-[3.8125rem] lg:text-lg xl:text-xl   rounded-[10px] border border-stone-500 mb-[3.06rem] text-xs text-gray-400"
              lableStyle="pt-5 w-full md:w-[8.375rem]  font-dosis  text-xs lg:text-lg xl:text-xl   font-medium leading-normal lg:mr-[8.8rem] mr-[0rem]"
              disable={kind === "job" ? false : true}
			  label={"Job Title"}
            />
          )}
        />
        {errors.JobTitle && (
          <p className="text-xs mb-3 text-red-700">
            {"Job Title is required"}
          </p>
        )}
        <Controller
          name="Category"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              selectStyle="flex pl-1 w-full md:w-[70rem] h-[3.8125rem] rounded-[10px]  text-xs lg:text-lg xl:text-xl  border border-stone-500 mb-[3.06rem] text-lg text-gray-400"
              selectProps={{ placeholder: "Category" }}
              {...field}
              onChange={(value: string) => field.onChange(value)}
              label={"Category"}
              lableStyle="pt-5 pl-1 w-full md:w-[8.375rem] text-black font-dosis text-xs  text-xs lg:text-lg xl:text-xl  font-medium leading-normal lg:mr-[8.8rem] mr-[0rem] mb-[3.06rem] items-center  "
            >
              <option
                className="h-[3.8125rem] rounded-[10px] border border-stone-500 text-lg"
                value={undefined}
              >
                {"Category"}
              </option>
              {Categoryoptions.map((i) => (
                <option
                  key={i.value}
                  className="h-[3.8125rem] rounded-[10px] border border-stone-500 text-lg"
                  value={i.value}
                >
                  {i.label}
                </option>
              ))}
            </Select>
          )}
        />
        {errors.Category && (
          <p className="text-xs mb-3 text-red-700">
            {"Category is required"}
          </p>
        )}
        <Controller
          name="JobType"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <RadioGroup
              options={Typesoptions}
              onChange={(value: string) => field.onChange(value)}
              label={"Job Type"}
			  lableStyle="pt-5 pl-1 w-full md:w-[8.375rem] text-black font-dosis text-xs  text-xs lg:text-lg xl:text-xl  font-medium leading-normal lg:mr-[8.8rem] mr-[0rem] mb-[3.06rem] items-center"
              optionStyle="text-gray-700 font-dosis  text-xs lg:text-lg xl:text-xl  font-normal"
            />
          )}
        />
        {errors.JobType && (
          <p className="text-xs mb-3 text-red-700">
            {"Job Type is required"}
          </p>
        )}
          <Controller
						name="Location"
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
              <RadioGroup options={Locationsoptions}
			  onChange={(value: string) =>
                field.onChange(value)} 
              label={"Location"}
			  lableStyle="pt-5 pl-1 w-full md:w-[8.375rem] text-black font-dosis text-xs  text-xs lg:text-lg xl:text-xl  font-medium leading-normal lg:mr-[8.8rem] mr-[0rem] mb-[3.06rem] items-center"
              optionStyle="text-gray-700 font-dosis  text-xs lg:text-lg xl:text-xl  font-normal" />
         
						)}
					/>
					{errors.Location && (
						<p className="text-xs mb-3 text-red-700">
							{'Location is required'}
						</p>
					)}

          <Controller
						name="Salary"
						control={control}
						rules={{ required: true ,
							pattern: {
								value: /^[0-9]+$/,
								message: 'Salary must be a numeric value',
							  },}}
						render={({ field }) => (
							<Input

								inputProps={{
									...field,
									id: 'Salary',
									name: 'Salary',
									type: 'text',
									placeholder: 'Salary',
								}}
								inputStyle="flex pl-1 w-full  md:w-[70rem] h-[3.8125rem] lg:text-lg xl:text-xl   rounded-[10px] border border-stone-500 mb-[3.06rem] text-xs text-gray-400"
								lableStyle="pt-5 w-full md:w-[8.375rem]  font-dosis  text-xs lg:text-lg xl:text-xl   font-medium leading-normal lg:mr-[8.8rem] mr-[0rem]"
								label={"Salary"}
               			/>
						)}
					/>
					{errors.Salary && (
						<p className="text-xs mb-3 text-red-700  ">
							{`${errors.Salary.message}`}
						</p>
					)}

<Controller
						name="jobDescription"
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<Controller
						name="jobDescription"
						control={control}
						render={({ field }) => (
							<TextArea
              textareaProps={{
                ...field,
                id: 'jobDescription',
                name: 'jobDescription',
                placeholder: 'job Description',
              }}
              textareaStyle="flex pl-1 w-full md:w-[70rem] h-[15.875rem] rounded-[10px] border border-stone-500 mb-[3.06rem] text-xs lg:text-lg xl:text-xl  text-gray-400"
              label={"Job Description"}
              lableStyle="pt-5 w-full md:w-[8.375rem]  font-dosis  text-xs lg:text-lg xl:text-xl   font-medium leading-normal lg:mr-[8.8rem] mr-[0rem]"
												/>
						)}
					/>
						)}
					/>
					{errors.jobDescription && (
						<p className="text-xs mb-3 text-red-700 ">
							{'Job Description is required'}
						</p>
					)}

<Controller
						control={control}
						rules={{ required: false }}
						name="photo"
						render={({ field: { onChange } }) => (
							<ImageUploader   label={"Cover Image( Optional )"}
							labelStyle="pt-5 w-full md:w-[8.375rem]  font-dosis  text-xs lg:text-lg xl:text-xl   font-medium leading-normal lg:mr-[8.8rem] mr-[0rem]"
								uploaderStyle="w-full md:w-[70rem] h-[12.4375rem] rounded-md border-dashed border-2 border-gray-700 bg-gray-100 flex justify-center items-center"
						   onChange={onChange} />
						)}
					/>
					{errors.photo && (
						<span className="text-xs mb-3 text-red-700">
							{'imageIsRequired'}
						</span>
					)}
             </div>
          
            
          <button className="xl:ml-[80rem] lg:ml-[50.8rem] md:ml-[30rem] ml-[20rem] my-12 w-[10.375rem] h-[2.375rem]  bg-blue-500 rounded-lg text-white" type="submit">
			Post
		  </button>
        </form>
      </main>
    </div>
  );
}

export default Index;
