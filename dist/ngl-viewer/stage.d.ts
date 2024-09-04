import React from "react";
import * as NGL from "ngl";
export type NGLStageProps = React.PropsWithChildren<{
    viewSettings?: ConstructorParameters<typeof NGL.Stage>[1];
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export default function Stage({ viewSettings, children, ...props }: NGLStageProps): JSX.Element;
