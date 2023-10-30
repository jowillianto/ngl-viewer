import React from "react";
export type ThemeSwitcherProps<T> = {
    render: React.ComponentType<{
        onClick: () => void;
        currentTheme: string;
    } & T>;
    lightTheme?: string;
    darkTheme?: string;
    props: T;
};
declare const ThemeSwitcher: <T>({ render, lightTheme, darkTheme, props }: ThemeSwitcherProps<T>) => JSX.Element;
export default ThemeSwitcher;
