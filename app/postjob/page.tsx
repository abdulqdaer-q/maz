"use client";
import FillInformationWrapper, {
  FillInformationProps
} from "@/components/wrappers/FillInformationWrapper";
import { EmploymentType } from "@/types/Job";
import { Gender } from "@/types/User";
import { axios } from "@/utils/axios";
import {
  Col, Form,
  Input,
  InputNumber, message, Radio,
  Select,
  Switch
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useCountries from "../hooks/useCountries";
import useIndustries from "../hooks/useIndustries";
import { useAuthContext } from "@/contexts/AuthContext";

type Props = Partial<FillInformationProps> & {

  id?: number;
};
const Index = ({ id, ...rest }: Props) => {

  const router = useRouter();
  const { user, isLoading } = useAuthContext();
  const company = user?.company
  const countries = useCountries();
  const industries = useIndustries();
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState<any>();
  const [form] = Form.useForm<any>();

  const validateAges = () => {

    const minimumAge = form.getFieldValue('minimumAge');
    const maximumAge = form.getFieldValue('maximumAge');

    const parsedMinAge = parseInt(minimumAge);
    const parsedMaxAge = parseInt(maximumAge);

    if (parsedMinAge < 18) {
      return Promise.reject(new Error('Minimum age is 18'));
    } else if (parsedMaxAge > 50) {
      return Promise.reject(new Error('Maximum age is 50'));
    } else if (parsedMinAge >= parsedMaxAge) {
      return Promise.reject(new Error('Minimum age should be less than maximum age'));
    }

    return Promise.resolve();
  };

  const validateSalary = () => {

    const minimumSalary = form.getFieldValue('minimumSalary');
    const maximumSalary = form.getFieldValue('maximumSalary');

    const parsedMinSalary = parseInt(minimumSalary);
    const parsedMaxSalary = parseInt(maximumSalary);

    if (parsedMinSalary < 50000) {
      return Promise.reject(new Error('Minimum salary is 50000'));
    } else if (parsedMaxSalary > 10000000) {
      return Promise.reject(new Error('Maximum salary is 10000000'));
    } else if (parsedMinSalary >= parsedMaxSalary) {
      return Promise.reject(new Error('Minimum salary should be less than maximum Salary'));
    }

    return Promise.resolve();
  };
  const handleFormSubmit = async (values: any) => {


    const data = {
      ...values,
      publishedAt: null,
      company: company?.id

    };
    if (id) {
      await axios.put("/jobs/" + id, { data });
    } else {
      await axios.post("/jobs", { data });
    }

    message.open({
      type: "success",
      content: `Great, the job 
      ${values.title} has been posted !`,

    });
    router.push("../company/profile")

  };


  return (
    <FillInformationWrapper
      title={`Post a Job`}
      subTitle="Add details of the job."
      onSubmit={handleFormSubmit}
      initialValues={job}
      submitText="Post a Job"
      hideSkip
      form={form}
      {...rest}
    >
      <Col span={24}>
        <Form.Item
          label="Job Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Pleas Enter Job Title",
            },
          ]}
        >
          <Input size="large" placeholder="Ex. Web Frontend Software Developer" />

        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          tooltip="This is a required field"
          label="Job Location"
          name="country"
          rules={[{ required: true, message: "Job Location is required" }]}
        >
          <Select size="large" showSearch optionFilterProp="label" options={countries} placeholder="Choose Country" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          tooltip="This is a required field"
          label="Job Industry"
          name="industries"
          rules={[{ required: true, message: "Job Industry is required" }]}
        >
          <Select mode='multiple' showSearch optionFilterProp="label"  size="large" options={industries} placeholder="Choose Industry" />
        </Form.Item>
      </Col>
      <Col span={11} className="mr-12">
        <Form.Item
          label="Employment Type"
          name="employmentType"
          rules={[
            {
              required: true,
              message: "Please select your Employment Type",
            },
          ]}
        >
          <Select
            options={Object.values(EmploymentType).map((type) => ({
              label: type,
              value: type,
            }))}
            size="large"
            placeholder="Select Employment Type"
          />
        </Form.Item>
      </Col>
      <Col span={11}  >
        <Form.Item
          tooltip="This is a required field"
          label="Nationality"
          name="nationalities"
          rules={[{ required: true, message: "Nationality is required" }]}

        >
          <Select mode='multiple' size="large"  showSearch optionFilterProp="label" options={countries} placeholder="Choose Country" />
        </Form.Item>
      </Col>

      <Col span={7} className=" mr-4" >
        <Form.Item
          label="Number Of Vacancies"
          name="numberOfVacancies"
          rules={[
            {
              required: true,
              message: "Please enter Number Of Vacancies",
            },
          ]}
        >
          <InputNumber defaultValue={1} size="large" className="!w-full" />
        </Form.Item>
      </Col>
      <Col span={7} className="mr-8">
        <Form.Item
          label="Minimum Salary"
          name="minimumSalary"
          rules={[

            {
              validator: validateSalary,
            },
          ]}
        >
          <InputNumber className="!w-full" size="large" type="number" />
        </Form.Item>
      </Col>
      <Col span={7} className="mr-8">
        <Form.Item
          label="Maximum Salary"
          name="maximumSalary"
          rules={[

            {
              validator: validateSalary,
            },
          ]}
        >
          <InputNumber className="!w-full" size="large" />
        </Form.Item>
      </Col>


      <Col span={7} className="mr-8">
        <Form.Item
          label="Years Of Experience"
          name="minimumYearsOfExperience"

        >
          <InputNumber className="!w-full" size="large" />
        </Form.Item>
      </Col>
      <Col span={7} className="mr-8">
        <Form.Item
          label="Minimum Age"
          name="minimumAge"
          rules={[

            {
              validator: validateAges,
            },
          ]}


        >
          <InputNumber className="!w-full" size="large" />
        </Form.Item>
      </Col>
      <Col span={7}>
        <Form.Item
          label="Maximum Age"
          name="maximumAge"
          rules={[

            {
              validator: validateAges,
            },
          ]}

        >
          <InputNumber className="!w-full" size="large" />
        </Form.Item>
      </Col>

      <Col span={11} className="mr-12">
        <Form.Item
          label="Work From Home"
          name="isWorkFromHome"

        >
          <Switch size="small" defaultChecked className="mx-10" />

        </Form.Item>
      </Col>
      <Col span={11}>
        <Form.Item
          tooltip="This is a required field"
          name="genderPerfrence"
          label="gender Perfrence"

        >
          <Radio.Group size="large">
            <Radio value={Gender.MALE}>Male</Radio>
            <Radio value={Gender.FEMALE}>Female</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>




      <Col span={24}>
        <Form.Item
          label="Job Description"
          name="jobDescription"
          rules={[{ min: 60 }, { max: 1000 }]}

        >
          <TextArea rows={6} className="!w-full" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          label="Desired Skills"
          name="desiredSkills"
          rules={[{ min: 60 }, { max: 100 }]}
        >
          <TextArea rows={6} className="!w-full" />
        </Form.Item>
      </Col>
    </FillInformationWrapper>
  );
};
export default Index
