import { useAuthContext } from "@/contexts/AuthContext";
import { Level } from "@/types/Specaility";
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
};

const SpecialityForm = ({ id, initialValues, onCancel, onSuccess }: SpecialityProps) => {
  const {user} = useAuthContext();
  const handleOnFinish = async (data: any) => {
    if (id) {
      await axios.put("/specialities/" + id, { data });
      message.success('Edited Sucessfully');
    } else {
      await axios.post("/specialities", { data:{ 
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
          <Form.Item label="Speciality" name="name">
            <Input />
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
