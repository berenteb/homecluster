import axios from "axios";
import { useQuery } from "react-query";

import { useSettingsContext } from "../utils/settings-context";
import { QueryKeys } from "../utils/queryKeys";
import { Config } from "../utils/config";

const url = new URL("http://api.openweathermap.org/data/2.5/air_pollution");

export const useAqi = () => {
  const {
    staticCoordinates: { lat, lon },
  } = useSettingsContext();
  return useQuery(QueryKeys.AQI, async () => {
    const apiKey = Config.OWM_API_KEY;
    if (!apiKey) {
      throw new Error("Nincs API kulcs!");
    }
    url.searchParams.set("lat", lat.toString());
    url.searchParams.set("lon", lon.toString());
    url.searchParams.set("appid", apiKey);
    const response = await axios.get<AqiData>(url.toString());
    return response.data;
  });
};

export interface AqiData {
  coord: {
    lon: number;
    lat: number;
  };
  list: [
    {
      main: {
        aqi: AqiValues;
      };
      components: {
        co: number;
        no: number;
        no2: number;
        o3: number;
        so2: number;
        pm2_5: number;
        pm10: number;
        nh3: number;
      };
      dt: number;
    }
  ];
}

export enum AqiValues {
  GOOD = 1,
  FAIR = 2,
  MODERATE = 3,
  POOR = 4,
  UNHEALTHY = 5,
}
