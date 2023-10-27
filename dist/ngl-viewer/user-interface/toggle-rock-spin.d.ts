import React from "react";
export type ToggleRockProps<T> = {
    render: React.ComponentType<{
        onClick: () => void;
    } & T>;
    initialState: "rock" | "spin" | "off";
};
declare const ToggleRockSpinOrOff: <T>({ render, initialState }: ToggleRockProps<T>) => JSX.Element;
export default ToggleRockSpinOrOff;
