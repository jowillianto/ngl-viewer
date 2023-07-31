import React from 'react';
import { ExtendedShapeProps } from './base-shape';
import * as NGL from 'ngl';
export type NGLTorusProps = ExtendedShapeProps<{
    position: NGL.Vector3 | [number, number, number];
    majorAxis: NGL.Vector3 | [number, number, number];
    minorAxis: NGL.Vector3 | [number, number, number];
    color: [number, number, number] | NGL.Color;
    radius: number;
}>;
export default class NGLTorus extends React.Component<NGLTorusProps> {
    randomName: string;
    constructor(props: NGLTorusProps);
    addTorus: (shape: NGL.Shape) => NGL.Shape;
    hashProps(): string;
    render(): React.ReactNode;
}
