import { PropsWithChildren } from "react";
import {
  Image,
  Checkbox,
  Button,
  Input,
  Form,
  notification,
  message,
} from "antd";
import Link from "next/link";

type Props = PropsWithChildren & {
  title: string;
  body: string;
  linkText: string;
  linkHref: string;
  handleFormSubmit: (values: any) => void;
  submitText: string;
};

export default ({
  children,
  title,
  body,
  linkHref,
  linkText,
  submitText,
  handleFormSubmit,
}: Props) => {
  const [api, contextHolder] = notification.useNotification();
  const onFinish = (value: any) => {
    handleFormSubmit;
  };
  return (
    <div className="w-full">
      <div className="flex justify-center">
        <Image
          preview={false}
          src="/logo.png"
          alt="logo"
          height={100}
          width={100}
        />
      </div>
      <h2 className="text-blue-500 text-4xl text-center ">{title}</h2>
      <h1 className="text-sm text-gray-700 text-center my-8">
        {body}{" "}
        <Link href={linkHref} className="text-primary">
          {linkText}
        </Link>
      </h1>

      <Form
        layout="vertical"
        onFinish={handleFormSubmit}
        className="flex flex-col items-start my-16 px-8"
      >
        {children}
        <Button type="primary" className="mt-5 w-full" htmlType="submit">
          {submitText}
        </Button>
      </Form>
    </div>
  );
};
