import { createContext, ReactNode, useState } from "react";

const DEFAULT_PRIMARY_COLOR = "#183952";

const LocalStorageKeys = {
  PRIMARY_COLOR: "primaryColor",
  GLASS_COLOR: "glassColor",
};

export type ThemeContextType = {
  primaryColor: string;
  glassColor: string;
  setPrimaryColor: (color: string) => void;
  setGlassColor: (color: string) => void;
  themeOverlayVisible: boolean;
  setThemeOverlayVisible: (visible: boolean) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  primaryColor: DEFAULT_PRIMARY_COLOR,
  glassColor: DEFAULT_PRIMARY_COLOR,
  setPrimaryColor: () => {},
  setGlassColor: () => {},
  themeOverlayVisible: false,
  setThemeOverlayVisible: () => {},
});

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [primaryColor, setPrimaryColorState] = useState<string>(
    localStorage.getItem(LocalStorageKeys.PRIMARY_COLOR) ||
      DEFAULT_PRIMARY_COLOR
  );

  const [glassColor, setGlassColorState] = useState<string>(
    localStorage.getItem(LocalStorageKeys.GLASS_COLOR) || DEFAULT_PRIMARY_COLOR
  );

  const [themeOverlayVisible, setThemeOverlayVisibleState] =
    useState<boolean>(false);

  const setThemeOverlayVisible = (visible: boolean) => {
    setThemeOverlayVisibleState(visible);
  };

  const setPrimaryColor = (color: string) => {
    localStorage.setItem(LocalStorageKeys.PRIMARY_COLOR, color);
    setPrimaryColorState(color);
  };

  const setGlassColor = (color: string) => {
    localStorage.setItem(LocalStorageKeys.GLASS_COLOR, color);
    setGlassColorState(color);
  };

  return (
    <ThemeContext.Provider
      value={{
        primaryColor: primaryColor,
        glassColor: glassColor,
        setPrimaryColor: setPrimaryColor,
        setGlassColor: setGlassColor,
        themeOverlayVisible: themeOverlayVisible,
        setThemeOverlayVisible: setThemeOverlayVisible,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
