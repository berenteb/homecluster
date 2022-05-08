import styled from "styled-components";
import { spacing } from "../../theme/theme";
import { FunctionComponent } from "react";
import { useSettingsContext } from "../../utils/settings-context";

export const Glassmorphism: FunctionComponent = ({ children }) => {
  const { darkMode } = useSettingsContext();
  return (
    <GlassmorphismWrapper darkMode={darkMode}>{children}</GlassmorphismWrapper>
  );
};

const GlassmorphismWrapper = styled.div<{ darkMode: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background: ${({ theme, darkMode }) =>
    darkMode ? theme.primaryColor : theme.glassColor};
  color: ${({ theme, darkMode }) =>
    darkMode ? theme.glassColor : theme.primaryColor};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: ${spacing.md};
`;
