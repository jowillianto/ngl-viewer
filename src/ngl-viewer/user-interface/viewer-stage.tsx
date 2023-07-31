import NGLRenderer  from './ngl-renderer'
import GenericRenderer from './generic-renderer'
import { NGLStageProps } from 'ngl-viewer/stage'

const ViewerStage = (props : NGLStageProps) => {
  return (
    <GenericRenderer 
      render = {NGLRenderer}
      props = {props}
    />
  )
}

export default ViewerStage