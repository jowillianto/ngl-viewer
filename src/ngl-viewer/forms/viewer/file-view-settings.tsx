import { ViewSettings } from "../../interfaces/interfaces";
import { FormP } from "../common";
import { useState } from "react";
import FileViewerSelector from "./viewer-selector";


export type FileViewSettingsP = FormP<ViewSettings[]> & { options : string[] }

const FileViewSettings = ({options, value, onChange} : FileViewSettingsP) => {
  const [viewSettings, setViewSettings] = useState<ViewSettings[]>(value || []);
  const [selectedType, setSelectedType] = useState<string>(options[0]);

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  const applyViewSettings = () => {
    const newSettings = viewSettings.map((setting) => ({ ...setting, type: selectedType }));
    setViewSettings(newSettings);
    onChange(newSettings); 
  };

  return (
    <div>
      <FileViewerSelector
        value={selectedType}
        onChange={handleTypeChange}
        options={options}
      />
      <button onClick={applyViewSettings}>Apply</button>
    </div>
  );
};

export default FileViewSettings;
