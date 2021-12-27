import styled from "styled-components";
import { useContext, useState } from "react";
import { SettingsContext } from "../../utils/settings-context";
import { ThemeContext } from "../../utils/theme-context";
import { Settings } from "@styled-icons/fluentui-system-regular/Settings";
import { Palette } from "@styled-icons/boxicons-regular/Palette";
import { animations } from "../../theme/theme";
import { Glassmorphism } from "./glassmorphism";
import { useInterval } from "../../utils/use-interval";

export function Title() {
  const { setSettingsOverlayVisible } = useContext(SettingsContext);
  const { setThemeOverlayVisible } = useContext(ThemeContext);
  const [time, setTime] = useState<Date>(new Date());
  useInterval(() => {
    setTime(new Date());
  }, 60000);
  let greetingText = "Jó napot!";
  if (time.getHours() < 11) greetingText = "Jó reggelt!";
  if (time.getHours() > 18) greetingText = "Jó estét!";
  if (time.getHours() > 22) greetingText = "Jó éjszakát!";
  return (
    <TitleWrapper>
      <TitleText>{greetingText}</TitleText>
      <OverlayButtons>
        <Glassmorphism>
          <Palette
            onClick={() => {
              setThemeOverlayVisible(true);
            }}
          />
          <Settings
            onClick={() => {
              setSettingsOverlayVisible(true);
            }}
          />
        </Glassmorphism>
      </OverlayButtons>
    </TitleWrapper>
  );
}

const OverlayButtons = styled.div`
  display: none;
  ${Glassmorphism} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > * > * {
    height: 50px;
    cursor: pointer;
    transition: 0.2s ease-in;
    ${animations.rotate}
  }
`;

const TitleText = styled.div`
  font-size: 80px;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  margin: 50px 0;
  color: ${({ theme }) => theme.primaryColor};

  :hover {
    ${OverlayButtons} {
      display: flex;
    }
  }
`;
