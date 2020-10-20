import styled from "styled-components";
const MyHeader = styled.header`
  display: flex;
  align-items: center;
  height: 80px;
  width: 100%;
  padding: 20px;
  z-index: 100;
  font-size: 24px;
  font-weight: 600;
  box-shadow: 0 4px 4px 0px rgba(0, 0, 0, 0.2);
  background: ${(props) => props.theme.midColor};
  a {
    text-decoration: none;
    color: black;
  }
`;

export default MyHeader;
