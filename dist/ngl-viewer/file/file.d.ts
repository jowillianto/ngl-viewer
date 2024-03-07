import React from "react";
import { StageLoadFileParams } from "ngl/dist/declarations/stage/stage";
import { ViewSettings } from "../interfaces/interfaces";
export type NGLFileProps = React.PropsWithChildren & {
    file: File | string | Blob | null;
    viewSettings: ViewSettings;
    fileSettings?: Partial<StageLoadFileParams>;
    chains?: string[];
};
declare const NGLFile: React.FC<NGLFileProps>;
export default NGLFile;
