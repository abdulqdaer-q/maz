"use client";
import React, { useRef, useState } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
type style = { first: string; second: string };
const CustomFileInput = ({ first, second }: style) => {
  const ref = useRef<HTMLInputElement>(null);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleClick = () => {
    ref.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files ?? []);
    setSelectedFiles(files);
  };
  return (
    <div>
      <div onClick={handleClick} className={first}>
        <CloudArrowUpIcon className="w-6 h-6" />
        <span>Choose a file to upload</span>
        <input
          type="file"
          ref={ref}
          className="hidden"
          onChange={handleChange}
        />
      </div>

      {!!selectedFiles.length && (
        <div className={second}>
          <p>Selected Files:</p>
          {selectedFiles.map((file, i) => {
            return (
              <span key={i} className="text-blue-400 whitespace-nowrap">
                {file.name}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomFileInput;
