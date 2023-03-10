import { createContext, PropsWithChildren, useState } from "react";

const DEFAULT_PRIMARY_COLOR = "#455a64";
const DEFAULT_GLASS_COLOR = "#ffffff";

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
  glassColor: DEFAULT_GLASS_COLOR,
  setPrimaryColor: () => {},
  setGlassColor: () => {},
  themeOverlayVisible: false,
  setThemeOverlayVisible: () => {},
});

export function ThemeContextProvider({ children }: PropsWithChildren) {
  const [primaryColor, setPrimaryColorState] = useState(
    localStorage.getItem(LocalStorageKeys.PRIMARY_COLOR) ||
      DEFAULT_PRIMARY_COLOR
  );

  const [glassColor, setGlassColorState] = useState(
    localStorage.getItem(LocalStorageKeys.GLASS_COLOR) || DEFAULT_GLASS_COLOR
  );

  const [themeOverlayVisible, setThemeOverlayVisibleState] = useState(false);

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
        primaryColor,
        glassColor,
        setPrimaryColor,
        setGlassColor,
        themeOverlayVisible,
        setThemeOverlayVisible,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
