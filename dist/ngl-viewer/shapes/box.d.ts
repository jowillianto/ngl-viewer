/// <reference types="react" />
import { ExtendedShapeProps } from "./base-shape";
import * as NGL from "ngl";
export type NGLBoxProps = ExtendedShapeProps<{
    name?: string;
    position: NGL.Vector3 | [number, number, number];
    color: [number, number, number] | NGL.Color;
    size: number;
    heightAxis: NGL.Vector3 | [number, number, number];
    depthAxis: NGL.Vector3 | [number, number, number];
}>;
export default function NGLBox({ name, position, color, size, heightAxis, depthAxis, shapeParams, viewSettings, }: NGLBoxProps): JSX.Element;
