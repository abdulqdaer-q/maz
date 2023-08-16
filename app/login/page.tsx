'use client'
import React from "react";
import { Image, Checkbox, Button, Input, Form, notification, message } from "antd";

import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { axios } from "@/utils/axios";
import { setToken } from "@/utils/helper";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const {setUser} = useAuthContext();
  const router = useRouter()

  const handleFormSubmit = async (data:any) => {
    const {email, password} = data;
    try {
      const {data} = await axios.post('/auth/local', {
        identifier: email,
        password
      });

      console.log(data);
      setToken(data.jwt);
    
      // set the user
      setUser(data.user);
      message.success(`Welcome back ${data.user.username}!`);
      router.push('/')
      
    }
    catch(err: any) {
      console.log(err);
      api.error({
        message: 'Failed To Login',
        description: 'email or password are incorrect'
      })
      
    }
  };

  return (
    <>
    {contextHolder}
    <div className="bg-white">
      <main className="bg-[#EDF2F6] overflow-hidden	 max-h-[70vh] h-full m-20 rounded-3xl relative">
        <div className="grid grid-cols-2 h-full">
          <div className="border-r border-gray-400 h-full relative">
            <Image src="/logo.png" alt="logo" preview={false} />
          </div>
          <div className="p-8">
            <h2 className="text-blue-500 text-4xl text-center mt-16">Login</h2>
            <h1 className="text-sm text-gray-700 text-center my-8">
              If you have an account, please enter your email and password
            </h1>
            <Form layout="vertical" onFinish={handleFormSubmit} className="flex flex-col items-start mt-16 px-8">
              <Form.Item name='email' label='Email' className="w-full " rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email address!" },
                ]}  tooltip="This is a required field">
                <Input type="email" className="h-12 block rounded-md" />
              </Form.Item>
              
              <Form.Item name='password' label='Password' className="w-full " rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 8, message: "Password must be at least 8 characters!" },
                ]} tooltip="This is a required field">
                <Input.Password className="h-12 block rounded-md" />
              </Form.Item>
             
              <label className="text-sm flex items-end mt-2">
                <Checkbox name="remember-me" />
                <p className="ml-3">
                Remember Me
                </p>
              </label>
              <Button type="primary" className="mt-5 w-1/6" htmlType="submit">
                Login
              </Button>
            </Form>
          </div>
        </div>
        <Image
          src="/logo.png"
          alt="logo"
          height={100}
          width={100}
          className="absolute left-3 bottom-3"
        />
      </main>
    </div>
    </>

  );
};

export default LoginPage;
