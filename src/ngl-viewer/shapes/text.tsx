import React from 'react'
import BaseShape, { ExtendedShapeProps, useComponentFromObject } from './base-shape'
import * as NGL from 'ngl'

export type NGLTextProps = ExtendedShapeProps<{
  position      : NGL.Vector3 | [number, number, number]
  text          : string
  size          : number
  color         : [number, number, number] | NGL.Color
}>

export default function NGLText({
  position, text, size, color, viewSettings, shapeParams
} : NGLTextProps) {
  const shapeCreator = React.useMemo(() => {
    return new NGL.Shape(undefined, shapeParams).addText(
      position,
      color,
      size,
      text
    );
  }, [position, color, size,text, shapeParams]);
  useComponentFromObject(shapeCreator, viewSettings);
  return <></>
}