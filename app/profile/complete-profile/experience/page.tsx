"use client";
import useCountries from "@/app/hooks/useCountries";
import useIndustries from "@/app/hooks/useIndustries";
import FillInformationWrapper from "@/components/wrappers/FillInformationWrapper";
import { useAuthContext } from "@/contexts/AuthContext";
import { customRequest, onChange } from "@/lib/customRequest";
import { axios } from "@/utils/axios";
import { CloudArrowDownIcon, CloudIcon } from "@heroicons/react/24/outline";
import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Select,
  Upload,
} from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const countries = useCountries();
  const industries = useIndustries();
  const [isWorkingHere, setIsWorkingHere] = useState(false);
  const onCheckBoxChange = (e: { target: { checked: boolean } }) => {
    setIsWorkingHere(e.target.checked);
  };
  const handleFormSubmit = async (values: any) => {
    const cvId = values.cv?.fileList.map((e: any) => {
      return e.response[0].id;
    });
    const data = {
      ...values,
      cv: cvId,
      startDate: values.startDate.format("YYYY-MM-01"),
      endDate: values?.endDate?.format("YYYY-MM-01"),
      userInfo: user?.userInfo?.id,
    };
    await axios.post("/experiences", { data });
    router.replace("/profile/complete-profile/education");
  };
  return (
    <FillInformationWrapper
      title={`Professional details`}
      subTitle="Show employers that you are experienced in your field."
      onSubmit={handleFormSubmit}
      initialValues={{
        haveExpereience: true,
      }}
      startOver
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
      <Col span={24}>
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
      <Col span={24} className="!mb-20">
        <Form.Item label="Upload CV" name="cv">
          <Upload.Dragger
            multiple={false}
            maxCount={1}
            customRequest={customRequest}
            onChange={onChange}
          >
            <p className="ant-upload-drag-icon flex justify-center text-primary">
              <CloudArrowDownIcon height={32} />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Upload.Dragger>
        </Form.Item>

        <p className="text-sm text-gray-400 text-center ">
          Maximum file size: 5 MB. File formats allowed: pdf, doc, docx, and txt
          only
        </p>
      </Col>
    </FillInformationWrapper>
  );
};
