import React from 'react';
import { ComponentDataT, ComponentUIDataT } from './component-data';
import ComponentSwitch from './component-switch';
import NGLStage, { NGLStageProps } from '../stage';

type NGLRenderererP = NGLStageProps & {
  components : ComponentUIDataT[]
}

const NGLRenderer = ({ components, ...stageProps} : NGLRenderererP) => {
  const filteredComponents = React.useMemo(() => {
    return components
      .filter((entry) => "props" in entry)
      .map((entry, id) => {
        const props =  {
          type : entry.type, key : id, props : entry.props
        } as ComponentDataT
        return <ComponentSwitch {...props} />
      })
  }, [components])
  return (
    <NGLStage {...stageProps}>
      {filteredComponents}
    </NGLStage>
  )
}

export default NGLRenderer
