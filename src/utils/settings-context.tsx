import { createContext, ReactNode, useContext, useState } from "react";

const DEFAULT_COORDINATES: Coordinates = {
  lat: 47.473443,
  lon: 19.052844,
};

const LocalStorageKeys = {
  STATIC_COORDS_LAT: "lat",
  STATIC_COORDS_LON: "lon",
  BACKGROUND_URL: "backgroundUrl",
};

export type Coordinates = {
  lat: number | string;
  lon: number | string;
};

function getCoordsFromLocalStorage(): Coordinates {
  let lat = localStorage.getItem(LocalStorageKeys.STATIC_COORDS_LAT);
  let lon = localStorage.getItem(LocalStorageKeys.STATIC_COORDS_LON);
  if (lat && lon) {
    return { lat: lat, lon: lon };
  } else return DEFAULT_COORDINATES;
}

export type SettingsContextType = {
  staticCoordinates: Coordinates;
  setStaticCoordinates: (coordinates: Coordinates) => void;
  settingsOverlayVisible: boolean;
  setSettingsOverlayVisible: (visible: boolean) => void;
  backgroundUrl: string;
  setBackgroundUrl: (url: string) => void;
  darkMode: boolean;
  setDarkMode: (enabled: boolean) => void;
};

export const SettingsContext = createContext<SettingsContextType>({
  staticCoordinates: getCoordsFromLocalStorage(),
  setStaticCoordinates: () => {},
  settingsOverlayVisible: false,
  setSettingsOverlayVisible: () => {},
  backgroundUrl: "",
  setBackgroundUrl: () => {},
  darkMode: false,
  setDarkMode: () => {},
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [staticCoordinates, setStaticCoordinatesState] = useState<Coordinates>(
    getCoordsFromLocalStorage()
  );

  const [settingsOverlayVisible, setSettingsOverlayVisibleState] =
    useState<boolean>(false);

  const [backgroundUrl, setBackgroundUrlState] = useState<string>(
    localStorage.getItem(LocalStorageKeys.BACKGROUND_URL) || ""
  );

  const setStaticCoordinates = (coordinates: Coordinates) => {
    localStorage.setItem(
      LocalStorageKeys.STATIC_COORDS_LAT,
      coordinates.lat + ""
    );
    localStorage.setItem(
      LocalStorageKeys.STATIC_COORDS_LON,
      coordinates.lon + ""
    );
    setStaticCoordinatesState(coordinates);
  };

  const setSettingsOverlayVisible = (visible: boolean) => {
    setSettingsOverlayVisibleState(visible);
  };

  const setBackgroundUrl = (url: string) => {
    localStorage.setItem(LocalStorageKeys.BACKGROUND_URL, url);
    setBackgroundUrlState(url);
  };

  const [darkMode, setDarkMode] = useState(false);

  return (
    <SettingsContext.Provider
      value={{
        staticCoordinates,
        setStaticCoordinates,
        settingsOverlayVisible,
        setSettingsOverlayVisible,
        backgroundUrl,
        setBackgroundUrl,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettingsContext = () =>
  useContext<SettingsContextType>(SettingsContext);
