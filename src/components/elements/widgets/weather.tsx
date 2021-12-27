import { Widget, WidgetText } from "../widget";
import { useContext, useEffect, useState } from "react";
import { getWeatherData, Weather } from "../../../utils/weather";
import {
  SettingsContext,
  SettingsContextType,
} from "../../../utils/settings-context";
import { WeatherIcon } from "weather-react-icons";
import { Umbrella } from "@styled-icons/ionicons-outline/Umbrella";
import { WeatherSnowflake } from "@styled-icons/fluentui-system-filled/WeatherSnowflake";
import "weather-react-icons/lib/css/weather-icons.css";
import { useInterval } from "../../../utils/use-interval";

export function WeatherWidget() {
  const [weather, setWeather] = useState<Weather>();
  const [error, setError] = useState<string | undefined>();
  const { getLocation } = useContext<SettingsContextType>(SettingsContext);
  const weatherApiCall = () => {
    getLocation()
      .then((coords) => {
        getWeatherData(coords)
          .then((data) => {
            setWeather(data);
            setError(undefined);
          })
          .catch((error) => {
            setError(error.toString());
          });
      })
      .catch((error) => setError(error.toString()));
  };
  // Interval for 10s and initial API call
  useInterval(() => {
    weatherApiCall();
  }, 30000);
  useEffect(() => {
    weatherApiCall();
  }, []);
  if (!weather?.main.temp || error) {
    return null;
  }
  return (
    <>
      <Widget>
        <WeatherIcon
          iconId={weather?.weather?.[0].id || 800}
          name="owm"
          night={
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
          }
        />
        <WidgetText>{Math.round(weather.main.temp) - 273}°</WidgetText>
      </Widget>
      {(weather.snow || weather.rain) && (
        <Widget>
          {weather.snow ? <WeatherSnowflake /> : <Umbrella />}
          <WidgetText>
            {weather.snow?.["1h"] || weather.rain?.["1h"] || 0}mm
          </WidgetText>
        </Widget>
      )}
    </>
  );
}
