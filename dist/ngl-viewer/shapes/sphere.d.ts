/// <reference types="react" />
import { ExtendedShapeProps } from './base-shape';
import * as NGL from 'ngl';
export type NGLSphereProps = ExtendedShapeProps<{
    position: NGL.Vector3 | [number, number, number];
    color: [number, number, number] | NGL.Color;
    radius: number;
}>;
export default function NGLSphere({ name, position, color, radius, shapeParams, viewSettings, }: NGLSphereProps): JSX.Element;
