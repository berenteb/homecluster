import { DataWrapper, Widget, WidgetSubText, WidgetText } from "../widget";
import { useAqi } from "../../../utils/aqi";
import styled from "styled-components";
import { colors, spacing } from "../../../theme/theme";

export function AqiWidget() {
  const { aqi, error } = useAqi();
  if (!aqi?.data?.[0]?.aqi || error) return null;
  return (
    <Widget>
      <AqiValue level={getAqiLevel(aqi?.data?.[0].aqi || 0)}>
        {aqi?.data?.[0].aqi || "?"}
      </AqiValue>
      <DataWrapper>
        <WidgetText>{getAqiLevel(aqi?.data?.[0].aqi || 0)}</WidgetText>
        <WidgetSubText>AQI</WidgetSubText>
      </DataWrapper>
    </Widget>
  );
}

enum AqiLevels {
  GOOD = "Megfelelő",
  MODERATE = "Közepes",
  SENSITIVE = "Rossz",
  UNHEALTHY = "Egészségtelen",
  VERY_UNHEALTHY = "Kurva szar",
  HAZARDOUS = "Veszélyes",
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
        return `background-color: ${colors.green}; color: white;`;
      case AqiLevels.MODERATE:
        return `background-color: ${colors.warning}; color: black;`;
      case AqiLevels.SENSITIVE:
        return `background-color: ${colors.danger}; color: white;`;
      case AqiLevels.UNHEALTHY:
        return "background-color: #B93C32; color: white;";
      case AqiLevels.VERY_UNHEALTHY:
        return "background-color: #9F70B5; color: white;";
      default:
        return "background-color: #9F697A; color: white;";
    }
  }}
`;
