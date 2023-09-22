import NGLRenderer  from './ngl-renderer'
import GenericRenderer from './generic-renderer'
import { NGLStageProps } from '../stage'

import { ThemeContext } from './../../themeContext';
import React, { useContext } from 'react';

const ViewerStage = (props : NGLStageProps) => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ViewerStage must be used within a ThemeProvider");
  }
  
  return (
    <GenericRenderer 
      render = {NGLRenderer}
      props = {props}
    />
  )
}

export default ViewerStage