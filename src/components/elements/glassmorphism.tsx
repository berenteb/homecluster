import styled from "styled-components";
import { spacing } from "../../theme/theme";

export const Glassmorphism = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.glassColor + "90"};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: ${spacing.md};
`;
