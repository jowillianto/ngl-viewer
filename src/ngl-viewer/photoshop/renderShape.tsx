import React from 'react'
import { ComponentTwo } from './componentArray'
import ComponentPropsReader from './contextreader'
import { mockComponentsDataMap } from './componentData'
import { NGLStageProps } from './stage'

const RenderShapes = (props : NGLStageProps) => {
  return (
    <ComponentPropsReader 
      render = {ComponentTwo}  
      props = {props}
    />
  ) 
}

export default RenderShapes;
