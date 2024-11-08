/// <reference types="react" />
import { ExtendedShapeProps } from "./base-shape";
import * as NGL from "ngl";
export type NGLTorusProps = ExtendedShapeProps<{
    position: NGL.Vector3 | [number, number, number];
    majorAxis: NGL.Vector3 | [number, number, number];
    minorAxis: NGL.Vector3 | [number, number, number];
    color: [number, number, number] | NGL.Color;
    radius: number;
}>;
export default function NGLEllipsoid({ position, majorAxis, minorAxis, color, radius, viewSettings, shapeParams, name, autoViewTimeout, }: NGLTorusProps): JSX.Element;
