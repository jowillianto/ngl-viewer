import React from 'react'
import BaseShape, { ExtendedShapeProps } from './base-shape'
import * as NGL from 'ngl'
import {randomString} from '../utils/utils'

export type NGLOctahedronProps = ExtendedShapeProps<{
  position      : NGL.Vector3 | [number, number, number]
  depthAxis     : NGL.Vector3 | [number, number, number]
  heightAxis    : NGL.Vector3 | [number, number, number]
  color         : [number, number, number] | NGL.Color
  size          : number
}>

export default class NGLOctahedron extends React.Component<NGLOctahedronProps>{
  randomName  : string
  constructor(props : NGLOctahedronProps){
    super(props)
    this.randomName   = randomString(10)
  }
  addOctahedron = (shape : NGL.Shape) : NGL.Shape => {
    const {position, color, size, heightAxis, depthAxis} = this.props
    const name      = this.props.name ? this.props.name : this.randomName
    return shape.addOctahedron(
      position, color, size, heightAxis, depthAxis, name
    )
  }
  hashProps() : string{
    // Very slow hash, change later
    return JSON.stringify(this.props)
  }
  render(): React.ReactNode {
    return (
      <BaseShape 
        addShape      = {this.addOctahedron}
        viewSettings  = {this.props.viewSettings}
        shapeParams   = {this.props.shapeParams}
        hash          = {this.hashProps()}
      />
    )
  }
}