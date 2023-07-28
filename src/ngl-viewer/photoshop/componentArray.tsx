import React, { useState, useMemo } from 'react';
import { ComponentDataT, ComponentUIDataT } from './componentData';
import ComponentSwitch from './renderTest';
import NGLStage, { NGLStageProps } from '../stage';
import NGLText from 'ngl-viewer/shapes/text';
import UploadAndViewer from 'ngl-viewer/forms/file-renderer';

type ComponentTwoP = NGLStageProps & { array: ComponentUIDataT[] };

export const ComponentTwo = ({ array, ...stageProps }: ComponentTwoP) => {
  const [pdbData, setPdbData] = useState<string>('');

  const handleFileRead = (fileContent: string) => {
    setPdbData(fileContent);
  };

  const filteredArray = useMemo(() => {
    return array
      .filter((entry) => "props" in entry)
      .map((entry, id) => {
        return { type: entry.type, key: id, props: entry.props } as ComponentDataT;
      });
  }, [array]);

  return (
    <div>
      <UploadAndViewer onFileRead={handleFileRead} />
      <NGLStage pdbData={pdbData} {...stageProps}>
        {filteredArray.map((entry) => (
          <ComponentSwitch {...entry} />
        ))}
      </NGLStage>
    </div>
  );
};
