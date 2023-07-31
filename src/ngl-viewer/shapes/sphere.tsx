import React from 'react'
import BaseShape, { ExtendedShapeProps } from './base-shape'
import * as NGL from 'ngl'
import {randomString} from '../utils/utils'

export type NGLSphereProps = ExtendedShapeProps<{
  position      : NGL.Vector3 | [number, number, number]
  color         : [number, number, number] | NGL.Color
  radius        : number,
}>

export default class NGLSphere extends React.Component<NGLSphereProps>{
  randomName  : string
  constructor(props : NGLSphereProps){
    super(props)
    this.randomName   = randomString(10)
  }
  addSphere = (shape : NGL.Shape) : NGL.Shape => {
    const position  = this.props.position
    const color     = this.props.color
    const radius    = this.props.radius
    const name      = this.props.name ? this.props.name : this.randomName
    return shape.addSphere(position, color, radius, name)
  }
  hashProps() : string{
    // Very slow hash, change later
    return JSON.stringify(this.props)
  }
  render(): React.ReactNode {
    return (
      <BaseShape 
        addShape      = {this.addSphere}
        viewSettings  = {this.props.viewSettings}
        shapeParams   = {this.props.shapeParams}
        hash          = {this.hashProps()}
      />
    )
  }
}