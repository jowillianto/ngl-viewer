import React, { useContext } from "react";
import StageContext from "../stage-context";

export type SetCameraTypeProps<T> = {
  render: React.ComponentType<{ onClick: () => void;} & T>;
  type: "perspective" | "orthographic" | "stereo";
};

const SetCameraType = <T,>({ render, type }: SetCameraTypeProps<T>) => {
  const { stage } = useContext(StageContext);
  const [cameraType, setCameraType] = React.useState(type);

  const updateCameraType = (newCameraType: "perspective" | "orthographic" | "stereo") => {
    setCameraType(newCameraType);
    stage?.setParameters({ cameraType: newCameraType });
  };

  const Component = render;
  const renderProps = {
    onClick: () => updateCameraType(cameraType),
  } as { onClick: () => void;} & T;

  return <Component {...renderProps} />;
};

export default SetCameraType;
