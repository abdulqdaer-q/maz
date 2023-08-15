import React from 'react';

type props = {
	textareaProps: any;
	textareaStyle:string;
	label: string;
	lableStyle?:string;
	
};

const TextArea = ({ textareaProps,textareaStyle, label,lableStyle  }: props) => {
  return (
    <div className='flex flex-row'>
		<label className={lableStyle}>
				{label}
			</label>
    <textarea
      {...textareaProps}
      className={  `${textareaStyle ? textareaStyle: `relative block mb-5 overflow-hidden rounded-md border border-gray-200 text-gray-700 px-3 pt-3 shadow-sm focus-within:border-secondary focus-within:ring-1 focus-within:ring-secondary
      p-2 w-full h-40 resize-none`} `}
    />
    </div>
  );
};

export default TextArea;
