import styled from "styled-components";
import { useContext, useState } from "react";
import { useSettingsContext } from "../../utils/settings-context";
import { ThemeContext } from "../../utils/theme-context";
import { VscGear } from "react-icons/vsc";
import { FaPalette } from "react-icons/fa";
import { animations, spacing } from "../../theme/theme";
import { Glassmorphism } from "./glassmorphism";
import { useInterval } from "../../utils/use-interval";

export function Title() {
  const { setSettingsOverlayVisible } = useSettingsContext();
  const { setThemeOverlayVisible } = useContext(ThemeContext);
  const [time, setTime] = useState<Date>(new Date());
  useInterval(() => {
    setTime(new Date());
  }, 60000);
  let greetingText = "Jó napot!";
  const hours = time.getHours();
  if (hours < 6 || hours > 22) greetingText = "Jó éjszakát!";
  else if (hours < 11 && hours >= 6) greetingText = "Jó reggelt!";
  else if (hours > 18) greetingText = "Jó estét!";
  return (
    <TitleWrapper>
      <TitleText>{greetingText}</TitleText>
      <OverlayButtons>
        <Glassmorphism>
          <FaPalette
            onClick={() => {
              setThemeOverlayVisible(true);
            }}
          />
          <VscGear
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
  > * > * {
    font-size: 50px;
    cursor: pointer;
    transition: 0.2s ease-in;
    ${animations.rotate}
    margin: ${spacing.xs};
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
