import React from "react";
import * as NGL from "ngl";
import StageContext, { VersionedStage } from "./stage-context";
// import NGLArrow from "./shapes/arrow";

// function getDefaultAxesPosition(s: NGL.Stage) {
//   return new NGL.Vector2(4, 4);
// }

// function canvasToThreeDimension(s: NGL.Stage, p: NGL.Vector2) {
//   const width = s.viewer.width;
//   const height = s.viewer.height;
//   const transform2d = p
//     .multiplyScalar(2)
//     .divide(new NGL.Vector2(width, height))
//     .subScalar(1);
//   const position = new NGL.Vector3(
//     transform2d.x,
//     transform2d.y,
//     0
//   );
//   console.log(position)
//   return position
//     .unproject(s.viewer.camera)
//     .applyMatrix4(new NGL.Matrix4().getInverse(s.viewer.rotationGroup.matrix))
//     .sub(s.viewer.translationGroup.position);
// }

// type NGLAxisP = {
//   stage: NGL.Stage;
//   getAxesPosition?: typeof getDefaultAxesPosition;
// };

// function NGLAxis({
//   stage,
//   getAxesPosition = getDefaultAxesPosition,
// }: NGLAxisP) {
//   const [position, setPosition] = React.useState(new NGL.Vector3(0, 0, 0))
//   React.useEffect(() => {
//     function alwaysSet() : NodeJS.Timeout {
//       setPosition(canvasToThreeDimension(stage, getAxesPosition(stage)))
//       return setTimeout(() => alwaysSet(), 200)
//     }
//     const timer = alwaysSet()
//     return () => clearTimeout(timer)
//   }, [ getAxesPosition, stage ])

//   const targetX = React.useMemo(() => {
//     return new NGL.Vector3(
//       position.x + stage.viewer.cameraDistance * 0.1,
//       position.y,
//       position.z
//     );
//   }, [position, stage.viewer.cameraDistance]);
//   const targetY = React.useMemo(() => {
//     return new NGL.Vector3(
//       position.x,
//       position.y + stage.viewer.cameraDistance * 0.1,
//       position.z
//     );
//   }, [position, stage.viewer.cameraDistance]);
//   const targetZ = React.useMemo(() => {
//     return new NGL.Vector3(
//       position.x,
//       position.y,
//       position.z + stage.viewer.cameraDistance * 0.1
//     );
//   }, [position, stage.viewer.cameraDistance]);
//   const viewSettings = React.useMemo(
//     () => [
//       {
//         type: "buffer",
//         params: {
//           opacity: 1,
//         },
//       },
//     ],
//     []
//   );
//   const colorX = React.useMemo(() => new NGL.Color("red"), []);
//   const colorY = React.useMemo(() => new NGL.Color("green"), []);
//   const colorZ = React.useMemo(() => new NGL.Color("blue"), []);

//   return (
//     <>
//       <NGLArrow
//         name="X Axis"
//         position1={position}
//         position2={targetX}
//         color={colorX}
//         radius={0.2}
//         viewSettings={viewSettings}
//       />
//       <NGLArrow
//         name="Y Axis"
//         position1={position}
//         position2={targetY}
//         color={colorY}
//         radius={0.2}
//         viewSettings={viewSettings}
//       />
//       <NGLArrow
//         name="Z Axis"
//         position1={position}
//         position2={targetZ}
//         color={colorZ}
//         radius={0.2}
//         viewSettings={viewSettings}
//       />
//     </>
//   );
// }

export type NGLStageProps = React.PropsWithChildren<
  {
    viewSettings?: ConstructorParameters<typeof NGL.Stage>[1];
    // showAxes?: boolean;
    // getAxesPosition?: (s: NGL.Stage) => NGL.Vector2;
  } & React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
>;

export default function Stage({
  viewSettings,
  children,
  // showAxes = true,
  // getAxesPosition = getDefaultAxesPosition,
  ...props
}: NGLStageProps) {
  const { stage: versionedStage, setStage } = React.useContext(StageContext);
  const ref = React.useRef<HTMLDivElement>(null);
  const stage = React.useMemo(() => {
    if (versionedStage === null) return null;
    return versionedStage.stage;
  }, [versionedStage]);
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
  React.useEffect(() => {
    if (stage === null || ref.current === null) return;
    const observer = new ResizeObserver(() => stage.handleResize());
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stage]);
  return (
    <div ref={ref} {...props}>
      {children}
      {/* {stage && <NGLAxis stage={stage} getAxesPosition={getAxesPosition} />} */}
    </div>
  );
}
