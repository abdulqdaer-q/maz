import React, { ChangeEvent, ReactNode } from 'react';

type Props = {
	selectProps: any
	children: ReactNode;
	onChange?: (value: string) => void;
    selectStyle?:string;
    label: string;
	lableStyle?:string;
};
const Select = ({ selectProps, selectStyle,children,  label,lableStyle,onChange }: Props) => {
	const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		if (onChange) {
			onChange(event.target.value);
		}
	};
        
	return (
    	<div className='flex flex-row'>
        <label className={lableStyle}>
				{label}
		</label>
		<select
			onChange={handleSelectChange}
			className={ `${selectStyle ? selectStyle: "relative block  px-3 pt-3 pb-2 overflow-hidden rounded-md border border-gray-200 shadow-sm focus-within:border-secondary focus-within:ring-1 focus-within:ring-secondary text-sm text-gray-400 w-full"} `}
			{...selectProps}
		>
			{children}
		</select>
        </div>
	);
};

export default Select;
