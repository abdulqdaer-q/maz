import useCountries from "@/app/hooks/useCountries";
import { CompassOutlined, SearchOutlined } from "@ant-design/icons";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button, Col, Form, Input, Row, Select } from "antd";
import React from "react";

function SearchJobBar() {
  const countries = useCountries();
  const handleFinish = (values: any) => {};
  return (
    <Form onFinish={handleFinish}>
      <Row gutter={5}>
        <Col span={14}>
          <Form.Item name="searchQuery">
            <Input
              size="large"
              prefix={<SearchOutlined />}
              placeholder="Search Job"
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="location">
            <Select
              suffixIcon={<CompassOutlined />}
              size="large"
              options={countries}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Button
            className="w-full"
            size="large"
            htmlType="submit"
            type="primary"
          >
            Find Jobs
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchJobBar;
