import styled from "styled-components";
import { PropsWithChildren } from "react";
import { spacing } from "../../theme/theme";
import { useSettingsContext } from "../../utils/settings-context";

export const WidgetArea = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 170px;
  grid-gap: 20px;
  @media screen and (max-width: 1800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 1300px) {
    grid-template-columns: 1fr;
  }
`;

export function Widget({ children }: PropsWithChildren) {
  const { darkMode } = useSettingsContext();
  return <WidgetWrapper darkMode={darkMode}>{children}</WidgetWrapper>;
}

export const WidgetWrapper = styled.div<{ darkMode: boolean }>`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background: ${({ theme, darkMode }) =>
    darkMode ? theme.primaryColor : theme.glassColor};
  color: ${({ theme, darkMode }) =>
    darkMode ? theme.glassColor : theme.primaryColor};
  border-radius: 10px;
  padding: ${spacing.md};
  width: 100%;

  svg,
  i {
    font-size: 70px;
  }
  * {
    margin-right: 10px;
  }
`;

export const WidgetText = styled.h2`
  font-size: 50px;
  margin: ${spacing.xs};
`;

export const WidgetSubText = styled.p`
  font-size: 30px;
  opacity: 0.5;
  margin: ${spacing.xs};
  display: flex;
  align-items: center;
  svg,
  i {
    font-size: 30px;
  }
`;

export const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${spacing.sm};
`;
