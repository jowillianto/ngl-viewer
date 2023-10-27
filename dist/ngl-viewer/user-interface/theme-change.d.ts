import React from "react";
export type ThemeSwitcherProps<T> = {
    render: React.ComponentType<{
        onClick: () => void;
        currentTheme: string;
    } & T>;
};
declare const ThemeSwitcher: <T>({ render }: ThemeSwitcherProps<T>) => JSX.Element;
export default ThemeSwitcher;
