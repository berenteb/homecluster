import { Widget, WidgetText } from "../widget";
import { useContext, useEffect, useState } from "react";
import {
  SettingsContext,
  SettingsContextType,
} from "../../../utils/settings-context";
import { useInterval } from "../../../utils/use-interval";
import { Aqi, getAqiData } from "../../../utils/aqi";
import styled from "styled-components";
import { spacing } from "../../../theme/theme";

export function AqiWidget() {
  const [aqi, setAqi] = useState<Aqi>();
  const [error, setError] = useState<string | undefined>();
  const { getLocation } = useContext<SettingsContextType>(SettingsContext);
  const aqiApiCall = () => {
    getLocation()
      .then((coords) => {
        getAqiData(coords)
          .then((data) => {
            setAqi(data);
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
    aqiApiCall();
  }, 180000);
  useEffect(() => {
    aqiApiCall();
  }, []);
  if (!aqi?.data?.[0]?.aqi || error) return null;
  return (
    <Widget>
      <AqiValue level={getAqiLevel(aqi?.data?.[0].aqi || 0)}>
        {aqi?.data?.[0].aqi || "?"}
      </AqiValue>
      <WidgetText>AQI</WidgetText>
    </Widget>
  );
}

enum AqiLevels {
  GOOD = "good",
  MODERATE = "moderate",
  SENSITIVE = "sensitive",
  UNHEALTHY = "unhealthy",
  VERY_UNHEALTHY = "very_unhealthy",
  HAZARDOUS = "hazardous",
}

function getAqiLevel(value: number): AqiLevels {
  if (value <= 50) return AqiLevels.GOOD;
  if (value <= 100) return AqiLevels.MODERATE;
  if (value <= 150) return AqiLevels.SENSITIVE;
  if (value <= 200) return AqiLevels.UNHEALTHY;
  if (value <= 250) return AqiLevels.VERY_UNHEALTHY;
  return AqiLevels.HAZARDOUS;
}

const AqiValue = styled.div<{ level: AqiLevels }>`
  font-size: 50px;
  padding: 0 ${spacing.xl};
  border-radius: 10px;
  ${({ level }) => {
    switch (level) {
      case AqiLevels.GOOD:
        return "background-color: #9BD74E; color: white;";
      case AqiLevels.MODERATE:
        return "background-color: #F9CF39; color: black;";
      case AqiLevels.SENSITIVE:
        return "background-color: #F89049; color: white;";
      case AqiLevels.UNHEALTHY:
        return "background-color: #F55E5F; color: white;";
      case AqiLevels.VERY_UNHEALTHY:
        return "background-color: #9F70B5; color: white;";
      default:
        return "background-color: #9F697A; color: white;";
    }
  }}
`;
