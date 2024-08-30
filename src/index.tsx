import ProteinViewer from "./ngl-viewer/user-interface/protein-viewer";
import ViewerPanel from "./ngl-viewer/user-interface/viewer-panel";
import ViewerStage from "./ngl-viewer/user-interface/viewer-stage";
import ViewerSelector from "./ngl-viewer/user-interface/component-selector";
import { useStage } from "ngl-viewer/stage-context";
import { useComponentFromObject } from "ngl-viewer/shapes/base-shape";
import useComponent from "ngl-viewer/shapes/base-shape";

export {
  ViewerPanel,
  ViewerStage,
  ViewerSelector,
  useStage,
  useComponent,
  useComponentFromObject,
};

export default ProteinViewer;
