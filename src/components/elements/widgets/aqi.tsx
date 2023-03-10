import styled, { css } from "styled-components";

import { DataWrapper, Widget, WidgetSubText, WidgetText } from "../widget";
import { AqiValues, useAqi } from "../../../hooks/useAqi";
import { spacing } from "../../../theme/theme";

export function AqiWidget() {
  const { data, error } = useAqi();
  const aqi = data?.list[0];
  if (!aqi || error) return null;
  return (
    <Widget>
      <AqiValue level={aqi.main.aqi}>
        {Math.round(aqi.components.pm2_5) || "?"}
      </AqiValue>
      <DataWrapper>
        <WidgetText>{AqiValueLabels[aqi.main.aqi]}</WidgetText>
        <WidgetSubText>AQI</WidgetSubText>
      </DataWrapper>
    </Widget>
  );
}

const AqiValueLabels: Record<AqiValues, string> = {
  [AqiValues.GOOD]: "Kiváló",
  [AqiValues.FAIR]: "Megfelelő",
  [AqiValues.MODERATE]: "Közepes",
  [AqiValues.POOR]: "Rossz",
  [AqiValues.UNHEALTHY]: "Kurva szar",
};

const AqiColors: Record<AqiValues, string> = {
  [AqiValues.GOOD]: "#17A398",
  [AqiValues.FAIR]: "#6DC193",
  [AqiValues.MODERATE]: "#F7B34C",
  [AqiValues.POOR]: "#b93c32",
  [AqiValues.UNHEALTHY]: "#9f70b5",
};

const AqiValue = styled.div<{ level: AqiValues }>`
  font-size: 50px;
  padding: 0 ${spacing.xl};
  border-radius: 10px;
  background-color: ${({ level }) => AqiColors[level]};

  ${({ level }) => {
    switch (level) {
      case AqiValues.GOOD:
        return css`
          color: white;
        `;
      case AqiValues.FAIR:
        return css`
          color: black;
        `;
      case AqiValues.MODERATE:
        return css`
          color: white;
        `;
      case AqiValues.POOR:
        return css`
          color: white;
        `;
      default:
        return css`
          color: white;
        `;
    }
  }}
`;
