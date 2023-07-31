import React, { ChangeEvent } from "react";


interface FileViewerSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

const FileViewerSelector= ({
  value,
  onChange,
  options,
} : FileViewerSelectorProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <select value={value} onChange={handleChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default FileViewerSelector;
