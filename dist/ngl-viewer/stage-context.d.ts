import React from "react";
import * as NGL from "ngl";
type StageContextT = {
    stage: NGL.Stage | null;
    setStage: React.Dispatch<React.SetStateAction<NGL.Stage | null>>;
};
declare const StageContext: React.Context<StageContextT>;
export declare function useStage(): NGL.Stage | null;
export default StageContext;
