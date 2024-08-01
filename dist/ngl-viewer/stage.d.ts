import React from "react";
import * as NGL from "ngl";
export type NGLStageProps = React.PropsWithChildren<{
    height?: string;
    width?: string;
    className?: string;
    viewSettings?: ConstructorParameters<typeof NGL.Stage>[1];
}>;
export default function Stage({ height, width, className, viewSettings, }: NGLStageProps): JSX.Element;
