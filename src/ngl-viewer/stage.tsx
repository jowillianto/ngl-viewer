import React from "react";
import * as NGL from "ngl";
import StageContext from "./stage-context";

export type NGLStageProps = React.PropsWithChildren<{
  height?: string;
  width?: string;
  className?: string;
  viewSettings?: ConstructorParameters<typeof NGL.Stage>[1];
}>;
export default function Stage({
  height,
  width,
  className = "",
  viewSettings,
  children,
}: NGLStageProps) {
  const { stage, setStage } = React.useContext(StageContext);
  const ref = React.useRef<HTMLDivElement>(null);

  const containerStyle = React.useMemo(() => {
    if (height === undefined || width === undefined) return {};
    return { height, width };
  }, [height, width]);

  React.useEffect(() => {
    const curDiv = ref.current;
    if (curDiv === null) return;
    const stage = new NGL.Stage(curDiv, viewSettings)
    setStage(stage)
    return () => {
      setStage(null)
      function disposeFunc(){
        if (stage.compList.length !== 0)
          setTimeout(disposeFunc, 50)
        else
          stage.dispose()
      }
      disposeFunc()
      curDiv.replaceChildren()
    }
  }, [setStage, viewSettings]);
  React.useEffect(() => {
    if (stage === null || ref.current === null) return;
    const observer = new ResizeObserver(() => stage.handleResize());
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stage]);

  return (
    <div
      className={`ngl-viewer-canvas ${className}`}
      ref={ref}
      style={containerStyle}
    >
      {children}
    </div>
  );
}
