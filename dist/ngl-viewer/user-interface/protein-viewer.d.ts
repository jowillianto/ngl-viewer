import React from "react";
import { ComponentUIDataT } from "./component-data";
type ProteinViewerP = React.PropsWithChildren<{
    initialComponents?: Array<ComponentUIDataT>;
    components?: Array<ComponentUIDataT>;
    onComponentsChange?: (arr: Array<ComponentUIDataT>) => void;
    className?: string;
}>;
declare const ProteinViewer: (props: ProteinViewerP) => JSX.Element;
export default ProteinViewer;
