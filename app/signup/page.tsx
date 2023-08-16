"use client";
import React from "react";
import { Form, Input, DatePicker, Upload, Button, Row, Col, Card, UploadProps, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Navbar from "@/components/Navbar";
import { API } from "@/utils/constant";
import { axios } from "@/utils/axios";
import { User } from "@/types/User";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const MyForm = () => {
  const onFinish =async (values: any) => {
    const registerBody = {
      email: values.email,
      username: values.username,
      password: values.password,
    };
    const {data} = await axios.post<{user:User}>('/auth/local/register', registerBody);
    console.log({data});
    
    const {id} = data.user;
    
  };

  const uploadProps: UploadProps = {
    customRequest: (options) => {
      const fd = new FormData();
      fd.append('files', options.file)
      axios.post('/upload', fd).then(e => {
        options!.onSuccess!(e.data)
      }).catch(err=>{
        options.onError!({
          status: 400,
          name: 'error',
          method:'POST',
          url: '/upload',
          message: 'upload failed'
        })
      })
    },
    onChange(info) {
      console.log(info);
      
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        console.log({info});
        
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  }

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "#EFF3F5", minHeight: "75vh", padding: '4rem' }}>
        <Card  title="Sign Up"  bordered={false}>
          <Form {...layout} onFinish={onFinish}>
            <Row gutter={120}>
              <Col span={11}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    { required: true, message: "Please input your first name" },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    { required: true, message: "Please input your last name" },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={120}>
              <Col span={11}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password" },
                    {  min: 8, message: "Password must be at least 8 characters!" }
                  ]}
                >
                  <Input.Password size="large" />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label="Password Confirm"
                  name="passwordConfirm"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Please confirm your password" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The two passwords do not match")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password size="large" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={120}>
              <Col span={11}>
                <Form.Item
                  label="Birthday"
                  name="birthday"
                  rules={[
                    { required: true, message: "Please select your birthday" },
                  ]}
                >
                  <DatePicker size="large" />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item label="Birth Location" name="birthLocation">
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={120}>
              <Col span={11}>
                <Form.Item
                  label="Mobile Number"
                  name="mobileNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input your mobile number",
                    },
                    {
                      validator: (_, value) => {
                        if (value && !/^[0-9]{9,11}$/.test(value)) {
                          return Promise.reject("Invalid phone number!");
                        }
                        return Promise.resolve();
                      },
                    }
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label="Job Title"
                  name="jobTitle"
                  rules={[
                    { required: true, message: "Please input your job title" },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={120}>
              <Col span={11}>
                <Form.Item label="CV" name="cv">
                  <Upload  {...uploadProps}>
                    <Button icon={<UploadOutlined />}>Upload CV</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item label="Image" name="image">
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>{" "}
            <Row>
              <Col span={24} style={{ textAlign: "right", marginTop: "20px" }}>
                <Form.Item {...tailLayout}>
                  <Button type='primary' htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default MyForm;
