import React from 'react';
import { ExtendedShapeProps } from './base-shape';
import * as NGL from 'ngl';
export type NGLTextProps = ExtendedShapeProps<{
    position: NGL.Vector3 | [number, number, number];
    text: string;
    size: number;
    color: [number, number, number] | NGL.Color;
}>;
export default class NGLText extends React.Component<NGLTextProps> {
    addText: (shape: NGL.Shape) => NGL.Shape;
    hashProps(): string;
    render(): React.ReactNode;
}
