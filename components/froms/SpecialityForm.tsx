import { useAuthContext } from "@/contexts/AuthContext";
import { Language, Level } from "@/types/Specaility";
import { axios } from "@/utils/axios";
import { Button, Col, Form, Input, message, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { Store } from "antd/es/form/interface";
import React, { useEffect } from "react";

export type SpecialityProps = {
  id?: number;
  initialValues?: Store;
  onCancel?: () => void;
  onSuccess?: ()=> void;
  isLanguage: boolean;
};

const SpecialityForm = ({ id, initialValues, onCancel, onSuccess, isLanguage }: SpecialityProps) => {
  const {user} = useAuthContext();
  const url = isLanguage ? "language-levels" : "specialities";
  const handleOnFinish = async (data: any) => {
    if (id) {
      await axios.put(`/${url}/` + id, { data });
      message.success('Edited Sucessfully');
    } else {
      await axios.post(`/${url}`, { data:{ 
        ...data, userInfo: user?.userInfo?.id
      } });
      message.success('Added Sucessfully');
    }
    onSuccess?.();

  };
  
  return (
    <Form
      initialValues={initialValues}
      layout="vertical"
      onFinish={handleOnFinish}
    >
      <Row gutter={15}>
        <Col span={12}>
          <Form.Item label={isLanguage ?"Language" : "Speciality"} name={isLanguage ? 'language' : 'name'}>
            {isLanguage ? <Select options={Object.values(Language).map(e => ({
              label: e,
              value: e
            }))}  />: <Input />}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Level" name="level">
            <Select
              options={Object.values(Level).map((e) => ({
                label: e,
                value: e,
              }))}
            />
          </Form.Item>
        </Col>
        <div className="flex w-full justify-between mx-[7.5px]">
          <div>
            <Button
              onClick={() => {
                onCancel?.();
              }}
            >
              Cancel
            </Button>
          </div>
          <div>
            <Button htmlType="submit" type="primary">
              Save
            </Button>
          </div>
        </div>
      </Row>
    </Form>
  );
};

export default SpecialityForm;
