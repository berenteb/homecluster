import styled from "styled-components";
import { useContext, useState } from "react";
import { useSettingsContext } from "../../utils/settings-context";
import { ThemeContext } from "../../utils/theme-context";
import { VscGear } from "react-icons/vsc";
import { FaPalette } from "react-icons/fa";
import { animations, spacing } from "../../theme/theme";
import { useInterval } from "../../hooks/useInterval";

export function Title() {
  const { setSettingsOverlayVisible, darkMode } = useSettingsContext();
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
      <OverlayButtons darkMode={darkMode}>
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
      </OverlayButtons>
    </TitleWrapper>
  );
}

const OverlayButtons = styled.div<{ darkMode: boolean }>`
  display: none;
  align-items: center;
  box-sizing: border-box;
  background: ${({ theme, darkMode }) =>
    darkMode ? theme.primaryColor : theme.glassColor};
  color: ${({ theme, darkMode }) =>
    darkMode ? theme.glassColor : theme.primaryColor};
  border-radius: 10px;
  padding: ${spacing.md};
  :hover {
    display: flex;
  }
  svg {
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
