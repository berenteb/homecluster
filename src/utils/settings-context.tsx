import { createContext, ReactNode, useState } from "react";

const DEFAULT_COORDINATES: Coordinates = {
  lat: 47.473443,
  lon: 19.052844,
};

const LocalStorageKeys = {
  LOCATION_ENABLED: "locationEnabled",
  BACKGROUND_ENABLED: "backgroundEnabled",
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
  locationEnabled: boolean;
  setLocationEnabled: (enabled: boolean) => void;
  backgroundEnabled: boolean;
  setBackgroundEnabled: (enabled: boolean) => void;
  staticCoordinates: Coordinates;
  setStaticCoordinates: (coordinates: Coordinates) => void;
  getLocation: () => Promise<Coordinates>;
  settingsOverlayVisible: boolean;
  setSettingsOverlayVisible: (visible: boolean) => void;
  backgroundUrl: string;
  setBackgroundUrl: (url: string) => void;
};

export const SettingsContext = createContext<SettingsContextType>({
  locationEnabled: !!localStorage.getItem(LocalStorageKeys.LOCATION_ENABLED),
  setLocationEnabled: () => {},
  backgroundEnabled: !!localStorage.getItem(
    LocalStorageKeys.BACKGROUND_ENABLED
  ),
  setBackgroundEnabled: () => {},
  staticCoordinates: getCoordsFromLocalStorage(),
  setStaticCoordinates: () => {},
  getLocation: () => new Promise<Coordinates>((resolve, reject) => reject()),
  settingsOverlayVisible: false,
  setSettingsOverlayVisible: () => {},
  backgroundUrl: "",
  setBackgroundUrl: () => {},
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [locationEnabled, setLocationEnabledState] = useState<boolean>(
    localStorage.getItem(LocalStorageKeys.LOCATION_ENABLED) === "true"
  );

  const [backgroundEnabled, setBackgroundEnabledState] = useState<boolean>(
    localStorage.getItem(LocalStorageKeys.BACKGROUND_ENABLED) === "true"
  );

  const [staticCoordinates, setStaticCoordinatesState] = useState<Coordinates>(
    getCoordsFromLocalStorage()
  );

  const [settingsOverlayVisible, setSettingsOverlayVisibleState] =
    useState<boolean>(false);

  const [backgroundUrl, setBackgroundUrlState] = useState<string>(
    localStorage.getItem(LocalStorageKeys.BACKGROUND_URL) || ""
  );

  const setLocationEnabled = (enabled: boolean) => {
    getLocation()
      .then(() => {
        localStorage.setItem(LocalStorageKeys.LOCATION_ENABLED, enabled + "");
        setLocationEnabledState(enabled);
      })
      .catch(() => {
        localStorage.setItem(LocalStorageKeys.LOCATION_ENABLED, false + "");
        setLocationEnabledState(false);
      });
  };
  const setBackgroundEnabled = (enabled: boolean) => {
    localStorage.setItem(LocalStorageKeys.BACKGROUND_ENABLED, enabled + "");
    setBackgroundEnabledState(enabled);
  };

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

  const getLocation = () => {
    return new Promise<Coordinates>((resolve, reject) => {
      if (locationEnabled) {
        navigator.geolocation.getCurrentPosition(
          async (geodata) => {
            if (geodata.coords.accuracy > 100) {
              reject("Pontatlan a helymeghatározás");
            }
            resolve({
              lat: geodata.coords.latitude,
              lon: geodata.coords.longitude,
            });
          },
          () => {
            setLocationEnabled(false);
            reject("Helymeghatározás nem sikerült, így ki lett kapcsolva.");
          }
        );
      } else {
        resolve(staticCoordinates);
      }
    });
  };

  const setBackgroundUrl = (url: string) => {
    localStorage.setItem(LocalStorageKeys.BACKGROUND_URL, url);
    setBackgroundUrlState(url);
  };

  return (
    <SettingsContext.Provider
      value={{
        locationEnabled: locationEnabled,
        setLocationEnabled: setLocationEnabled,
        backgroundEnabled: backgroundEnabled,
        setBackgroundEnabled: setBackgroundEnabled,
        staticCoordinates: staticCoordinates,
        setStaticCoordinates: setStaticCoordinates,
        getLocation: getLocation,
        settingsOverlayVisible: settingsOverlayVisible,
        setSettingsOverlayVisible: setSettingsOverlayVisible,
        backgroundUrl: backgroundUrl,
        setBackgroundUrl: setBackgroundUrl,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
