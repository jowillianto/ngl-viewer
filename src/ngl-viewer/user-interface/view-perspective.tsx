import React from "react";
import { useStage } from "../stage-context";

export type SetCameraTypeProps<T> = {
  render: React.ComponentType<{ onClick: (cameraType: "perspective" | "orthographic" | "stereo") => void;} & T>;
  props: T;
};

const SetCameraType = <T,>({ render, props }: SetCameraTypeProps<T>) => {
  const stage = useStage()

  const updateCameraType = (newCameraType: "perspective" | "orthographic" | "stereo") => {
    stage?.setParameters({ cameraType: newCameraType });
  };

  const Component = render;
  const renderProps = {
    onClick: (cameraType: "perspective" | "orthographic" | "stereo") => updateCameraType(cameraType),
    ...props
  }

  return <Component {...renderProps} />;
};

export default SetCameraType;
