import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
* {
  box-sizing: border-box;
}

html, body {
  width: 100%;
  background-color: ${(props) => props.theme.background};
  font-family: Arial;
}

body {
  margin: 0;
  width: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.shadow{
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
}
`;
