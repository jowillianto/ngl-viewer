import React from 'react'
import BaseShape, { ExtendedShapeProps } from './base-shape'
import * as NGL from 'ngl'
import {randomString} from '../utils/utils'

export type NGLArrowProps = ExtendedShapeProps<{
  position1   : NGL.Vector3 | [number, number, number]
  position2   : NGL.Vector3 | [number, number, number]
  color       : NGL.Color | [number, number, number]
  radius      : number
}>

export default class NGLArrow extends React.Component<NGLArrowProps>{
  randomName  : string
  constructor(props : NGLArrowProps){
    super(props)
    this.randomName   = randomString(10)
  }
  addArrow = (shape : NGL.Shape) : NGL.Shape => {
    const {position1, position2, color, radius} = this.props
    const name  = this.props.name ? this.props.name : this.randomName
    return shape.addArrow(
      position1, position2, color, radius, name
    )
  }
  hashProps() : string{
    // Very slow hash, change later
    return JSON.stringify(this.props)
  }
  render(): React.ReactNode {
    return (
      <BaseShape 
        addShape      = {this.addArrow}
        viewSettings  = {this.props.viewSettings}
        shapeParams   = {this.props.shapeParams}
        
      />
    )
  }
}