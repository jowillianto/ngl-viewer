/// <reference types="react" />
import { ExtendedShapeProps } from "./base-shape";
import * as NGL from "ngl";
export type NGLArrowProps = ExtendedShapeProps<{
    position1: NGL.Vector3 | [number, number, number];
    position2: NGL.Vector3 | [number, number, number];
    color: NGL.Color | [number, number, number];
    radius: number;
}>;
export default function NGLArrow({ position1, position2, color, radius, name, viewSettings, shapeParams, }: NGLArrowProps): JSX.Element;
