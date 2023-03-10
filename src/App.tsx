import { PropsWithChildren, useContext } from "react";
import { SettingsContext, SettingsProvider } from "./utils/settings-context";
import styled, { ThemeProvider } from "styled-components";
import { colors } from "./theme/theme";
import { WeatherWidget } from "./components/elements/widgets/weather";
import { WidgetArea } from "./components/elements/widget";
import { Settings } from "./components/elements/settings";
import { Title } from "./components/elements/title";
import { ThemeContext, ThemeContextProvider } from "./utils/theme-context";
import { ThemeOverlay } from "./components/elements/theme-overlay";
import { AqiWidget } from "./components/elements/widgets/aqi";
import { ClockWidget } from "./components/elements/widgets/clock";
import { QueryClient, QueryClientProvider } from "react-query";
import { GlobalStyle } from "./theme/globalStyle";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchInterval: 30000 } },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
                </WidgetArea>
              </MarginContainer>
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

  h1 {
    font-size: 30px;
    text-align: center;
    margin: 0;
  }
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

const MarginContainer = styled.div`
  box-sizing: border-box;
  width: 95%;
  padding: 50px;
  margin: auto;
`;
