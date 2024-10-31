import React from "react";
import * as NGL from "ngl";
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
export default function Stage({ viewSettings, showAxes, axesConfig, containerClassName, containerStyles, axesClassName, axesStyles, stageClassName, stageStyles, }: NGLStageProps): JSX.Element;
