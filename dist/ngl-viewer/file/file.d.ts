import React from 'react';
import * as NGL from 'ngl';
import { StageLoadFileParams } from 'ngl/dist/declarations/stage/stage';
import { ViewSettings } from '../interfaces/interfaces';
export type NGLFileProps = React.PropsWithChildren & {
    file: File | string | Blob | null;
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
declare const NGLFile: React.FC<NGLFileProps>;
export default NGLFile;
