/// <reference types="react" />
import { ExtendedShapeProps } from './base-shape';
import * as NGL from 'ngl';
export type NGLOctahedronProps = ExtendedShapeProps<{
    position: NGL.Vector3 | [number, number, number];
    depthAxis: NGL.Vector3 | [number, number, number];
    heightAxis: NGL.Vector3 | [number, number, number];
    color: [number, number, number] | NGL.Color;
    size: number;
}>;
export default function NGLOctahedron({ name, position, color, size, heightAxis, depthAxis, shapeParams, viewSettings, }: NGLOctahedronProps): JSX.Element;
