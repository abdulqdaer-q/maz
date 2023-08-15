import React from 'react';

type props = {
	inputProps: any;
	inputStyle:string;
	label: string;
	lableStyle:string;
	disable?: boolean;
};

const Input = ({ inputProps,inputStyle, label,lableStyle, disable , }: props) => {
	return (
		<div className='flex flex-row'>
		<label className={lableStyle}>
				{label}
			</label>
			<input
				{...inputProps}
				defaultValue={inputProps.value ?? ''}
				className={` ${disable  ? inputStyle + "  bg-gray-200":inputStyle } inputStyle`}
				disabled={disable}
			/>

			
			</div>
		
	);
};

export default Input;
