"use client";
import { Button, Form, FormInstance, Row, Select, Upload } from "antd";
import { Store } from "antd/es/form/interface";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  onSubmit: (data: any) => void;
  title: string;
  subTitle?: string;
  startOver?: boolean;
  initialValues?: Store;
  form?: FormInstance;
};
const FillInformationWrapper = ({
  onSubmit,
  startOver = false,
  title,
  subTitle,
  children,
  initialValues,
  form,
}: Props) => {
  return (
    <>
      <div className="bg-white mt-3 text-center">
        <Title level={2}> {title} </Title>
        <Paragraph>{subTitle}</Paragraph>
      </div>
      <div className="bg-[#f4f4f4] py-5">
        <div className="w-2/5 mx-auto shadow-xl bg-white p-5">
          <Form
            form={form}
            initialValues={initialValues}
            layout="vertical"
            onFinish={onSubmit}
          >
            <Row>{children}</Row>
            <div className="flex justify-between  items-center">
              <div className="">
                {startOver && (
                  <Link href="/profile/complete-profile/personal-information">
                    <Button type="text">Start Over</Button>
                  </Link>
                )}
              </div>
              <div className="flex">
                <Link href="/profile">
                  <Button type="text">I'll do later</Button>
                </Link>
                <Button
                  htmlType="submit"
                  type="primary"
                  size="middle"
                  className="!px-10 "
                >
                  Next
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default FillInformationWrapper;
