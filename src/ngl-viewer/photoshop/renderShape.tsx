import React from 'react'
import { ComponentTwo } from './componentArray'
import ComponentPropsReader from './contextreader'
import { mockComponentsDataMap } from './componentData'
import { NGLStageProps } from './stage'
import { PhotoshopPanel } from './photoshopPanel'

const PhotoshopStage = (props : NGLStageProps) => {
  return (
    <div className='shape-render'>
      <ComponentPropsReader 
        render = {ComponentTwo}  
        props = {props}
      />
    </div>
    
  ) 
}

export default PhotoshopStage;
