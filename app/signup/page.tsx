"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, DatePicker, Upload, Button, Row, Col, Card, UploadProps, message, Dropdown, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Navbar from "@/components/Navbar";
import { API } from "@/utils/constant";
import { axios } from "@/utils/axios";
import { User } from "@/types/User";
import { setToken } from "@/utils/helper";
import { useRouter } from "next/navigation";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const MyForm = () => {

  const [jobTitles, setJobTitles] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const {data: {data}} = await axios.get('/job-titles')
      
      setJobTitles(data.map((e: any) => ({
        value: e.id,
        label: e.attributes.jobTitle
      })))
      
    }
    fetchData()
  }, [])
  const router = useRouter();
  const onFinish =async (values: any) => {
    const registerBody = {
      email: values.email,
      username: values.name,
      password: values.password,
    };
    try {

    const {data} = await axios.post<{user:User, jwt: string}>('/auth/local/register', registerBody);

    const {id} = data.user;
     const {birthday, name, mobileNumber, jobTitle, cv, image} = values;
    
    const imageIds = image.fileList.map((e:any) => {
      return e.response[0].id
    });
    const cvIds = cv.fileList.map((e:any)=>{
      return e.response[0].id
    })

    const userInfoBody = {
      birthDate: birthday.format('YYYY-MM-DD'),
      phoneNumber: mobileNumber,
      photo: imageIds,
      job: jobTitle,
      cv: cvIds,
      name,
      users_permissions_user: id
    };
    await axios.post('/user-infos', {data:userInfoBody});
    
      setToken(data.jwt);
    
      // set the user
      
      message.success(`Welcome  ${data.user.username}!`);
      router.push('/')
    }
    catch(err) {
      message.error(`Email, or username is duplicated please reset your password`)
    }
    
    
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
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email" },
                    { type: "email", message: "Please enter a valid email address!" },

                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label="name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input your name" },
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
                  <DatePicker format="YYYY-MM-DD" size="large"  />
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
                   <Select
                   options={jobTitles}
                    showSearch
                    size="large"
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    placeholder="Select a person"
                    optionFilterProp="children"
                    
    />
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
