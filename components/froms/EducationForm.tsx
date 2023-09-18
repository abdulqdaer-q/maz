"use client";
import FillInformationWrapper, {
  FillInformationProps,
} from "@/components/wrappers/FillInformationWrapper";
import { useAuthContext } from "@/contexts/AuthContext";
import { customRequest, onChange } from "@/lib/customRequest";
import { mediaToList } from "@/lib/mediaToForm";
import { Degree, Education } from "@/types/Education";
import { axios } from "@/utils/axios";
import { CloudArrowDownIcon } from "@heroicons/react/24/outline";
import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

type Props = Partial<FillInformationProps> & {
  onAfterSubmit: () => void;
  id?: number;
};
export default ({ onAfterSubmit, id, ...rest }: Props) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [education, setEducation] = useState<any>();
  const handleFormSubmit = async (values: any) => {
    const certificates = values.certificate?.fileList.map((e: any) => {
      return e.response[0].id;
    });
    const data = {
      ...values,
      graduationDate: values.graduationDate.format("YYYY-MM-DD"),
      userInfo: user?.userInfo?.id,
      certificate: certificates,
    };
    if (id) {
      await axios.put("/educations/" + id, { data });
    } else {
      await axios.post("/educations", { data });
    }
    onAfterSubmit();
  };
  useEffect(() => {
    const fetchExperience = async (id: number) => {
      const { data } = await axios.get<Education>(
        `/educations/${id}?populate[country][fields][0]=id&populate[certificate][fields][0]=id&populate[certificate][fields][1]=url&populate[certificate][fields][2]=name`
      );
      console.log(data);
      
      setEducation({
        ...data,
        graduationDate: dayjs(data.graduationDate),
        country: data.country!.id,
      });
      setLoading(false);
    };
    if (id) fetchExperience(id);
    else setLoading(false);
  }, [user]);
  if (loading) return <></>;
  return (
    <FillInformationWrapper
      title={`Education details`}
      subTitle="Adding these details will show employers that you're qualified for the job."
      onSubmit={handleFormSubmit}
      initialValues={education}
      startOver
      {...rest}
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
      <Col span={24}>
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
      <Col span={24}>
        <Form.Item
          label="Grade"
          name="grade"
          rules={[{ min: 60 , max: 100, required: false}]}
        >
          <InputNumber className="!w-full" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          label="Description"
          name="description"

        >
          <TextArea rows={6} className="!w-full" />
        </Form.Item>
      </Col>
      <Col span={24} className="!mb-20">
        <Form.Item label="Certificate" name="certificate">
          <Upload.Dragger
            multiple={false}
            maxCount={1}
            defaultFileList={mediaToList(education?.certificate)}
            customRequest={customRequest}
            onChange={onChange}
          >
            <p className="ant-upload-drag-icon flex justify-center text-primary">
              <CloudArrowDownIcon height={32} />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Upload.Dragger>
        </Form.Item>

        <p className="text-sm text-gray-400 text-center ">
          Maximum file size: 5 MB. File formats allowed: pdf, doc, docx, and txt
          only
        </p>
      </Col>
    </FillInformationWrapper>
  );
};
