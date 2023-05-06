import { useSettingsContext } from "../utils/settings-context";
import { OWMData } from "./useWeather";
import { useEffect } from "react";

export function useThemeChange(weather: OWMData | undefined) {
  const { darkMode, setDarkMode } = useSettingsContext();
  const currentDay = weather?.daily[0];
  let sunrise = currentDay?.sunrise;
  let sunset = currentDay?.sunset;

  useEffect(() => {
    if (sunrise && sunset) {
      if (Date.now() > sunset * 1000 || Date.now() < sunrise * 1000) {
        if (!darkMode) setDarkMode(true);
      } else if (darkMode) {
        setDarkMode(false);
      }
    }
  }, [darkMode, setDarkMode, sunrise, sunset, weather]);
}
