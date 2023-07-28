import React from 'react';
import { ExtendedShapeProps } from './base-shape';
import * as NGL from 'ngl';
export type NGLBoxProps = ExtendedShapeProps<{
    position: NGL.Vector3 | [number, number, number];
    color: [number, number, number] | NGL.Color;
    size: number;
    heightAxis: NGL.Vector3 | [number, number, number];
    depthAxis: NGL.Vector3 | [number, number, number];
}>;
export default class NGLBox extends React.Component<NGLBoxProps> {
    randomName: string;
    constructor(props: NGLBoxProps);
    addBox: (shape: NGL.Shape) => NGL.Shape;
    hashProps(): string;
    render(): React.ReactNode;
}
