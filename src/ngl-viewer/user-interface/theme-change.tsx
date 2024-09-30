import React, { useState } from "react";
import { useStage } from "../stage-context";

export type ThemeSwitcherProps<T> = {
  render: React.ComponentType<
    {
      onClick: () => void;
      currentTheme: string;
    } & T
  >;
  lightTheme?: string;
  darkTheme?: string;
  props: T;
};

const ThemeSwitcher = <T,>({
  render,
  lightTheme = "white",
  darkTheme = "black",
  props,
}: ThemeSwitcherProps<T>) => {
  const [currentTheme, setCurrentTheme] = useState<string>("dark");
  const stage = useStage();

  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
    newTheme === "light"
      ? stage?.setParameters({ backgroundColor: lightTheme })
      : stage?.setParameters({ backgroundColor: darkTheme });
  };

  const Component = render;
  const renderProps = {
    onClick: toggleTheme,
    currentTheme,
    ...props,
  };

  return <Component {...renderProps} />;
};

export default ThemeSwitcher;
