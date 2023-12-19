import React from 'react';
import * as NGL from 'ngl';
import StageContext from '../stage-context';
import { StageLoadFileParams } from 'ngl/dist/declarations/stage/stage';
import { ViewSettings } from '../interfaces/interfaces';
export type NGLFileProps = React.PropsWithChildren & {
    file: Blob | string | null;
    viewSettings: ViewSettings;
    fileSettings?: Partial<StageLoadFileParams>;
    controls?: Object;
    chains?: string[];
};
export type NGLFileState = {
    showRepr: boolean;
    component: NGL.StructureComponent | null;
    update: boolean;
};
export default class NGLFile extends React.Component<NGLFileProps, NGLFileState> {
    static contextType: React.Context<{
        stage: NGL.Stage | null;
        version: number;
        setStage: (stage: NGL.Stage) => void;
        updateVersion: () => void;
    }>;
    context: React.ContextType<typeof StageContext>;
    constructor(props: NGLFileProps);
    loadFileToStage(): void;
    compareState(nextState: Readonly<NGLFileState>): boolean;
    removeComponentIfExist(): void;
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: Readonly<NGLFileProps>, nextState: Readonly<NGLFileState>, nextContext: React.ContextType<typeof StageContext>): boolean;
    componentDidUpdate(prevProps: NGLFileProps, prevState: NGLFileState): void;
    componentWillUnmount(): void;
    render(): React.ReactNode;
}
