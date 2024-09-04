import React from "react";
import * as NGL from "ngl";
import StageContext from "./stage-context";

export type NGLStageProps = React.PropsWithChildren<
  {
    viewSettings?: ConstructorParameters<typeof NGL.Stage>[1];
  } & React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
>;

export default function Stage({
  viewSettings,
  children,
  ...props
}: NGLStageProps) {
  const { stage, setStage } = React.useContext(StageContext);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const curDiv = ref.current;
    if (curDiv === null) return;
    const stage = new NGL.Stage(curDiv, viewSettings);
    setStage(stage);
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
  React.useEffect(() => {
    if (stage === null || ref.current === null) return;
    const observer = new ResizeObserver(() => stage.handleResize());
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stage]);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}
