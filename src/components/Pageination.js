import styled from "styled-components";

const Pageination = styled.ul`
  display: flex;
  justify-content: center;
  .navigation-item {
    border: 0px;
    padding: 15px;
    width: 50px;
    height: 50px;
    text-align: center;
    text-decoration: none;
    border-top: 1px solid ${(props) => props.theme.borderColor};
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    border-right: 1px solid ${(props) => props.theme.borderColor};
    background: ${(props) => props.theme.lightColor};
    color: black;
    outline: none;
    &.active {
      background: ${(props) => props.theme.midColor};
      box-shadow: inset 0 4px 4px 0 rgba(0, 0, 0, 0.2);
      color: white;
      font-weight: 600;
    }
    &:first-child {
      border-radius: 10px 0 0 10px;
      border-left: 1px solid ${(props) => props.theme.borderColor};
    }
    &:last-child {
      border-radius: 0 10px 10px 0;
    }
    :hover {
      font-weight: bold;
      cursor: pointer;
    }
    :focus {
    }
    &.next-prev {
      color: white;
      font-weight: bold;
      background-color: ${(props) => props.theme.midColor};
    }
  }
`;

export default Pageination;
