import React from 'react'
import BaseShape, { ExtendedShapeProps } from './base-shape'
import * as NGL from 'ngl'
import {randomString} from '../utils/utils'

interface NGLBoxProps extends ExtendedShapeProps{
  position  : NGL.Vector3 | [number, number, number]
  color     : [number, number, number] | NGL.Color
  size      : number
  heightAxis: NGL.Vector3 | [number, number, number]
  depthAxis : NGL.Vector3 | [number, number, number]
}

export default class NGLBox extends React.Component<NGLBoxProps>{
  randomName  : string
  constructor(props : NGLBoxProps){
    super(props)
    this.randomName   = randomString(10)
  }
  addBox = (shape : NGL.Shape) : NGL.Shape => {
    const {position, color, size, heightAxis, depthAxis} = this.props
    const name = this.props.name ? this.props.name : this.randomName
    return shape.addBox(position, color, size, heightAxis, depthAxis, name)
  }
  hashProps(): string{
    return JSON.stringify(this.props)
  }
  render(): React.ReactNode {
    return(
      <BaseShape 
        addShape      = {this.addBox}
        viewSettings  = {this.props.viewSettings}
        shapeParams   = {this.props.shapeParams}
        hash          = {this.hashProps()}
      />
    )
  }
}