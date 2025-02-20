import React from "react";
import { StageLoadFileParams } from "ngl/dist/declarations/stage/stage";
import { StructureViewSettings } from "../interfaces/interfaces";
export type NGLFileProps = {
    file: File | string | Blob;
    viewSettings: StructureViewSettings;
    fileSettings?: Partial<StageLoadFileParams>;
    chains?: string[];
    autoViewTimeout?: number;
};
declare const NGLFile: React.FC<NGLFileProps>;
export default NGLFile;
