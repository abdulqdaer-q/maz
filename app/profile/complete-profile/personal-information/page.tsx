"use client";
import useCountries from "@/app/hooks/useCountries";
import FillInformationWrapper from "@/components/wrappers/FillInformationWrapper";
import { useAuthContext } from "@/contexts/AuthContext";
import { customRequest } from "@/lib/customRequest";
import { getPhotoLink } from "@/lib/getPhotoLink";
import { Gender } from "@/types/User";
import { axios } from "@/utils/axios";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Col,
  DatePicker,
  Form,
  message,
  Radio,
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

const PersonalDetails = () => {
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
      birthday: values.birthday.format("YYYY-MM-DD"),
      gender: values.gender,
      nationality: values.nationality,
      residenceCountry: values.residenceCountry,
      photo: values.photo.fileList.map((e: any) => {
        return e.response[0].id;
      }),
    };
    await axios.put(`/user-infos/${user!.userInfo!.id}`, { data });
    router.replace("/profile/complete-profile/have-experience");
  };
  if (isLoading) {
    return <Skeleton active={isLoading} className="min-h-[30vh]" />;
  }
  return (
    <FillInformationWrapper
      title="Personal Details"
      subTitle="Add your picture and personal details to increase your visibility when employers search for CVs."
      onSubmit={onSubmit}
      initialValues={{
        birthday: user?.userInfo?.birthday
          ? dayjs(user?.userInfo?.birthday)
          : undefined,
        photo: user?.userInfo?.photo.id
          ? {
              fileList: [
                {
                  response: [
                    {
                      id: user?.userInfo?.photo.id,
                    },
                  ],
                },
              ],
            }
          : undefined,
        residenceCountry: user?.userInfo?.residenceCountry.id,
        nationality: user?.userInfo?.nationality.id,
        gender: user?.userInfo?.gender || Gender.MALE,
      }}
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
      <Col span={24}>
        <Form.Item
          tooltip="This is a required field"
          name="birthday"
          label="Birthday"
          rules={[{ required: true }]}
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
    </FillInformationWrapper>
  );
};

export default PersonalDetails;
