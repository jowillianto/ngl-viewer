import React, { useState, useMemo } from 'react';
import { ComponentDataT, ComponentUIDataT } from './componentData';
import ComponentSwitch from './renderTest';
import NGLStage, { NGLStageProps } from './stage';
import NGLFile from 'ngl-viewer/file/file';


type ComponentTwoP = NGLStageProps & { array: ComponentUIDataT[] };

export const ComponentTwo = ({ array, ...stageProps }: ComponentTwoP) => {
  const [file, setFile] = useState<File | undefined>(undefined);
  
  const filteredArray = useMemo(() => {
    return array
      .filter((entry) => "props" in entry)
      .map((entry, id) => {
        return { type: entry.type, key: id, props: entry.props } as ComponentDataT;
      });
  }, [array]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile);
  };


  return (
    <div>
      <NGLStage {...stageProps}>
        {filteredArray.map((entry) => (
          <ComponentSwitch {...entry} />
        ))}
        <input type="file" onChange={handleFileChange} />
        <NGLFile file={file} viewSettings={[{type:'cartoon', params:{}}]} /> {/* Render NGLFile component */}
      </NGLStage>
    </div>
  );
};

export default ComponentTwo;