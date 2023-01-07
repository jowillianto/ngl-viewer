import React from 'react'
import BaseShape, { ExtendedShapeProps } from './base-shape'
import * as NGL from 'ngl'
import {randomString} from '../utils/utils'

interface NGLEllipsoidProps extends ExtendedShapeProps{
  position      : NGL.Vector3 | [number, number, number]
  majorAxis     : NGL.Vector3 | [number, number, number]
  minorAxis     : NGL.Vector3 | [number, number, number]
  color         : [number, number, number] | NGL.Color
  radius        : number,
}

export default class NGLEllipsoid extends React.Component<NGLEllipsoidProps>{
  randomName  : string
  constructor(props : NGLEllipsoidProps){
    super(props)
    this.randomName   = randomString(10)
  }
  addEllipsoid = (shape : NGL.Shape) : NGL.Shape => {
    const {position, majorAxis, minorAxis, radius, color}   = this.props
    const name      = this.props.name ? this.props.name : this.randomName
    return shape.addEllipsoid(
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
        addShape      = {this.addEllipsoid}
        viewSettings  = {this.props.viewSettings}
        shapeParams   = {this.props.shapeParams}
        hash          = {this.hashProps()}
      />
    )
  }
}