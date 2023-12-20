import React, { FC, useEffect, useMemo, useState } from "react";

type Theme = {
  theme: string;
  setTheme: (theme: string) => void;
};

export const ThemeContext = React.createContext<Theme>({
  theme: "",
  setTheme: () => {},
});

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

export const ThemeContextProvider: FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  const contextObj = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme, setTheme]
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    const themeColor = document.getElementById("theme-color");
    
    if (theme === "dark") {
      themeColor?.setAttribute("content", "#432816");
    } else {
      themeColor?.setAttribute("content", "#ede5d0");
    }
  }, []);

  return (
    <ThemeContext.Provider value={contextObj}>{children}</ThemeContext.Provider>
  );
};
