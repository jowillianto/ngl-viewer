import React from "react";
import * as NGL from "ngl";
import StageContext, { VersionedStage } from "./stage-context";

function hexToRgb(hex: string): [number, number, number] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
}

function abs(v: number) {
  return v > 0 ? v : -v;
}

function absColor(color: NGL.Color): NGL.Color {
  return new NGL.Color(abs(color.r), abs(color.g), abs(color.b));
}

export type NGLStageProps = {
  viewSettings?: ConstructorParameters<typeof NGL.Stage>[1];
  showAxes?: boolean;
  axesConfig?: {
    colorX?: string;
    colorY?: string;
    colorZ?: string;
  };
  containerClassName?: string;
  containerStyles?: React.CSSProperties;
  axesClassName?: string;
  axesStyles?: React.CSSProperties;
  stageClassName?: string;
  stageStyles?: React.CSSProperties;
};

const miniStageStyle: React.CSSProperties = {
  height: "100px",
  width: "100px",
  position: "absolute",
  left: 0,
  bottom: 0,
  pointerEvents: "none",
};
const stageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
};

const stageZoom = 0.75;

export default function Stage({
  viewSettings,
  showAxes = true,
  axesConfig = {},
  containerClassName = "",
  containerStyles,
  axesClassName = "",
  axesStyles,
  stageClassName = "",
  stageStyles,
}: NGLStageProps) {
  const [miniStage, setMiniStage] = React.useState<NGL.Stage | null>(null);
  const { stage: versionedStage, setStage } = React.useContext(StageContext);
  const ref = React.useRef<HTMLDivElement>(null);
  const miniStageRef = React.useRef<HTMLDivElement>(null);
  const {
    colorX = "#FF0000",
    colorY = "#00FF00",
    colorZ = "#0000FF",
  } = axesConfig;
  const stage = React.useMemo(() => {
    if (versionedStage === null) return null;
    return versionedStage.stage;
  }, [versionedStage]);
  const updateMiniStageCamera = React.useCallback(() => {
    if (stage === null || miniStage === null) return;
    /**
     * rotate the ministage based on the larger stage
     */
    miniStage.viewerControls.rotate(stage.viewerControls.rotation);
  }, [stage, miniStage]);
  React.useEffect(() => {
    const curDiv = ref.current;
    if (curDiv === null) return;
    const stage = new NGL.Stage(curDiv, viewSettings);
    setStage(new VersionedStage(stage, 0));
    return () => {
      setStage(null);
      function disposeFunc() {
        if (stage.compList.length !== 0) setTimeout(disposeFunc, 50);
        else stage.dispose();
      }
      disposeFunc();
      curDiv.replaceChildren();
    };
  }, [setStage, viewSettings]);
  /**
   * This attaches a signal handler to the stage so that updates to the stage will be reflected on
   * the miniStage
   */
  React.useEffect(() => {
    // This thing is in JS
    if (stage === null || !showAxes) return;
    stage.viewerControls.signals.changed.add(updateMiniStageCamera);
    return () => {
      stage.viewerControls.signals.changed.remove(updateMiniStageCamera);
    };
  }, [stage, updateMiniStageCamera, showAxes]);
  React.useEffect(() => {
    if (stage === null || ref.current === null) return;
    const observer = new ResizeObserver(() => stage.handleResize());
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stage]);
  React.useEffect(() => {
    const curDiv = miniStageRef.current;
    if (curDiv === null || !showAxes) return;
    const stage = new NGL.Stage(curDiv, {
      backgroundColor: viewSettings?.backgroundColor,
    });
    setMiniStage(stage);
    stage.viewerControls.center([0, 0, 0]);
    stage.viewerControls.zoom(stageZoom);
    return () => {
      setMiniStage(null);
      stage.dispose();
      curDiv.replaceChildren();
    };
  }, [viewSettings?.backgroundColor, showAxes]);
  // console.log(miniStage === null ? "Lol" : miniStage.viewer.renderer.getClearColor())
  React.useEffect(() => {
    if (miniStage === null) return;
    const bgColor = miniStage.viewer.renderer.getClearColor(
      new NGL.Color(0, 0, 0)
    );
    // This inverts the background color, will not work if the background color is 128, 128, 128
    /**
     * Follows the following formula for inversion :
     * invert = 1 - original_color
     * To handle the 0.5 no effect problem :
     * invert = 1 - original_color + ||original_color - 0.5| - 0.5|
     */
    const invertBgColor = bgColor
      .clone()
      .multiplyScalar(-1)
      .addScalar(1)
      .add(
        absColor(
          absColor(bgColor.clone().sub(new NGL.Color(0.5, 0.5, 0.5))).sub(
            new NGL.Color(0.5, 0.5, 0.5)
          )
        )
      );

    /*
        Creates the axes. 
      */
    const shape = new NGL.Shape(undefined, {})
      .addArrow([0, 0, 0], [5, 0, 0], hexToRgb(colorX) || [255, 0, 0], 0.5, "X")
      .addArrow([0, 0, 0], [0, 5, 0], hexToRgb(colorY) || [0, 255, 0], 0.5, "Y")
      .addArrow([0, 0, 0], [0, 0, 5], hexToRgb(colorZ) || [0, 0, 255], 0.5, "Z")
      .addText([5, 0, 0], invertBgColor.clone(), 4, "X")
      .addText([0, 5, 0], invertBgColor.clone(), 4, "Y")
      .addText([0, 0, 5], invertBgColor.clone(), 4, "Z");
    const component = miniStage.addComponentFromObject(shape);
    component?.addRepresentation("buffer", { opacity: 1 });
  }, [miniStage, colorX, colorY, colorZ]);
  return (
    <div style={containerStyles} className={containerClassName}>
      <div
        ref={ref}
        style={{ ...stageStyle, ...stageStyles }}
        className={stageClassName}
      />
      <div
        ref={miniStageRef}
        style={{ ...miniStageStyle, ...axesStyles }}
        className={axesClassName}
      />
    </div>
  );
}
