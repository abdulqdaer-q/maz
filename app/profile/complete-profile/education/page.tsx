"use client";
import FillInformationWrapper from "@/components/wrappers/FillInformationWrapper";
import { useAuthContext } from "@/contexts/AuthContext";
import { Degree } from "@/types/Education";
import { axios } from "@/utils/axios";
import { Col, DatePicker, Form, Input, Select } from "antd";
import { useRouter } from "next/navigation";

export default () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const handleFormSubmit = async (values: any) => {
    const data = {
      ...values,
      graduationDate: values.graduationDate.format("YYYY-MM-DD"),
      userInfo: user?.userInfo?.id,
    };
    await axios.post("/educations", { data });
    router.replace("/profile");
  };
  return (
    <FillInformationWrapper
      title={`Education details`}
      subTitle="Adding these details will show employers that you're qualified for the job."
      onSubmit={handleFormSubmit}
      initialValues={{
        haveExpereience: true,
      }}
      startOver
    >
      <Col span={24}>
        <Form.Item
          label="Education Level"
          name="degree"
          rules={[
            {
              required: true,
              message: "Please select your education level",
            },
          ]}
        >
          <Select
            options={Object.values(Degree).map((degree) => ({
              label: degree,
              value: degree,
            }))}
            placeholder="Select Education level"
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          label="University"
          name="university"
          rules={[
            {
              required: true,
              message: "Please enter the university you attended",
            },
          ]}
        >
          <Input placeholder="E.g University Of Aleppo" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          label="Field Of Study (Major)"
          name="feildOfStudy"
          rules={[
            {
              required: true,
              message: "Please enter your field of study (major)",
            },
          ]}
        >
          <Input placeholder="E.g. Information Technology" />
        </Form.Item>
      </Col>
      <Col span={24} className="mb-5">
        <Form.Item
          label="Graduation Date"
          name="graduationDate"
          rules={[
            {
              required: true,
              message: "Please enter your graduation date",
            },
          ]}
        >
          <DatePicker className="w-full" />
        </Form.Item>
      </Col>
    </FillInformationWrapper>
  );
};
