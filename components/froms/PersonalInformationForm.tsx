"use client";
import useCountries from "@/app/hooks/useCountries";
import FillInformationWrapper, {
  FillInformationProps,
} from "@/components/wrappers/FillInformationWrapper";
import { useAuthContext } from "@/contexts/AuthContext";
import { customRequest, onChange } from "@/lib/customRequest";
import { getPhotoLink } from "@/lib/getPhotoLink";
import { getMediaId, mediaToForm, mediaToList } from "@/lib/mediaToForm";
import { Gender } from "@/types/User";
import { axios } from "@/utils/axios";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { CloudArrowDownIcon } from "@heroicons/react/24/outline";
import {
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
  Skeleton,
  Upload,
  UploadProps,
} from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { RcFile } from "antd/es/upload";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

type Props = Partial<FillInformationProps> & {
  onAfterSubmit: () => void;
  withMainInformation: boolean;
};
const PersonalInformation = ({
  onAfterSubmit,
  withMainInformation,
  ...rest
}: Props) => {
  const { user, isLoading } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const router = useRouter();
  const countries = useCountries();
  const uploadProps: UploadProps = {
    customRequest,
    onChange(info) {
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        getBase64(info.file.originFileObj as RcFile, (url) => {
          setLoading(false);
          setImageUrl(url);
        });
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  useEffect(() => {
    if (!isLoading && user?.userInfo?.photo) {
      setImageUrl(getPhotoLink(user.userInfo.photo.url));
    }
  }, [isLoading]);
  const onSubmit = async (values: any) => {
    const data = {
      ...values,
      birthday: values.birthday.format("YYYY-MM-DD"),
      photo: getMediaId(values.photo),
      cv: getMediaId(values.cv),
    };
    if (withMainInformation)
      await axios.put(`/users/${user!.id}`, { email: values.email });
    await axios.put(`/user-infos/${user!.userInfo!.id}`, { data });
    onAfterSubmit();
  };
  if (isLoading) {
    return <Skeleton active={isLoading} className="min-h-[30vh]" />;
  }
  console.log({user});
  
  return (
    <FillInformationWrapper
      title="Personal Details"
      subTitle="Add your picture and personal details to increase your visibility when employers search for CVs."
      onSubmit={onSubmit}
      initialValues={{
        birthday: user?.userInfo?.birthday
          ? dayjs(user?.userInfo?.birthday)
          : undefined,
        photo: user?.userInfo?.photo?.id
          ? mediaToForm(user.userInfo.photo.id)
          : undefined,
        residenceCountry: user?.userInfo?.residenceCountry?.id,
        nationality: user?.userInfo?.nationality?.id,
        gender: user?.userInfo?.gender || Gender.MALE,
        cv: user?.userInfo?.cv?.id
          ? mediaToForm(user.userInfo.cv.id)
          : undefined,
        firstName: user?.userInfo?.firstName,
        lastName: user?.userInfo?.lastName,
        email: user?.email,
      }}
      {...rest}
    >
      <Col span={24}>
        <div className="flex">
          <Form.Item
            tooltip="This is a required field"
            name="photo"
            rules={[{ required: true, message: "Please Upload Photo" }]}
          >
            <Upload
              {...uploadProps}
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  className="w-full h-full rounded-full"
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <div className="mt-3">
            <Title level={5}>
              {user?.userInfo?.firstName + " " + user?.userInfo?.lastName}
            </Title>
            <Paragraph type="secondary">{user?.email}</Paragraph>
          </div>
        </div>
      </Col>
      {withMainInformation && (
        <>
          <Row gutter={5} className="!w-full">
            <Col span={12}>
              <Form.Item
                tooltip="This is a required field"
                name="firstName"
                label="First Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                tooltip="This is a required field"
                name="lastName"
                label="Last Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                tooltip="This is a required field"
                name="email"
                label="Email Address"
                rules={[{ required: true, type: "email" }]}
              >
                <Input type="email" />
              </Form.Item>
            </Col>
          </Row>
        </>
      )}
      <Col span={24}>
        <Form.Item
          tooltip="This is a required field"
          name="birthday"
          label="Birthday"
          rules={[{ required: true }, {validator: ((e, v) => {
            const age = -Math.ceil(v.diff(dayjs(Date.now()), 'months')/12);
            
            if (age >= 18) {
              return Promise.resolve();
            }
            return Promise.reject( new Error('You Should Be Atleast 18') );
            
          })}]}
        >
          <DatePicker className="w-full" showToday={false} />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          tooltip="This is a required field"
          name="residenceCountry"
          label="Choose Your Location"
          rules={[{ required: true }]}
        >
          <Select options={countries} placeholder="Select Country"></Select>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          tooltip="This is a required field"
          name="nationality"
          label="Choose Your Nationality"
          rules={[{ required: true }]}
        >
          <Select options={countries} placeholder="Select Country"></Select>
        </Form.Item>
      </Col>
      <Form.Item
        tooltip="This is a required field"
        name="gender"
        label="Gender"
        rules={[{ required: true }]}
      >
        <Radio.Group>
          <Radio value={Gender.MALE}>Male</Radio>
          <Radio value={Gender.FEMALE}>Female</Radio>
        </Radio.Group>
      </Form.Item>
      <Col span={24} className="!mb-20">
        <Form.Item label="Upload CV" name="cv">
          <Upload.Dragger
            defaultFileList={mediaToList(user?.userInfo?.cv)}
            multiple={false}
            maxCount={1}
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

export default PersonalInformation;
