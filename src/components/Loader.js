import styled from "styled-components";

const Loader = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 700;
  font-size: 36px;
`;

export default Loader;
