import React from "react";
import { ComponentUIDataT } from "./component-data";
type RendererChild<U> = {
    components: ComponentUIDataT[];
} & U;
type GenericRendererP<U> = {
    render: React.ComponentType<RendererChild<U>> | React.LazyExoticComponent<React.ComponentType<RendererChild<U>>>;
    props: U;
};
declare const GenericRenderer: <U>({ render, props }: GenericRendererP<U>) => JSX.Element;
export default GenericRenderer;
