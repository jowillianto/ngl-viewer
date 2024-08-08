import React from 'react'
import BaseShape, { ExtendedShapeProps } from './base-shape'
import * as NGL from 'ngl'
import {randomString} from '../utils/utils'

export type NGLCylinderProps = ExtendedShapeProps<{
  position1     : NGL.Vector3 | [number, number, number]
  position2     : NGL.Vector3 | [number, number, number]
  color         : [number, number, number] | NGL.Color
  radius        : number,
}>

export default class NGLCylinder extends React.Component<NGLCylinderProps>{
  randomName  : string
  constructor(props : NGLCylinderProps){
    super(props)
    this.randomName   = randomString(10)
  }
  addCylinder = (shape : NGL.Shape) : NGL.Shape => {
    const {position1, position2, color, radius}   = this.props
    const name      = this.props.name ? this.props.name : this.randomName
    return shape.addCylinder(position1, position2, color, radius, name)
  }
  hashProps() : string{
    // Very slow hash, change later
    return JSON.stringify(this.props)
  }
  render(): React.ReactNode {
    return (
      <BaseShape 
        addShape      = {this.addCylinder}
        viewSettings  = {this.props.viewSettings}
        shapeParams   = {this.props.shapeParams}
        
      />
    )
  }
}