import React, { useContext, useState } from "react";
import StageContext from "../stage-context";

export type ThemeSwitcherProps<T> = {
  render: React.ComponentType<{ onClick: () => void; currentTheme: string } & T>;
};

const ThemeSwitcher = <T,>({ render }: ThemeSwitcherProps<T>) => {
  const [currentTheme, setCurrentTheme] = useState<string>('dark'); 
  const { stage } = useContext(StageContext);

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    newTheme === 'light' ? stage?.setParameters({ backgroundColor: 'white' }) : stage?.setParameters({ backgroundColor: 'black' });
  };

  const Component = render;
  const renderProps = {
    onClick: toggleTheme,
    currentTheme,
  } as { onClick: () => void; currentTheme: string } & T;

  return <Component {...renderProps} />;
};

export default ThemeSwitcher;
