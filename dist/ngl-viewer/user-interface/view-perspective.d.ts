import React from "react";
export type SetCameraTypeProps<T> = {
    render: React.ComponentType<{
        onClick: () => void;
    } & T>;
    type: "perspective" | "orthographic" | "stereo";
};
declare const SetCameraType: <T>({ render, type }: SetCameraTypeProps<T>) => JSX.Element;
export default SetCameraType;
