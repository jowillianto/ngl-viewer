import React from 'react';
import { ExtendedShapeProps } from './base-shape';
import * as NGL from 'ngl';
export type NGLArrowProps = ExtendedShapeProps<{
    position1: NGL.Vector3 | [number, number, number];
    position2: NGL.Vector3 | [number, number, number];
    color: NGL.Color | [number, number, number];
    radius: number;
}>;
export default class NGLArrow extends React.Component<NGLArrowProps> {
    randomName: string;
    constructor(props: NGLArrowProps);
    addArrow: (shape: NGL.Shape) => NGL.Shape;
    hashProps(): string;
    render(): React.ReactNode;
}
