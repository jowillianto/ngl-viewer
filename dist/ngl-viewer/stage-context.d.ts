import React from 'react';
import * as NGL from 'ngl';
declare const StageContext: React.Context<{
    stage: NGL.Stage | null;
    version: number;
    setStage: (stage: NGL.Stage) => void;
    updateVersion: () => void;
}>;
export default StageContext;
