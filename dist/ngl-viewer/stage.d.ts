import React from 'react';
import * as NGL from 'ngl';
export type NGLStageProps = React.PropsWithChildren<{
    height: string;
    width: string;
    viewSettings?: ConstructorParameters<typeof NGL.Stage>[1];
}>;
export type NGLStageState = {
    stage: NGL.Stage | null;
};
export declare const StageContext: React.Context<NGLStageState>;
export default class NGLStage extends React.Component<NGLStageProps, NGLStageState> {
    stageRef: React.RefObject<HTMLDivElement>;
    observer: ResizeObserver | undefined;
    constructor(props: NGLStageProps);
    componentDidMount(): void;
    addObserver(): void;
    resizeStage: () => void;
    componentWillUnmount(): void;
    render(): React.ReactNode;
}
