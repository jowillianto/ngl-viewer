import React from 'react';
import * as NGL from 'ngl';
declare const StageContext: React.Context<{
    stage: NGL.Stage | null;
    setStage: (stage: NGL.Stage) => void;
}>;
export default StageContext;
