import axios from "axios";
import { useQuery } from "react-query";

import { useSettingsContext } from "../utils/settings-context";
import { Config } from "../utils/config";
import { QueryKeys } from "../utils/queryKeys";

const url = new URL("https://api.openweathermap.org/data/2.5/onecall");

export const useWeather = () => {
  const {
    staticCoordinates: { lat, lon },
  } = useSettingsContext();

  return useQuery(QueryKeys.WEATHER, async () => {
    const apiKey = Config.OWM_API_KEY;
    if (!apiKey) {
      throw new Error("Nincs API kulcs!");
    }
    url.searchParams.set("lat", lat.toString());
    url.searchParams.set("lon", lon.toString());
    url.searchParams.set("appid", apiKey);
    const response = await axios.get<OWMData>(url.toString());
    return response.data;
  });
};

export interface UseWeather {
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
  weather: UseWeather[];
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
