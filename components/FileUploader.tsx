"use client";
import React, { useState, ChangeEvent } from "react";
type props = {
  onChange: (e: any) => {};
};
type PdfUploaderProps = {
  onUpload: (file: File | undefined) => void;
};
const PdfUploader: React.FC<PdfUploaderProps> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);
    onUpload(file); // Call onUpload with the selected file
  };
  return (
    <div className=" text-blue-500 mr-5  hover:text-blue-400 transition duration-200 ">
      <label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-16 h-16"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
          />
        </svg>
        <input className="hidden" type="file" onChange={handleFileChange} />
      </label>
    </div>
  );
};

export default PdfUploader;
