import { useSettingsContext } from "./settings-context";
import { useEffect, useState } from "react";
import axios from "axios";
import { useInterval } from "./use-interval";

const url = new URL("https://api.openweathermap.org/data/2.5/onecall");

export const useWeather = () => {
  const [weather, setWeather] = useState<OWMData>();
  const [error, setError] = useState<string>();
  const { getLocation, darkMode, setDarkMode } = useSettingsContext();

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
  }, [sunrise, sunset, weather]);

  const apiCall = () => {
    getLocation().then(({ lat, lon }) => {
      const apiKey = process.env.REACT_APP_OWM_API_KEY;
      if (!apiKey) {
        setError("Nincs API kulcs!");
        return;
      }
      url.searchParams.set("lat", lat.toString());
      url.searchParams.set("lon", lon.toString());
      url.searchParams.set("appid", apiKey);
      axios
        .get<OWMData>(url.toString())
        .then((response) => {
          setError(undefined);
          setWeather(response.data);
        })
        .catch((err) => setError(err));
    });
  };

  useEffect(apiCall, []);
  useInterval(apiCall, 30000);

  return { weather, error };
};

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Current {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: Weather[];
  rain?: Rain;
  snow?: Rain;
}

export interface Minutely {
  dt: number;
  precipitation: number;
}

export interface Weather2 {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Rain {
  "1h": number;
}

export interface Hourly {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather2[];
  pop: number;
  rain?: Rain;
  snow?: Rain;
}

export interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface Weather3 {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Daily {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: Temp;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather3[];
  clouds: number;
  pop: number;
  rain: number;
  snow: number;
  uvi: number;
}

export interface Alert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}

export interface OWMData {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: Current;
  minutely: Minutely[];
  hourly: Hourly[];
  daily: Daily[];
  alerts: Alert[];
}
