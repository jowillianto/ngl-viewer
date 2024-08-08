import React from 'react'
import BaseShape, { ExtendedShapeProps } from './base-shape'
import * as NGL from 'ngl'

export type NGLTextProps = ExtendedShapeProps<{
  position      : NGL.Vector3 | [number, number, number]
  text          : string
  size          : number
  color         : [number, number, number] | NGL.Color
}>

export default class NGLText extends React.Component<NGLTextProps>{
  addText = (shape : NGL.Shape) : NGL.Shape => {
    const {position, text, size, color} = this.props
    return shape.addText(position, color, size, text)
  }
  hashProps() : string{
    // Very slow hash, change later
    return JSON.stringify(this.props)
  }
  render(): React.ReactNode {
    return (
      <BaseShape 
        addShape      = {this.addText}
        viewSettings  = {this.props.viewSettings}
        shapeParams   = {this.props.shapeParams}
        
      />
    )
  }
}