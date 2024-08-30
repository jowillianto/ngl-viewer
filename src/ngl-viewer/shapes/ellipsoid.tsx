import React from 'react'
import { ExtendedShapeProps, useComponentFromObject } from './base-shape'
import * as NGL from 'ngl'
import {randomString} from '../utils/utils'

export type NGLEllipsoidProps = ExtendedShapeProps<{
  position      : NGL.Vector3 | [number, number, number]
  majorAxis     : NGL.Vector3 | [number, number, number]
  minorAxis     : NGL.Vector3 | [number, number, number]
  color         : [number, number, number] | NGL.Color
  radius        : number,
}>

export default function NGLEllipsoid({
  position, majorAxis, minorAxis, color, radius, viewSettings, shapeParams, name
} : NGLEllipsoidProps) {
  const shapeCreator = React.useMemo(
    () =>
      new NGL.Shape(undefined, shapeParams).addEllipsoid(
        position, 
        color, 
        radius,
        majorAxis, 
        minorAxis,
        name === undefined ? randomString(10) : name
      ),
    [position, majorAxis, minorAxis, color, radius, name, shapeParams]
  );
  useComponentFromObject(shapeCreator, viewSettings);
  return <></>
}
