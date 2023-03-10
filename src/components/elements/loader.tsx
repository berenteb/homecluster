import styled from "styled-components";

export const LoaderIcon = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid #dbdcef;
  border-right-color: #474bff;
  animation: spinner 1s infinite linear;

  @keyframes spinner {
    to {
      transform: rotate(1turn);
    }
  }
`;
