import { Coordinates } from "./settings-context";

const url = new URL("https://api.weatherbit.io/v2.0/current");

export function getAqiData({ lat, lon }: Coordinates) {
  const apiKey = process.env.REACT_APP_AQI_KEY;
  url.searchParams.set("lat", lat.toString());
  url.searchParams.set("lon", lon.toString());
  url.searchParams.set("key", apiKey || "");
  return new Promise<Aqi>((resolve: (values: Aqi) => void, reject) => {
    if (!apiKey) reject("Nincs API kulcs!");
    fetch(url.toString(), { headers: { "Access-Control-Allow-Origin": "*" } })
      .then(async (response) => {
        if (response.status === 200) return response.json();
        reject(await response.text());
      })
      .then((data) => {
        resolve(data);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

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
