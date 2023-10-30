import React from "react";
export type ToggleRockProps<T> = {
    render: React.ComponentType<{
        onClick: () => void;
    } & T>;
    initialState: "rock" | "spin" | "off";
    props: T;
};
declare const ToggleRockSpinOrOff: <T>({ render, initialState, props }: ToggleRockProps<T>) => JSX.Element;
export default ToggleRockSpinOrOff;
