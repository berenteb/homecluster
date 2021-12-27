import styled from "styled-components";
import { ReactNode } from "react";
import { Glassmorphism } from "./glassmorphism";

export const WidgetArea = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  flex-direction: row;
  padding-bottom: 20px;
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 700px) {
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.primaryColor};
  svg,
  i {
    height: 150px;
    line-height: 150px;
    font-size: 100px;
    fill: ${({ theme }) => theme.primaryColor};
  }
`;

export const WidgetText = styled.h2`
  font-size: 50px;
  margin: 0;
`;

export const WidgetDescription = styled.h2`
  font-style: italic;
`;
