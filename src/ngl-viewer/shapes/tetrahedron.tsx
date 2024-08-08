import React from 'react'
import BaseShape, { ExtendedShapeProps } from './base-shape'
import * as NGL from 'ngl'
import {randomString} from '../utils/utils'

export type NGLTetrahedronProps = ExtendedShapeProps<{
  position      : NGL.Vector3 | [number, number, number]
  depthAxis     : NGL.Vector3 | [number, number, number]
  heightAxis    : NGL.Vector3 | [number, number, number]
  color         : [number, number, number] | NGL.Color
  size          : number
}>

export default class NGLTetrahedron extends React.Component<NGLTetrahedronProps>{
  randomName  : string
  constructor(props : NGLTetrahedronProps){
    super(props)
    this.randomName   = randomString(10)
  }
  addTetrahedron = (shape : NGL.Shape) : NGL.Shape => {
    const {position, color, size, heightAxis, depthAxis} = this.props
    const name      = this.props.name ? this.props.name : this.randomName
    return shape.addTetrahedron(
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
        addShape      = {this.addTetrahedron}
        viewSettings  = {this.props.viewSettings}
        shapeParams   = {this.props.shapeParams}
        
      />
    )
  }
}