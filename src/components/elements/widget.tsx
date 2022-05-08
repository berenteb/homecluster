import styled from "styled-components";
import { ReactNode } from "react";
import { Glassmorphism } from "./glassmorphism";
import { spacing } from "../../theme/theme";

export const WidgetArea = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  flex-direction: row;
  padding-bottom: 20px;
  box-sizing: border-box;
  @media screen and (max-width: 1800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 1300px) {
    grid-template-columns: 1fr;
  }
`;

export function Widget({ children }: { children: ReactNode }) {
  return (
    <Glassmorphism>
      <WidgetWrapper>{children}</WidgetWrapper>
    </Glassmorphism>
  );
}

export const WidgetWrapper = styled.div`
  box-sizing: border-box;
  border-radius: 20px;
  padding: 10px;
  display: flex;
  align-items: center;
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
