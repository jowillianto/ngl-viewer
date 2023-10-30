import React, { useContext } from "react";
import StageContext from "../stage-context";

export type SetCameraTypeProps<T> = {
  render: React.ComponentType<{ onClick: (cameraType: "perspective" | "orthographic" | "stereo") => void;} & T>;
};

const SetCameraType = <T,>({ render }: SetCameraTypeProps<T>) => {
  const { stage } = useContext(StageContext);

  const updateCameraType = (newCameraType: "perspective" | "orthographic" | "stereo") => {
    stage?.setParameters({ cameraType: newCameraType });
  };

  const Component = render;
  const renderProps = {
    onClick: (cameraType: "perspective" | "orthographic" | "stereo") => updateCameraType(cameraType),
  } as { onClick: () => void;} & T;

  return <Component {...renderProps} />;
};

export default SetCameraType;
