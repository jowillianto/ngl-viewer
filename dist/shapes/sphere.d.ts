import React from 'react';
import { ExtendedShapeProps } from './base-shape';
import * as NGL from 'ngl';
export type NGLSphereProps = ExtendedShapeProps<{
    position: NGL.Vector3 | [number, number, number];
    color: [number, number, number] | NGL.Color;
    radius: number;
}>;
export default class NGLSphere extends React.Component<NGLSphereProps> {
    randomName: string;
    constructor(props: NGLSphereProps);
    addSphere: (shape: NGL.Shape) => NGL.Shape;
    hashProps(): string;
    render(): React.ReactNode;
}
