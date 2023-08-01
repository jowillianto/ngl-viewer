import React, { useState } from "react";
import { FormP } from "./common";

type FileUploaderP = FormP<File>

const FileUploader = ({ value , onChange } : FileUploaderP) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(value);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
    if (file) {
      onChange(file);
    }
  };


  return (
    <div className="file-uploader">
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default FileUploader;
