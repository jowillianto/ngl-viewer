import React from "react";
import { ComponentUIDataT } from "./component-data";
export type ViewerContextTypeT = {
    [x: string]: any;
    components: Array<ComponentUIDataT>;
    addComponent: (component: ComponentUIDataT) => void;
    replaceComponent: (component: ComponentUIDataT, id: number) => void;
    removeComponent: (id: number) => void;
    addComponentByType: (type: ComponentUIDataT["type"]) => void;
};
declare const ViewerContext: React.Context<ViewerContextTypeT>;
export default ViewerContext;
