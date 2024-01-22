import * as NGL from 'ngl';
import { ShapeParameters } from 'ngl/dist/declarations/geometry/shape';
import React from 'react';
import { ViewSettings } from '../interfaces/interfaces';
import StageContext from '../stage-context';
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
export default class BaseShape extends React.Component<BaseShapeProps, BaseShapeState> {
    static contextType: React.Context<{
        stage: NGL.Stage | null;
        version: number;
        setStage: (stage: NGL.Stage) => void;
        updateVersion: () => void;
    }>;
    context: React.ContextType<typeof StageContext>;
    constructor(props: BaseShapeProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: BaseShapeProps, prevState: BaseShapeState): void;
    shouldComponentUpdate(nextProps: Readonly<BaseShapeProps>, nextState: Readonly<BaseShapeState>, nextContext: React.ContextType<typeof StageContext>): boolean;
    addShapeFromProps(): void;
    removeComponentIfExist(): void;
    removeShape(): void;
    componentWillUnmount(): void;
    render(): React.ReactNode;
}
