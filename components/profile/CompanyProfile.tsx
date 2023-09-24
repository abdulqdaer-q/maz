
import { Company, User, UserInfo } from '@/types/User';
import { axios } from '@/utils/axios';
import { AutoComplete, Card, Col, Input, Row } from 'antd';
import Title from 'antd/es/typography/Title';

import React, { useEffect, useState } from 'react';
import Container from '../layout/container';
import { KeyValueColumn } from './Profile';

type Props = { user: User, setReload: () => {}, }
const CompanyProfile = ({ user }: Props) => {


  return (
    <>
      <div className="bg-gray-200 w-full ">
        <Container>
          <Row >
            <Col className='mx-auto my-4' span={15}>
              <Card>
                <Title level={3}>Contact Information</Title>
                <Row className="items-center mt-5">
                  {[
                    {
                      label: 'Name',
                      value: user.company?.companyName
                    },
                    {
                      label: "Email",
                      value: user.email,
                    },
                    {
                      label: "Mobile",
                      value: user.company?.phoneNumber,
                    },
                    {
                      label: "Company Size",
                      value: user.company?.companySize,
                    },

                    {
                      label: "Location",
                      value: user.company?.country.name,
                    },
                  ].map((e) => (
                    <KeyValueColumn {...e} key={e.label} />
                  ))}
                </Row>
              </Card>
            </Col>

          </Row>
        </Container>
      </div>
    </>
  )
}
export default CompanyProfile