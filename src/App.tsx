import React, { ReactNode, useContext } from "react";
import { SettingsContext, SettingsProvider } from "./utils/settings-context";
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
} from "styled-components";
import { colors } from "./theme/theme";
import { WeatherWidget } from "./components/elements/widgets/weather";
import { WidgetArea } from "./components/elements/widget";
import { Settings } from "./components/elements/settings";
import { Title } from "./components/elements/title";
import { ThemeContext, ThemeContextProvider } from "./utils/theme-context";
import { ThemeOverlay } from "./components/elements/theme-overlay";
import { AqiWidget } from "./components/elements/widgets/aqi";
import { ClockWidget } from "./components/elements/widgets/clock";
import { DockerWidget } from "./components/elements/widgets/docker";

export function App() {
  return (
    <SettingsProvider>
      <ThemeContextProvider>
        <SCThemeProvider>
          <Layout>
            <Settings />
            <ThemeOverlay />
            <MarginContainer>
              <Title />
              <WidgetArea>
                <ClockWidget />
                <WeatherWidget />
                <AqiWidget />
                <DockerWidget />
              </WidgetArea>
            </MarginContainer>
          </Layout>
        </SCThemeProvider>
      </ThemeContextProvider>
    </SettingsProvider>
  );
}

function SCThemeProvider({ children }: { children: ReactNode }) {
  const { primaryColor, glassColor } = useContext(ThemeContext);
  return (
    <StyledComponentsThemeProvider
      theme={{ primaryColor: primaryColor, glassColor: glassColor }}
    >
      {children}
    </StyledComponentsThemeProvider>
  );
}

const LayoutWrapper = styled.div<{
  $backgroundEnabled: boolean;
  $backgroundUrl: string;
}>`
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  min-height: 100vh;
  background-color: ${colors.background};
  ${({ $backgroundEnabled, $backgroundUrl }) =>
    $backgroundEnabled &&
    $backgroundUrl !== "" &&
    `background-image: url(${$backgroundUrl});`};
  background-size: cover;

  h1 {
    font-size: 30px;
    text-align: center;
    margin: 0;
  }
  @media (prefers-color-scheme: dark) {
    background-color: black;
  }
`;

function Layout({ children }: { children: ReactNode }) {
  const { backgroundUrl, backgroundEnabled } = useContext(SettingsContext);
  return (
    <LayoutWrapper
      $backgroundEnabled={backgroundEnabled}
      $backgroundUrl={backgroundUrl}
    >
      {children}
    </LayoutWrapper>
  );
}

const MarginContainer = styled.div`
  width: 90%;
  padding: 50px;
`;
