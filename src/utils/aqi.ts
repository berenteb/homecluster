import { useSettingsContext } from "./settings-context";
import { useEffect, useState } from "react";
import axios from "axios";
import { useInterval } from "./use-interval";

const url = new URL("https://api.weatherbit.io/v2.0/current");

export const useAqi = () => {
  const [aqi, setAqi] = useState<Aqi>();
  const [error, setError] = useState<string>();
  const { getLocation } = useSettingsContext();

  const apiCall = () => {
    getLocation().then(({ lat, lon }) => {
      const apiKey = process.env.REACT_APP_AQI_KEY;
      if (!apiKey) {
        setError("Nincs API kulcs!");
        return;
      }
      url.searchParams.set("lat", lat.toString());
      url.searchParams.set("lon", lon.toString());
      url.searchParams.set("key", apiKey || "");
      axios
        .get<Aqi>(url.toString())
        .then((response) => {
          setError(undefined);
          setAqi(response.data);
        })
        .catch((err) => setError(err));
    });
  };

  useEffect(apiCall, []);
  useInterval(apiCall, 180000);

  return { aqi, error };
};

export interface Aqi {
  data?: DataEntity[] | null;
  count: number;
}
export interface DataEntity {
  rh: number;
  pod: string;
  lon: number;
  pres: number;
  timezone: string;
  ob_time: string;
  country_code: string;
  clouds: number;
  ts: number;
  solar_rad: number;
  state_code: string;
  city_name: string;
  wind_spd: number;
  wind_cdir_full: string;
  wind_cdir: string;
  slp: number;
  vis: number;
  h_angle: number;
  sunset: string;
  dni: number;
  dewpt: number;
  snow: number;
  uv: number;
  precip: number;
  wind_dir: number;
  sunrise: string;
  ghi: number;
  dhi: number;
  aqi: number;
  lat: number;
  weather: Weather;
  datetime: string;
  temp: number;
  station: string;
  elev_angle: number;
  app_temp: number;
}
export interface Weather {
  icon: string;
  code: number;
  description: string;
}
