import React from "react";
import { ComponentUIDataT } from "./component-data";
type SelectorP = {
    options: Array<ComponentUIDataT["type"]>;
    addButton?: React.ReactNode;
};
declare const ViewerSelector: ({ options, addButton }: SelectorP) => JSX.Element;
export default ViewerSelector;
