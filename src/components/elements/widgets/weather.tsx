import { DataWrapper, Widget, WidgetSubText, WidgetText } from "../widget";
import { useWeather } from "../../../utils/weather";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

export function WeatherWidget() {
  const { weather, error } = useWeather();
  if (
    !weather?.current.temp ||
    !weather?.minutely ||
    !weather?.hourly ||
    error
  ) {
    return null;
  }

  const rain = weather.current.rain?.["1h"];
  const snow = weather.current.snow?.["1h"];

  let nextRain = weather.minutely.find((m) => m.precipitation > 0)?.dt;
  if (!nextRain) nextRain = weather.hourly.slice(1, 4).find((h) => h.rain)?.dt;
  const nextSnow = weather.hourly.slice(0, 3).find((h) => h.snow)?.dt;

  let rainEnd = weather.minutely.find((m) => m.precipitation === 0)?.dt;
  if (!rainEnd) rainEnd = weather.hourly.slice(1).find((m) => !m.rain)?.dt;

  let snowEnd = weather.hourly.slice(1).find((m) => !m.snow)?.dt;
  return (
    <>
      <Widget>
        {weather.current?.weather?.[0].icon && (
          <img
            src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
            alt={":("}
          />
        )}
        <DataWrapper>
          <WidgetText>
            {Math.round(weather.current.temp) - 273}°
            {(snow || rain) && " | " + (snow || rain) + "mm"}
          </WidgetText>
          <WidgetSubText>
            <FiArrowDown />
            {Math.round(weather.daily[0]?.temp.min) - 273}° | <FiArrowUp />
            {Math.round(weather.daily[0]?.temp.max) - 273}°
          </WidgetSubText>
        </DataWrapper>
      </Widget>
      {nextRain && !rain && (
        <Widget>
          <img
            src={`https://openweathermap.org/img/wn/09d@2x.png`}
            alt={":("}
          />
          <DataWrapper>
            <WidgetText>
              {new Date(nextRain * 1000).toLocaleTimeString("hu-HU", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </WidgetText>
            <WidgetSubText>Eső várható</WidgetSubText>
          </DataWrapper>
        </Widget>
      )}
      {rain && rainEnd && !snow && (
        <Widget>
          <img
            src={`https://openweathermap.org/img/wn/04d@2x.png`}
            alt={":("}
          />
          <DataWrapper>
            <WidgetText>
              {new Date(rainEnd * 1000).toLocaleTimeString("hu-HU", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </WidgetText>
            <WidgetSubText>Eső vége</WidgetSubText>
          </DataWrapper>
        </Widget>
      )}
      {snow && snowEnd && (
        <Widget>
          <img
            src={`https://openweathermap.org/img/wn/04d@2x.png`}
            alt={":("}
          />
          <DataWrapper>
            <WidgetText>
              {new Date(snowEnd * 1000).toLocaleTimeString("hu-HU", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </WidgetText>
            <WidgetSubText>Havazás vége</WidgetSubText>
          </DataWrapper>
        </Widget>
      )}
      {nextSnow && (
        <Widget>
          <img
            src={`https://openweathermap.org/img/wn/13d@2x.png`}
            alt={":("}
          />
          <DataWrapper>
            <WidgetText>
              {new Date(nextSnow).toLocaleTimeString("hu-HU", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </WidgetText>
            <WidgetSubText>Havazás várható</WidgetSubText>
          </DataWrapper>
        </Widget>
      )}
    </>
  );
}
