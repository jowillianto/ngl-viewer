import React from 'react';
import { ExtendedShapeProps } from './base-shape';
import * as NGL from 'ngl';
export type NGLConeProps = ExtendedShapeProps<{
    position1: NGL.Vector3 | [number, number, number];
    position2: NGL.Vector3 | [number, number, number];
    color: NGL.Color | [number, number, number];
    radius: number;
}>;
export default class NGLCone extends React.Component<NGLConeProps> {
    randomName: string;
    constructor(props: NGLConeProps);
    addSphere: (shape: NGL.Shape) => NGL.Shape;
    hashProps(): string;
    render(): React.ReactNode;
}
