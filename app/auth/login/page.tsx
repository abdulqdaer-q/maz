"use client";
import { Checkbox, Form, Input, message } from "antd";

import LoginWrapper from "@/components/wrappers/LoginWrapper";
import { useAuthContext } from "@/contexts/AuthContext";
import { axios } from "@/utils/axios";
import { setToken } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { submitKey } from "@/lib/message-keys";
import { useSocketContext } from "@/contexts/SocketContext";

const LoginPage = () => {
  const { setForceReload } = useAuthContext();
  const {setForceReload: setFReload} = useSocketContext();
  const router = useRouter();
  const handleFormSubmit = async (subData: any) => {
    const { email, password } = subData;
    message.open({
      type: "loading",
      content: `Attempting to Sign You In!`,
      key: submitKey,
    });

    const { data } = await axios.post("/auth/local", {
      identifier: email,
      password,
    });
    setToken(data.jwt);
    
    setFReload(e => !e)
    setForceReload(e => !e)
    message.open({
      type: "success",
      content: `Welcome back ${data.user.username}!`,
      key: submitKey,
    });

    router.push("/");
  };

  return (
    <LoginWrapper
      title="Login"
      body="Don't you have an account, Please"
      linkText="Register"
      linkHref="/auth/register"
      handleFormSubmit={handleFormSubmit}
      submitText="Login"
    >
      <Form.Item
        name="email"
        label="Email"
        className="w-full "
        rules={[
          { required: true, message: "Please input your email!" },
          {
            type: "email",
            message: "Please enter a valid email address!",
          },
        ]}
        tooltip="This is a required field"
      >
        <Input type="email" className="h-10 block rounded-md" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        className="w-full "
        rules={[
          { required: true, message: "Please input your password!" },
          {
            min: 8,
            message: "Password must be at least 8 characters!",
          },
        ]}
        tooltip="This is a required field"
      >
        <Input.Password className="h-10 rounded-md" />
      </Form.Item>

      <label className="text-sm flex items-end mt-2">
        <Checkbox name="remember-me" />
        <p className="ml-3">Remember Me</p>
      </label>
    </LoginWrapper>
  );
};

export default LoginPage;
