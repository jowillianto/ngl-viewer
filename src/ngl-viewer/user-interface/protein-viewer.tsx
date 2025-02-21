import React, { useState } from "react";
import StageContext from "../stage-context";
import * as NGL from "ngl";

const ProteinViewer = ({ children }: React.PropsWithChildren) => {
  const [stage, setStage] = useState<NGL.Stage | null>(null);
  const ctx = React.useMemo<React.ContextType<typeof StageContext>>(() => {
    return { stage, setStage };
  }, [stage, setStage]);
  return <StageContext.Provider value={ctx}>{children}</StageContext.Provider>;
};

export default ProteinViewer;
