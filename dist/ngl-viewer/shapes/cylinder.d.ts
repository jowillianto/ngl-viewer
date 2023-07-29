import React from 'react';
import { ExtendedShapeProps } from './base-shape';
import * as NGL from 'ngl';
export type NGLCylinderProps = ExtendedShapeProps<{
    position1: NGL.Vector3 | [number, number, number];
    position2: NGL.Vector3 | [number, number, number];
    color: [number, number, number] | NGL.Color;
    radius: number;
}>;
export default class NGLCylinder extends React.Component<NGLCylinderProps> {
    randomName: string;
    constructor(props: NGLCylinderProps);
    addCylinder: (shape: NGL.Shape) => NGL.Shape;
    hashProps(): string;
    render(): React.ReactNode;
}
