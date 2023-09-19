"use client";
import useCountries from "@/app/hooks/useCountries";
import LoginWrapper from "@/components/wrappers/LoginWrapper";
import { useAuthContext } from "@/contexts/AuthContext";
import { submitKey } from "@/lib/message-keys";
import { User } from "@/types/User";
import { axios } from "@/utils/axios";
import { setToken } from "@/utils/helper";
import { Col, Form, Input, message, Row, Select, UploadProps } from "antd";
import Password from "antd/es/input/Password";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CompanySize } from "@/types/Company";
const MyForm = () => {
  const { setUser, setForceReload } = useAuthContext();
  const router = useRouter();
  const countries = useCountries();

  const handleFormSubmit = async (values: any) => {
    message.open({
      type: "loading",
      content: "Attempting to Register",
      key: submitKey,
    });
    const registerBody = {
      email: values.workEmail,
      username: values.workEmail,
      password: values.password,
    };
    const { data } = await axios.post<{ user: User; jwt: string }>(

      "/auth/local/register",
      registerBody
    );
    const id = data.user.id;
    const CompanyInfoBody = {
      ...values,
      user: id,
    };
    await axios.post("/companies", { data: CompanyInfoBody });
    console.log(CompanyInfoBody)
    setToken(data.jwt);
    setForceReload(true);
    message.open({
      type: "success",
      content: `Welcome  ${values.companyName}!`,
      key: submitKey,
    });

    router.push("/postjob");
  };



  return (
    <LoginWrapper
      title="Register As Company"
      body="Already Have an Account"
      linkText="Login"
      linkHref="/auth/login"
      handleFormSubmit={handleFormSubmit}
      submitText="Create My Account"
    >
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name="companyName"
            label="Company Name"
            className="w-full"
            rules={[
              { required: true, message: "Please input your company Name!" },
            ]}
            tooltip="This is a required field"
          >
            <Input type="text" className="h-10 block rounded-md" placeholder="Enter Company Name" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="workEmail"
            label="Work email"
            className="w-full"
            rules={[
              { required: true, message: "Please input your Email!" },
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
            tooltip="This is a required field"
          >
            <Input type="email" className="h-10 block rounded-md" placeholder="e-g companyname@gmail.com" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="password"
            label="Password"
            className="w-full"
            rules={[{ required: true, message: "Please input your Password!" }]}
            tooltip="This is a required field"
          >
            <Password type="text" className="h-10 rounded-md" placeholder="Enter password for your account" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            tooltip="This is a required field"
            label="Company Location"
            name="country"
            rules={[{ required: true, message: "Company Location is required" }]}
          >
            <Select size="large" options={countries} placeholder="Choose Country" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            tooltip="This is a required field"
            label="Company Size"
            name="companySize"

          >
            <Select
              size="large"
              options={Object.values(CompanySize).map((size) => ({
                label: size,
                value: size,
              }))}
              placeholder="Select Company Size"
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="phoneNumber"
            label="phone Number"
            className="w-full"
            rules={[
              { required: true, message: "Please input your Phone Number" },
              {
                pattern: /^(\+\d{1,3})?\d+$/,
                message: "Invalid Phone Number format",
              },
            ]}
            tooltip="This is a required Field"
          >
            <Input type="text" className="h-10 block rounded-md" placeholder="Enter Phone Number" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <p className="text-xs text-gray-400 text-center">
            By clicking "Create my account," you confirm that you agree to
            Bayt.com's Terms and Conditions and Privacy Policy.
          </p>
        </Col>
      </Row>
    </LoginWrapper>
  );
};

export default MyForm;
