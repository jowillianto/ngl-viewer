// themeContext.tsx
import React from 'react';

type ThemeContextType = {
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
};

export const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);
