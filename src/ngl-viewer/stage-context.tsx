import React from "react";
import * as NGL from "ngl";

export class VersionedStage {
  stage: NGL.Stage;
  version: number;
  constructor(stage: NGL.Stage, version: number = 0) {
    this.stage = stage;
    this.version = version;
  }
  update(): VersionedStage {
    if (this.version < 90000)
      return new VersionedStage(this.stage, this.version + 1);
    else return new VersionedStage(this.stage, 0);
  }
}

type StageContextT = {
  stage: VersionedStage | null;
  setStage: React.Dispatch<React.SetStateAction<VersionedStage | null>>;
  updateStage: () => void
};

const StageContext = React.createContext<StageContextT>({
  stage: null,
  setStage: () => {},
  updateStage: () => {}
});

export function useStage(): NGL.Stage | null {
  const { stage } = React.useContext(StageContext);
  if (stage === null) return null;
  return stage.stage;
}

export function useStageWithVersion(): VersionedStage | null {
  const { stage } = React.useContext(StageContext);
  if (stage === null) return null;
  return stage;
}

export default StageContext;
