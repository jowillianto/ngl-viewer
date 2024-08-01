import React from "react";
import * as NGL from "ngl";
import StageContext from "./stage-context";

export type NGLStageProps = React.PropsWithChildren<{
  height: string;
  width: string;
  className?: string;
  viewSettings?: ConstructorParameters<typeof NGL.Stage>[1];
}>;

export type NGLStageState = {
  stage: NGL.Stage | null;
  isSpinning: boolean; // New state
  isRocking: boolean; // New state
  projectionType: "perspective" | "orthographic" | "stereo";
  theme: "light" | "dark";
};

export default class NGLStage extends React.Component<NGLStageProps> {
  static contextType = StageContext;
  context!: React.ContextType<typeof StageContext>;
  stageRef: React.RefObject<HTMLDivElement>;
  observer: ResizeObserver | undefined;
  constructor(props: NGLStageProps) {
    super(props);
    this.stageRef = React.createRef();
  }
  componentDidMount() {
    const htmlElm = this.stageRef.current;
    if (htmlElm) {
      const stage = new NGL.Stage(htmlElm, this.props.viewSettings);
      this.context.setStage(stage);
      this.addObserver();
    }
  }
  addObserver() {
    if (this.stageRef.current) {
      this.observer = new ResizeObserver(this.resizeStage);
      this.observer.observe(this.stageRef.current);
    }
  }
  resizeStage = () => {
    this.context.stage?.handleResize();
  };
  componentWillUnmount() {
    this.context.stage?.dispose();
    this.observer?.disconnect();
  }
  render(): React.ReactNode {
    const { height, width, className = "" } = this.props;
    const style = { height: height, width: width };
    return (
      <div
        className={`ngl-viewer-canvas ${className}`}
        ref={this.stageRef}
        style={style}
      />
    );
  }
}
