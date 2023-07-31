import React from 'react';
import { ExtendedShapeProps } from './base-shape';
import * as NGL from 'ngl';
export type NGLOctahedronProps = ExtendedShapeProps<{
    position: NGL.Vector3 | [number, number, number];
    depthAxis: NGL.Vector3 | [number, number, number];
    heightAxis: NGL.Vector3 | [number, number, number];
    color: [number, number, number] | NGL.Color;
    size: number;
}>;
export default class NGLOctahedron extends React.Component<NGLOctahedronProps> {
    randomName: string;
    constructor(props: NGLOctahedronProps);
    addOctahedron: (shape: NGL.Shape) => NGL.Shape;
    hashProps(): string;
    render(): React.ReactNode;
}
