import React from "react";
export type CenterStructureProps<T> = {
    render: React.ComponentType<{
        onClick: () => void;
    } & T>;
    props: T;
};
declare const CenterStructure: <T>({ render, props }: CenterStructureProps<T>) => JSX.Element;
export default CenterStructure;
