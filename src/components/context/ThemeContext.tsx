import React, { FC, useMemo, useState } from 'react'

type Theme = {
  theme: string;
  setTheme: (theme: string) => void;
};

export const ThemeContext = React.createContext<Theme>({
  theme: '',
  setTheme: () => {},
});

type ThemeContextProviderProps = {
  children: React.ReactNode;
}

export const ThemeContextProvider: FC<ThemeContextProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light');

  const contextObj = useMemo(() => ({
    theme, setTheme,
  }), [theme, setTheme]);

  return (
    <ThemeContext.Provider value={contextObj}>
      {children}
    </ThemeContext.Provider>
  );
}

