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
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export default function Stage({ viewSettings, showAxes, axesConfig, ...props }: NGLStageProps): JSX.Element;
