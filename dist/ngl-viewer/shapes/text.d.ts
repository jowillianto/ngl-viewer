/// <reference types="react" />
import { ExtendedShapeProps } from './base-shape';
import * as NGL from 'ngl';
export type NGLTextProps = ExtendedShapeProps<{
    position: NGL.Vector3 | [number, number, number];
    text: string;
    size: number;
    color: [number, number, number] | NGL.Color;
}>;
export default function NGLText({ position, text, size, color, viewSettings, shapeParams }: NGLTextProps): JSX.Element;
