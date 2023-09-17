"use client";
import useCountries from "@/app/hooks/useCountries";
import useIndustries from "@/app/hooks/useIndustries";
import FillInformationWrapper, {
  FillInformationProps,
} from "@/components/wrappers/FillInformationWrapper";
import { useAuthContext } from "@/contexts/AuthContext";
import { Experience } from "@/types/Experience";
import { User } from "@/types/User";
import { axios } from "@/utils/axios";
import { Checkbox, Col, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = Partial<FillInformationProps> & {
  onAfterSubmit: () => void;
  id?: number;
  user: User;
};

export default ({ id, onAfterSubmit, user, ...rest }: Props) => {
  const countries = useCountries();
  const industries = useIndustries();
  const [isWorkingHere, setIsWorkingHere] = useState(false);
  const [experience, setExperience] = useState<any>();
  const [loading, setLoading] = useState(true);
  const onCheckBoxChange = (e: { target: { checked: boolean } }) => {
    setIsWorkingHere(e.target.checked);
  };
  useEffect(() => {
    const fetchExperience = async (id: number) => {
      const { data } = await axios.get<Experience>(
        `/experiences/${id}?populate[jobLocation][fields][0]=id&populate[companyIndustry][fields][0]=id`
      );
      setExperience({
        ...data,
        startDate: dayjs(data.startDate),
        endDate: data.endDate ? dayjs(data.endDate) : undefined,
        jobLocation: data.jobLocation.id,
        companyIndustry: data.companyIndustry.id,
      });
      setLoading(false);
    };
    if (id) fetchExperience(id);
    else setLoading(false);
  }, [user]);
  const handleFormSubmit = async (values: any) => {
    const data = {
      ...values,
      startDate: values.startDate.format("YYYY-MM-01"),
      endDate: values?.endDate?.format("YYYY-MM-01"),
      userInfo: user?.userInfo?.id,
    };
    if (id) {
      await axios.put("/experiences/" + id, { data });
    } else {
      await axios.post("/experiences", { data });
    }
    onAfterSubmit();
  };
  if (loading) {
    return <></>;
  }

  return (
    <FillInformationWrapper
      title={`Professional details`}
      subTitle="Show employers that you are experienced in your field."
      onSubmit={handleFormSubmit}
      initialValues={experience}
      startOver
      {...rest}
    >
      <Col span={24}>
        <Form.Item
          tooltip="This is a required field"
          label="Job Title"
          name="jobTitle"
          rules={[{ required: true, message: "Job Title is required" }]}
        >
          <Input placeholder="Select Job Title" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          tooltip="This is a required field"
          label="Company Name"
          name="companyName"
          rules={[{ required: true, message: "Company Name is required" }]}
        >
          <Input placeholder="E.g. Amazon" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          tooltip="This is a required field"
          label="Company Industry"
          name="companyIndustry"
          rules={[{ required: true, message: "Company Industry is required" }]}
        >
          <Select options={industries} placeholder="Choose Industry" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          tooltip="This is a required field"
          label="Job Location"
          name="jobLocation"
          rules={[{ required: true, message: "Job Location is required" }]}
        >
          <Select options={countries} placeholder="Choose Country" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          tooltip="This is a required field"
          label="Start Date"
          name="startDate"
          rules={[{ required: true, message: "Start Date is required" }]}
        >
          <DatePicker picker="month" className="w-full" />
        </Form.Item>
      </Col>
      <Form.Item
        tooltip="This is a required field"
        name="isCurrentRole"
        valuePropName="checked"
      >
        <Checkbox onChange={onCheckBoxChange}>Still work here</Checkbox>
      </Form.Item>
      <Col span={24} className="mb-20">
        <Form.Item
          label="End Date"
          name="endDate"
          dependencies={["isCurrentRole"]}
          rules={[
            {
              required: !isWorkingHere,
            },
          ]}
        >
          <DatePicker
            disabled={isWorkingHere}
            picker="month"
            className="w-full"
          />
        </Form.Item>
      </Col>
    </FillInformationWrapper>
  );
};
