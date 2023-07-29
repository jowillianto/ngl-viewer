import React from 'react';
import { ExtendedShapeProps } from './base-shape';
import * as NGL from 'ngl';
export type NGLTetrahedronProps = ExtendedShapeProps<{
    position: NGL.Vector3 | [number, number, number];
    depthAxis: NGL.Vector3 | [number, number, number];
    heightAxis: NGL.Vector3 | [number, number, number];
    color: [number, number, number] | NGL.Color;
    size: number;
}>;
export default class NGLTetrahedron extends React.Component<NGLTetrahedronProps> {
    randomName: string;
    constructor(props: NGLTetrahedronProps);
    addTetrahedron: (shape: NGL.Shape) => NGL.Shape;
    hashProps(): string;
    render(): React.ReactNode;
}
