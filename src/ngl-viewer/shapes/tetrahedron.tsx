import React from 'react'
import { ExtendedShapeProps, useComponentFromObject } from './base-shape'
import * as NGL from 'ngl'
import {randomString} from '../utils/utils'

export type NGLTetrahedronProps = ExtendedShapeProps<{
  position      : NGL.Vector3 | [number, number, number]
  depthAxis     : NGL.Vector3 | [number, number, number]
  heightAxis    : NGL.Vector3 | [number, number, number]
  color         : [number, number, number] | NGL.Color
  size          : number
}>

export default function NGLTetrahedron({
  name,
  position,
  color,
  size,
  heightAxis,
  depthAxis,
  shapeParams,
  viewSettings,
}: NGLTetrahedronProps) {
  const shapeCreator = React.useMemo(() => {
    return new NGL.Shape(undefined, shapeParams).addTetrahedron(
      position,
      color,
      size,
      heightAxis,
      depthAxis,
      name === undefined ? randomString(10) : name
    );
  }, [name, position, color, size, heightAxis, depthAxis, shapeParams]);
  useComponentFromObject(shapeCreator, viewSettings);
  return <></>
}
