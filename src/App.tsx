import { PropsWithChildren, useContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import styled, { ThemeProvider } from "styled-components";
import { Settings } from "./components/elements/settings";
import { ThemeOverlay } from "./components/elements/theme-overlay";
import { Title } from "./components/elements/title";
import { WidgetArea } from "./components/elements/widget";
import { AqiWidget } from "./components/elements/widgets/aqi";
import { ClockWidget } from "./components/elements/widgets/clock";
import { WeatherWidget } from "./components/elements/widgets/weather";
import { GlobalStyle } from "./theme/globalStyle";
import { colors } from "./theme/theme";
import { SettingsContext, SettingsProvider } from "./utils/settings-context";
import { ThemeContext, ThemeContextProvider } from "./utils/theme-context";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchInterval: 120000 } },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <ThemeContextProvider>
          <SCThemeProvider>
            <ThemeOverlay />
            <Settings />
            <Layout>
              <Title />
              <WidgetArea>
                <ClockWidget />
                <WeatherWidget />
                <AqiWidget />
                {/*<CamWidget />*/}
              </WidgetArea>
            </Layout>
          </SCThemeProvider>
        </ThemeContextProvider>
      </SettingsProvider>
    </QueryClientProvider>
  );
}

export function SCThemeProvider({ children }: PropsWithChildren) {
  const { primaryColor, glassColor } = useContext(ThemeContext);
  return (
    <ThemeProvider
      theme={{ primaryColor: primaryColor, glassColor: glassColor }}
    >
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

const LayoutWrapper = styled.div<{
  backgroundUrl: string;
}>`
  width: 100%;
  min-height: 100vh;
  background-color: ${colors.background};
  ${({ backgroundUrl }) =>
    backgroundUrl !== "" && `background-image: url(${backgroundUrl});`};
  background-size: cover;
  padding: 5%;
  box-sizing: border-box;
  @media (prefers-color-scheme: dark) {
    background-color: black;
  }
`;

function Layout({ children }: PropsWithChildren) {
  const { backgroundUrl } = useContext(SettingsContext);
  return (
    <LayoutWrapper backgroundUrl={backgroundUrl}>{children}</LayoutWrapper>
  );
}
