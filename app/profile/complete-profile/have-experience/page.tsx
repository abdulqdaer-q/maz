"use client";
import FillInformationWrapper from "@/components/wrappers/FillInformationWrapper";
import { useAuthContext } from "@/contexts/AuthContext";
import { BriefcaseIcon, IdentificationIcon } from "@heroicons/react/24/outline";
import { Col, Form, Radio, Row } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";

export default () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const handleFormSubmit = ({
    haveExpereience,
  }: {
    haveExpereience: boolean;
  }) => {
    if (haveExpereience) {
      router.replace("/profile/complete-profile/experience");
      return;
    }
    router.replace("/profile/complete-profile/education");
  };
  return (
    <FillInformationWrapper
      title={`Hello, ${user?.userInfo?.firstName}`}
      subTitle="What is your experience level?"
      onSubmit={handleFormSubmit}
      initialValues={{
        haveExpereience: true,
      }}
      startOver
    >
      <Form.Item
        className="w-full"
        name="haveExpereience"
        rules={[{ required: true }]}
      >
        <Radio.Group className="w-full">
          <Row className="w-full p-5">
            <Col span={3} className="!flex items-center">
              <BriefcaseIcon height={48} className="text-primary" />
            </Col>
            <Col span={19}>
              <Title level={3}>I have work experience</Title>
              <Paragraph className="!text-gray-700">
                I've worked at a company for a number of years and gained
                valuable experience there.
              </Paragraph>
            </Col>
            <Col offset={1} span={1}>
              <Radio value={true} />
            </Col>
          </Row>
          <Row className="w-full p-5">
            <Col span={3} className="!flex items-center">
              <IdentificationIcon height={48} className="text-primary" />
            </Col>
            <Col span={19}>
              <Title level={4}>I am a recent graduate</Title>
              <Paragraph className="!text-gray-700">
                I just finished my studies and looking to jump into the
                workforce.
              </Paragraph>
            </Col>
            <Col offset={1} span={1}>
              <Radio value={false} />
            </Col>
          </Row>
        </Radio.Group>
      </Form.Item>
    </FillInformationWrapper>
  );
};
