import { useContext, useState } from "react";
import styled from "styled-components";
import { SwatchesPicker } from "react-color";

import { Button, ButtonKinds } from "./button";
import { ThemeContext } from "../../utils/theme-context";
import { OverlayPanelWrapper, OverlayWrapper } from "./settings";
import { spacing } from "../../theme/theme";

export function ThemeOverlay() {
  const {
    primaryColor,
    glassColor,
    setPrimaryColor,
    setGlassColor,
    setThemeOverlayVisible,
    themeOverlayVisible,
  } = useContext(ThemeContext);
  if (!themeOverlayVisible) return null;
  return (
    <OverlayWrapper
      id="themeOverlay"
      onClick={(e) => {
        if (e.target === document.getElementById("themeOverlay"))
          setThemeOverlayVisible(false);
      }}
    >
      <OverlayPanelWrapper>
        <h1>Téma</h1>
        <h3>Elsődleges szín (témaszín)</h3>
        <ColorField
          color={primaryColor}
          onChange={(color: string) => {
            setPrimaryColor(color);
          }}
        />
        <h3>Üvegszín</h3>
        <ColorField
          color={glassColor}
          onChange={(color: string) => {
            setGlassColor(color);
          }}
        />
        <Button
          kind={ButtonKinds.PRIMARY}
          onClick={() => {
            setThemeOverlayVisible(false);
          }}
        >
          Kész
        </Button>
      </OverlayPanelWrapper>
    </OverlayWrapper>
  );
}

function ColorField({
  color,
  onChange,
}: {
  color: string;
  onChange: (color: string) => void;
}) {
  const [changerVisible, setChangerVisible] = useState<boolean>(false);
  return (
    <ColorFieldWrapper
      onClick={() => {
        setChangerVisible(!changerVisible);
      }}
    >
      <ValueWrapper>
        <ColorPreview $color={color} />
        <ColorText>{color}</ColorText>
      </ValueWrapper>
      {changerVisible && (
        <SwatchesPicker
          color={color}
          onChangeComplete={(color) => {
            onChange(color.hex);
          }}
        />
      )}
    </ColorFieldWrapper>
  );
}

const ColorPreview = styled.div<{ $color: string }>`
  height: 50px;
  width: 50px;
  border: 1px solid gray;
  background-color: ${({ $color }) => $color};
  border-radius: 300px;
  margin: ${spacing.md};
`;

const ColorText = styled.p`
  color: dimgray;
  font-size: 20px;
`;

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ColorFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
