"use client";
import Navbar from "@/components/Navbar";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  Row,
  Col,
  UploadProps,
  message,
  Modal,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { axios } from "@/utils/axios";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useRouter } from "next/navigation";

function page() {
const [fileList, setFileList] = useState<UploadFile[]>([]);
  const router = useRouter();
  const onFinish = async(values: any) => {
    
    
    const data = {
      name: values.companyName,
      categories: values.categories,
      company_locateds: values.company_locateds,
      companyLogo: fileList.map((e) => {
        return e.response[0].id
      }),
    }
    try {
      await axios.post('/companies', {data})
      message.success('company created');
      router.push('/');
    }catch(err){
      message.error('Failed to create Company');
    }
  };
  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchAll =  async () => {
      const {data: {data}} = await axios.get('/countries');
      setCountries(data.map((e:any) =>({
        value: e.id,
        label: e.attributes.name
      })))
      const {data: {data: categories}} = await axios.get('/categories');
      setCategories(categories.map((e:any) =>({
        value: e.id,
        label: e.attributes.category
      })))
    }
    fetchAll();
  }, []);
  const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
  setFileList(newFileList);

  const uploadProps: UploadProps = {
    
    customRequest: (options) => {
      const fd = new FormData();
      fd.append("files", options.file);
      axios
        .post("/upload", fd)
        .then((e) => {
          options!.onSuccess!(e.data);
        })
        .catch((err) => {
          options.onError!({
            status: 400,
            name: "error",
            method: "POST",
            url: "/upload",
            message: "upload failed",
          });
        });
    },
    onChange(info) {
      handleChange(info);
    },
    beforeUpload(file) {
      beforeUpload(file)
    }
  };
  return (
    <div className="bg-gray-200 pb-6">
      
      <main className="bg-white h-full m-20 rounded-3xl pt-4 shadow-md pb-24 px-12">
        <h2 className="text-blue-500 text-4xl text-center mt-6">
          Create Company Page
        </h2>
        <h1 className="text-lg text-gray-700 text-center  mt-2 mb-12">
          Let&apos;s Get Started With A Few Details About Your Buisness
        </h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="companyName"
                label="Company Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter the company name",
                  },
                ]}
              >
                <Input placeholder="Company Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="categories"
                label="Industry"
                rules={[
                  {
                    required: true,
                    message: "Please select the industry",
                  },
                ]}
              >
                <Select placeholder="Select Industry" options={categories} mode='multiple' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="company_locateds"
                label="Location"
                rules={[
                  {
                    required: true,
                    message: "Please select the location",
                  },
                ]}
              >
                <Select placeholder="Select Location" mode='multiple' options={countries}>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Company Logo"
                name="companyLogo"
                rules={[
                  
                ]}
              >
                <Upload customRequest={uploadProps.customRequest}
                 name="logo" maxCount={1} multiple={false}               className="avatar-uploader"
                 onPreview={handlePreview}
                 onChange={handleChange}         
                 listType="picture-circle"

        showUploadList={true}>
        { uploadButton}
                
                </Upload>
                <Modal open={previewOpen} title={null} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="companyWebsite"
                label="Company Website"
                rules={[
                  {
                    required: true,
                    message: "Please enter the company website",
                  },
                ]}
              >
                <Input placeholder="Company Website" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tagline"
                label="Company Tagline"
                rules={[
                  {
                    required: true,
                    message: "Please enter the company tagline",
                  },
                ]}
              >
                <Input.TextArea placeholder="Company Tagline" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full h-12 mb-20 text-white text-sm rounded-lg mt-6"
                >
                  Create Company Page
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </main>
    </div>
  );
}

export default page;
