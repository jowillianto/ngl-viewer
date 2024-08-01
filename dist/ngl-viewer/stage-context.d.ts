import React from "react";
import * as NGL from "ngl";
type StageContextT<Nullable extends boolean> = {
    stage: Nullable extends true ? NGL.Stage | null : NGL.Stage;
    version: number;
    setStage: React.Dispatch<React.SetStateAction<NGL.Stage | null>>;
    updateVersion: () => void;
};
declare const StageContext: React.Context<StageContextT<true>>;
export declare function useStage(): StageContextT<false>;
export default StageContext;
