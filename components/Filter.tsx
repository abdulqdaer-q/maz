import { FilterOutlined } from '@ant-design/icons';
import { Collapse, CollapseProps } from 'antd'
import React from 'react'
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
    {
        key: '1',
        label: 'Country',
        children: <p>{text}</p>,
    },
    {
        key: '2',
        label: 'Industry',
        children: <p>{text}</p>,
    },
    {
        key: '3',
        label: 'Employment Type',
        children: <p>{text}</p>,
    },
    {
        key: '4',
        label: 'Gender',
        children: <p>{text}</p>,
    }
]
const Filter = () => {

    return (
        <div className='w-full  h-full border-t-4 border-primary rounded-md'>
            <h1 className=' m-2'><FilterOutlined className='mx-2' /> <span className=' text-xl first-letter:'>Filter</span></h1>
            <Collapse bordered={false} items={items} />
        </div>
    )
}

export default Filter