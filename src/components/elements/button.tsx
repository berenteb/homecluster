import styled, { css } from "styled-components";
import {
  animations,
  borderRadius,
  boxShadows,
  colors,
  margins,
  spacing,
} from "../../theme/theme";

const ButtonBaseStyle = styled.button`
  appearance: none;
  cursor: pointer;
  text-decoration: none;
  border: none;
  font-size: large;

  > * {
    height: 30px;
  }

  border-radius: ${borderRadius.sm};
`;

export enum ButtonKinds {
  TINTED = "tinted",
  PRIMARY = "primary",
  SECONDARY = "secondary",
  PLAIN = "plain",
}

export const Button = styled(ButtonBaseStyle)<{ kind?: ButtonKinds }>`
  padding: ${spacing.md} ${spacing.lg};
  box-shadow: ${boxShadows.md};
  -webkit-box-shadow: ${boxShadows.md};
  -moz-box-shadow: ${boxShadows.md};
  ${({ kind, theme }) => {
    switch (kind) {
      case ButtonKinds.TINTED:
        return css`
          background-color: ${colors.primaryTranslucent};
          color: ${theme.primaryColor};
        `;
      case ButtonKinds.PRIMARY:
        return css`
          background-color: ${theme.primaryColor};
          color: white;
        `;
      case ButtonKinds.SECONDARY:
        return css`
          background-color: white;
          color: ${theme.primaryColor};
          border: 2px solid ${theme.primaryColor};
        `;
      default:
        return css`
          background-color: white;
          color: black;
        `;
    }
  }};
  ${animations.scale}
  margin: ${margins.xs};
`;
