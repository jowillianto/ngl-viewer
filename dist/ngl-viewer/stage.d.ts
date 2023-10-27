import React from 'react';
import * as NGL from 'ngl';
import StageContext from './stage-context';
export type NGLStageProps = React.PropsWithChildren<{
    height: string;
    width: string;
    viewSettings?: ConstructorParameters<typeof NGL.Stage>[1];
}>;
export type NGLStageState = {
    stage: NGL.Stage | null;
    isSpinning: boolean;
    isRocking: boolean;
    projectionType: 'perspective' | 'orthographic' | 'stereo';
    theme: 'light' | 'dark';
};
export default class NGLStage extends React.Component<NGLStageProps> {
    static contextType: React.Context<{
        stage: NGL.Stage | null;
        setStage: (stage: NGL.Stage) => void;
    }>;
    context: React.ContextType<typeof StageContext>;
    stageRef: React.RefObject<HTMLDivElement>;
    observer: ResizeObserver | undefined;
    constructor(props: NGLStageProps);
    componentDidMount(): void;
    addObserver(): void;
    resizeStage: () => void;
    componentWillUnmount(): void;
    render(): React.ReactNode;
}
