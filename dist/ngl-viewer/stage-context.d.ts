import React from "react";
import * as NGL from "ngl";
export declare class VersionedStage {
    stage: NGL.Stage;
    version: number;
    constructor(stage: NGL.Stage, version?: number);
    update(): VersionedStage;
}
type StageContextT = {
    stage: VersionedStage | null;
    setStage: React.Dispatch<React.SetStateAction<VersionedStage | null>>;
    updateStage: () => void;
};
declare const StageContext: React.Context<StageContextT>;
export declare function useStage(): NGL.Stage | null;
export declare function useStageWithVersion(): VersionedStage | null;
export default StageContext;
