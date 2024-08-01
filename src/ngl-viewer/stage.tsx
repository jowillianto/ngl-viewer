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
  className = '',
  viewSettings,
}: NGLStageProps) {
  const { setStage, stage } = React.useContext(StageContext);
  const ref = React.useRef<HTMLDivElement>(null);

  const containerStyle = React.useMemo(() => {
    if (height === undefined || width === undefined)
      return {}
    return {height, width}
  }, [ height, width ])

  React.useEffect(() => {
    if (!ref.current) return
    const stage = new NGL.Stage(ref.current, viewSettings)
    setStage(stage)
    return () => {
      stage.dispose()
    }
  }, [ setStage, viewSettings ])
  React.useEffect(() => {
    if (stage === null || ref.current === null) return
    const observer = new ResizeObserver(() => stage.handleResize())
    observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }
  }, [ stage ])

  return (
    <div
      className={`ngl-viewer-canvas ${className}`}
      ref={ref}
      style = {containerStyle}
    />
  );
}
