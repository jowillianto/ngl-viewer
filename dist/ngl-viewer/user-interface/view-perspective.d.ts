import React from "react";
export type SetCameraTypeProps<T> = {
    render: React.ComponentType<{
        onClick: (cameraType: "perspective" | "orthographic" | "stereo") => void;
    } & T>;
};
declare const SetCameraType: <T>({ render }: SetCameraTypeProps<T>) => JSX.Element;
export default SetCameraType;
