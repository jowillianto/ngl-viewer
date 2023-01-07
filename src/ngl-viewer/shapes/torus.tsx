import React from 'react'
import BaseShape, { ExtendedShapeProps } from './base-shape'
import * as NGL from 'ngl'
import {randomString} from '../utils/utils'

interface NGLTorusProps extends ExtendedShapeProps{
  position      : NGL.Vector3 | [number, number, number]
  majorAxis     : NGL.Vector3 | [number, number, number]
  minorAxis     : NGL.Vector3 | [number, number, number]
  color         : [number, number, number] | NGL.Color
  radius        : number,
}

export default class NGLTorus extends React.Component<NGLTorusProps>{
  randomName  : string
  constructor(props : NGLTorusProps){
    super(props)
    this.randomName   = randomString(10)
  }
  addTorus = (shape : NGL.Shape) : NGL.Shape => {
    const {position, majorAxis, minorAxis, radius, color}   = this.props
    const name      = this.props.name ? this.props.name : this.randomName
    return shape.addTorus(
      position, color, radius, majorAxis, minorAxis, name
    )
  }
  hashProps() : string{
    // Very slow hash, change later
    return JSON.stringify(this.props)
  }
  render(): React.ReactNode {
    return (
      <BaseShape 
        addShape      = {this.addTorus}
        viewSettings  = {this.props.viewSettings}
        shapeParams   = {this.props.shapeParams}
        hash          = {this.hashProps()}
      />
    )
  }
}