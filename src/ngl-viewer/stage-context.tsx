import React from "react";
import * as NGL from "ngl";

type StageContextT = {
  stage: NGL.Stage | null;
  setStage: React.Dispatch<React.SetStateAction<NGL.Stage | null>>;
};

const StageContext = React.createContext<StageContextT>({
  stage: null,
  setStage: () => {},
});

export function useStage(): NGL.Stage | null {
  const { stage } = React.useContext(StageContext);
  if (stage === null) return null;
  return stage;
}

export default StageContext;
