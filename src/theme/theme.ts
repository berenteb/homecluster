export const spacing = {
  xs: "5px",
  sm: "10px",
  md: "15px",
  lg: "20px",
  xl: "30px",
};

export const borderRadius = {
  xs: "5px",
  sm: "10px",
  md: "15px",
  lg: "20px",
  xl: "30px",
};

export const fontSize = {
  xs: "12px",
  sm: "16px",
  md: "20px",
  lg: "24px",
  xl: "30px",
};

export const margins = {
  xs: "10px",
  sm: "20px",
  md: "30px",
  lg: "40px",
  xl: "50px",
};

export const boxShadows = {
  xs: "0 0 0 1px rgba(0,0,0,.05)",
  sm: "0 1px 2px 0 rgba(0,0,0,.05)",
  md: "0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06)",
  lg: "0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -1px rgba(0,0,0,.06)",
  xl: "0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)",
  xxl: "0 20px 25px -5px rgba(0,0,0,.1), 0 10px 10px -5px rgba(0,0,0,.04)",
};

export const colors = {
  primary: "#183952",
  darkTheme: "white",
  primaryTranslucent: "rgba(62,146,204,0.15)",
  secondary: "#0A2463",
  green: "#6DC193",
  danger: "#EF6154",
  warning: "#F7B34C",
  gray: "#AEB5C1",
  glassWhite: "rgba( 255, 255, 255, 0.50 )",
  glassDark: "rgba(104,132,201,0.5)",
  background: "#d9d9d9",
};

export const animations = {
  scale: `
        transition: .2s ease-in;
        :hover{
            transform: scale(1.05);
        }
    `,
  highlight: `
        transition: .2s ease-in;
        :hover{
            background-color: #a5d8ff;
        }
    `,
  rotate: `
        transition: .2s ease-in;
        :hover{
            transform: rotate(45deg);
        }
    `,
};
