import React from "react";
import * as NGL from "ngl";

type StageContextT<Nullable extends boolean> = {
  stage: Nullable extends true ? NGL.Stage | null : NGL.Stage;
  version: number;
  setStage: React.Dispatch<React.SetStateAction<NGL.Stage | null>>;
  updateVersion: () => void;
};

const StageContext = React.createContext<StageContextT<true>>({
  stage: null,
  setStage: () => {},
  version: 0,
  updateVersion: () => {},
});

export function useStage(): StageContextT<false> {
  const { stage, ...ctx } = React.useContext(StageContext);
  if (stage === null) {
    console.error(
      "add a ViewerStage component into the child of ProteinViewer"
    );
    throw Error("Add a viewer stage component into the child of ProteinViewer");
  }
  return {
    stage,
    ...ctx,
  };
}

export default StageContext;
