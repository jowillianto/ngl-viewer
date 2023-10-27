import React from "react";
export type CenterStructureProps<T> = {
    render: React.ComponentType<{
        onClick: () => void;
    } & T>;
};
declare const CenterStructure: <T>({ render }: CenterStructureProps<T>) => JSX.Element;
export default CenterStructure;
