import useCountries from '@/app/hooks/useCountries';
import useIndustries from '@/app/hooks/useIndustries';
import { Countries } from '@/types/Country';
import { EmploymentType } from '@/types/Job';
import { Gender } from '@/types/User';
import { axios } from '@/utils/axios';
import { FilterOutlined } from '@ant-design/icons';
import { Checkbox, Collapse, CollapseProps } from 'antd'
import React from 'react'
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const Filter = () => {
    const countries = useCountries();
    const industries = useIndustries();
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Country',
            children: <>
                {countries?.map(country => <Checkbox onChange={() => console.log(country.value)}>{country.label}</Checkbox>)}
            </>

            ,
        },
        {
            key: '2',
            label: 'Industry',
            children: <>
                {industries?.map(industry => <Checkbox onChange={(value) => console.log(value)}>{industry.label}</Checkbox>)}
            </>
            ,
        },
        {
            key: '3',
            label: 'Employment Type',
            children: <>
                {Object.values(EmploymentType).map((type) => (
                    <Checkbox onChange={(value) => console.log(value)}>{type}</Checkbox>
                ))}
            </>,
        },
        {
            key: '4',
            label: 'Gender',
            children: <>
                {Object.values(Gender).map((gen) => (
                    <Checkbox onChange={(value) => console.log(value)}>{gen}</Checkbox>
                ))}
            </>,
        }
    ]
    return (
        <div className='w-full  h-full border-t-4 border-primary rounded-md'>
            <h1 className=' m-2'><FilterOutlined className='mx-2' /> <span className=' text-xl first-letter:'>Filter</span></h1>
            <Collapse defaultActiveKey={['1', '2', '3', '4']} bordered={false} items={items} />
        </div>
    )
}

export default Filter