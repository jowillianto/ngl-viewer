import React from 'react';
import { ExtendedShapeProps } from './base-shape';
import * as NGL from 'ngl';
export type NGLEllipsoidProps = ExtendedShapeProps<{
    position: NGL.Vector3 | [number, number, number];
    majorAxis: NGL.Vector3 | [number, number, number];
    minorAxis: NGL.Vector3 | [number, number, number];
    color: [number, number, number] | NGL.Color;
    radius: number;
}>;
export default class NGLEllipsoid extends React.Component<NGLEllipsoidProps> {
    randomName: string;
    constructor(props: NGLEllipsoidProps);
    addEllipsoid: (shape: NGL.Shape) => NGL.Shape;
    hashProps(): string;
    render(): React.ReactNode;
}
