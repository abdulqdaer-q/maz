"use client";
import LoginWrapper from "@/components/wrappers/LoginWrapper";
import { useAuthContext } from "@/contexts/AuthContext";
import { useSocketContext } from "@/contexts/SocketContext";
import { submitKey } from "@/lib/message-keys";
import { User } from "@/types/User";
import { axios } from "@/utils/axios";
import { setToken } from "@/utils/helper";
import { Col, Form, Input, message, Row, UploadProps } from "antd";
import Password from "antd/es/input/Password";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyForm = () => {
  const {setUser, setForceReload} = useAuthContext();
  const {setForceReload:setFreload} = useSocketContext();
  const router = useRouter();
  const handleFormSubmit = async (values: any) => {
    message.open({
      type: "loading",
      content: "Attempting to Register",
      key: submitKey,
    });
    const registerBody = {
      email: values.email,
      username: values.email,
      password: values.password,
    };
    const { data } = await axios.post<{ user: User; jwt: string }>(
      
      "/auth/local/register",
      registerBody
    );
    const id = data.user.id;
    const userInfoBody = {
      firstName: values.firstName,
      lastName: values.lastName,
      mobilePhone: values.mobilePhone,
      user: id,
    };
    await axios.post("/user-infos", { data: userInfoBody });
    setToken(data.jwt);
    setFreload(e => !e)
    setForceReload(e => !e);
    message.open({
      type: "success",
      content: `Welcome  ${values.firstName}!`,
      key: submitKey,
    });

    router.replace("/profile/complete-profile/personal-information");
  };

  const uploadProps: UploadProps = {
    customRequest: (options) => {
      const fd = new FormData();
      fd.append("files", options.file);
      axios
        .post("/upload", fd)
        .then((e) => {
          options!.onSuccess!(e.data);
        })
        .catch((err) => {
          options.onError!({
            status: 400,
            name: "error",
            method: "POST",
            url: "/upload",
            message: "upload failed",
          });
        });
    },
    onChange(info) {
      console.log(info);

      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        console.log({ info });

        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <LoginWrapper
      title="Register"
      body="Already Have an Account"
      linkText="Login"
      linkHref="/auth/login"
      handleFormSubmit={handleFormSubmit}
      submitText="Create My Account"
    >
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            name="firstName"
            label="First Name"
            className="w-full"
            rules={[
              { required: true, message: "Please input your First Name!", },
              { pattern:/[a-zA-Z]+/ig, message: 'First Name should be with English charecters '}
            ]}
            tooltip="This is a required field"
          >
            <Input type="text" className="h-10 block rounded-md" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="lastName"
            label="Last Name"
            className="w-full"
            rules={[
              { required: true, message: "Please input your Last Name!" },
              { pattern:/[a-zA-Z]+/ig, message: 'Last Name should be with English charecters '}
            ]}
            tooltip="This is a required field"
          >
            <Input type="text" className="h-10 block rounded-md" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="email"
            label="Email"
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
            <Input type="email" className="h-10 block rounded-md" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="password"
            label="Password"
            className="w-full"
            rules={[
              { required: true, message: "Please input your Password!" },
              { min:8, message: "Min Password length is 8!" }
          
          ]}
            tooltip="This is a required field"
          >
            <Password type="text" className="h-10 rounded-md" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="mobilePhone"
            label="Mobile"
            className="w-full"
            rules={[
              { required: true, message: "Please input your mobile number" },
              {
                pattern: /[0-9]{8,11}/,
                message: "Invalid mobile number format",
              },
            ]}
            tooltip="This is a required Field"
          >
            <Input type="text" className="h-10 block rounded-md" />
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
