import React from 'react';
import { ShapeParameters } from 'ngl/dist/declarations/geometry/shape';
import * as NGL from 'ngl';
import { ViewSettings } from '../interfaces/interfaces';
export type BasicShapeProps<T = {}> = {
    viewSettings: ViewSettings;
    shapeParams?: Partial<ShapeParameters>;
} & T;
export type ExtendedShapeProps<T = {}> = BasicShapeProps<{
    name?: string;
} & T>;
export type BaseShapeProps = BasicShapeProps<{
    addShape: (shape: NGL.Shape) => NGL.Shape;
    hash: any;
}>;
export type BaseShapeState = {
    component: NGL.Component | null;
};
declare const BaseShape: React.FC<BaseShapeProps>;
export default BaseShape;
