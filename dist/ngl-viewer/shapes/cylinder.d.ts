/// <reference types="react" />
import { ExtendedShapeProps } from './base-shape';
import * as NGL from 'ngl';
export type NGLCylinderProps = ExtendedShapeProps<{
    position1: NGL.Vector3 | [number, number, number];
    position2: NGL.Vector3 | [number, number, number];
    color: [number, number, number] | NGL.Color;
    radius: number;
}>;
export default function NGLCylinder({ position1, position2, color, radius, name, viewSettings, shapeParams, }: NGLCylinderProps): JSX.Element;
