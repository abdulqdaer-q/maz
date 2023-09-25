
import useCompanies from '@/app/hooks/useCompanies';
import useCountries from '@/app/hooks/useCountries';
import useIndustries from '@/app/hooks/useIndustries';
import { Countries } from '@/types/Country';
import { EmploymentType } from '@/types/Job';
import { Gender } from '@/types/User';
import { axios } from '@/utils/axios';
import { FilterOutlined } from '@ant-design/icons';
import { Checkbox, Collapse, CollapseProps, InputNumber, Radio, Select, Slider } from 'antd'
import Input from 'antd/es/input/Input';
import React, { useEffect, useState } from 'react'
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
type props = {
    formData: {

    }
    setFormData: any
};
const Filter = ({
    formData,
    setFormData
}: props) => {
    const countries = useCountries();
    const industries = useIndustries();
    const companies = useCompanies();

    const handleChange = (name, value) => {

        console.log({ name, value }, "ds")
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));


    };

    const items: CollapseProps['items'] = [
        {

            key: '0',
            label: 'Search',
            children: <Input onChange={(e) => {handleChange('search', e.target.value)}} />
        },
        {
            key: '1',
            label: 'Country',
            children: <Select style={{width:'100%'}} showSearch optionFilterProp='label' options={countries} onChange={(e) => {handleChange('country', e)}} />
        },
        {
            key: '2',
            label: 'Industry',
            children: <Select style={{width:'100%'}} showSearch optionFilterProp='label' options={industries} onChange={(e) => {handleChange('industry', e)}} />
        },
        {
            key: '7',
            label: 'Companies',
            children: <Select style={{width:'100%'}} showSearch optionFilterProp='label' options={companies} onChange={(e) => {handleChange('company', e)}} />
        },
        {
            key: '3',
            label: 'Employment Type',
            children: <Radio.Group className='flex flex-col' name='type' onChange={(value) => handleChange(value.target.name, value.target.checked ? value.target.value : undefined)} value={formData.type}>
                {Object.values(EmploymentType).map((type) => (
                    <Radio value={type}  >{type}</Radio>
                ))}
                <Radio value={""} checked >{"All Employment Types "}</Radio>
            </Radio.Group>,
        },
        {
            key: '4',
            label: 'Gender',
            children: <Radio.Group className='flex flex-col' name='gender' onChange={(value) => handleChange(value.target.name, value.target.checked ? value.target.value : undefined)} value={formData.gender}>
                {Object.values(Gender).map((gen) => (
                    <Radio value={gen} >{gen}</Radio>

                ))}
                <Radio value={""} checked >{"All Genders "}</Radio>

            </Radio.Group>,
        },
        {
            key: '5',
            label: 'Age',
            children: <>
                <span>Min </span> <InputNumber value={formData.minAge} onChange={(value) => handleChange("minAge", value)} name='minAge' />
                <span>Max </span> <InputNumber value={formData.maxAge} onChange={(value) => handleChange("maxAge", value)} name='maxAge' />
            </>,
        },
        {
            key: '6',
            label: 'Salary',
            children: <div className='flex justify-between items-center'>
                <span>Min </span> <InputNumber value={formData.minSalary} onChange={(value) => handleChange("minSalary", value)} name='minSalary' />
                <span>Max </span> <InputNumber value={formData.maxSalary} onChange={(value) => handleChange("maxSalary", value)} name='maxSalary' />
            </div>,
        }
    ]
    return (
        <div className=' w-72  h-[700px] border-t-4 border-primary rounded-md fixed  overflow-y-scroll'>
            <h1 className=' m-2'><FilterOutlined className='mx-2' /> <span className=' text-xl first-letter:'>Filter</span></h1>
            <Collapse className='flex flex-col' defaultActiveKey={['3', '4', '5', '6']} bordered={false} items={items} />
        </div>
    )
}

export default Filter