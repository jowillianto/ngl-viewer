import React from 'react';
import { 
  ComponentDataT, 
  ComponentUIDataT 
} from './componentData';
import ComponentSwitch from './renderTest';
import NGLStage, { NGLStageProps } from './stage';
import NGLText from 'ngl-viewer/shapes/text';

type ComponentTwoP = NGLStageProps & { array: ComponentUIDataT[] };

export const ComponentTwo = ({ array, ...stageProps }: ComponentTwoP) => {
  

  const filteredArray = React.useMemo(() => {
    return array
    .filter((entry) => "props" in entry)
    .map((entry, id) => {
      return { type : entry.type, key : id, props : entry.props } as ComponentDataT
    })
  }, [array])
  return (
    <NGLStage {...stageProps} >
      {filteredArray.map((entry) => <ComponentSwitch {...entry} />)}
    </NGLStage>
  );  
}

