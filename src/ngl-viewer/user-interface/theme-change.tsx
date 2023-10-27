import React, { useContext, useState } from "react";
import StageContext from "../stage-context";

export type ThemeSwitcherProps<T> = {
  render: React.ComponentType<{ 
    onClick: () => void; currentTheme: string 
  } & T>;
  lightTheme?: string;
  darkTheme? : string
};

const ThemeSwitcher = <T,>({ 
  render, lightTheme = 'white', darkTheme = 'black'
}: ThemeSwitcherProps<T>) => {
  const [currentTheme, setCurrentTheme] = useState<string>('dark'); 
  const { stage } = useContext(StageContext);

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    newTheme === 'light' ? 
      stage?.setParameters({ backgroundColor: lightTheme }) : 
      stage?.setParameters({ backgroundColor: darkTheme });
  };

  const Component = render;
  const renderProps = {
    onClick: toggleTheme,
    currentTheme,
  } as { onClick: () => void; currentTheme: string } & T;

  return <Component {...renderProps} />;
};

export default ThemeSwitcher;
