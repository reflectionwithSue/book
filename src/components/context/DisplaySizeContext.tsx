import React, { FC, useMemo, useState, useEffect } from 'react'

type DisplaySize = {
  dispSize: number;
  setDispSize: (dispSize: number) => void;
};

export const DisplaySizeContext = React.createContext<DisplaySize>({
  dispSize: 0,
  setDispSize: () => {},
});

type ThemeContextProviderProps = {
  children: React.ReactNode;
}

export const DisplaySizeContextProvider: FC<ThemeContextProviderProps> = ({ children }) => {
  const [dispSize, setDispSize] = useState(window.innerWidth );
  
  useEffect(() => {
    const handleWindowResize = () => {
      setDispSize(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const contextObj = useMemo(() => ({
    dispSize, setDispSize,
  }), [dispSize, setDispSize]);

  return (
    <DisplaySizeContext.Provider value={contextObj}>
      {children}
    </DisplaySizeContext.Provider>
  );
}