import React from "react";
import { ComponentUIDataT } from "./component-data";
type ProteinViewerP = {
    initialComponents?: Array<ComponentUIDataT>;
} & React.PropsWithChildren;
declare const ProteinViewer: ({ initialComponents, children }: ProteinViewerP) => JSX.Element;
export default ProteinViewer;
