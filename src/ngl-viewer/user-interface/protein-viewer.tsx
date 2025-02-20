import React, { useState } from "react";
import StageContext, { VersionedStage } from "../stage-context";

const ProteinViewer = ({ children }: React.PropsWithChildren) => {
  const [stage, setStage] = useState<VersionedStage | null>(null);
  const updateStage = React.useCallback(() => {
    setStage((prevStage) => {
      if (prevStage === null) return null;
      return prevStage.update();
    });
  }, []);
  const stageContext = React.useMemo<
    React.ContextType<typeof StageContext>
  >(() => {
    return { stage, setStage, updateStage };
  }, [stage, setStage, updateStage]);
  return (
    <StageContext.Provider value={stageContext}>
      {children}
    </StageContext.Provider>
  );
};

export default ProteinViewer;
