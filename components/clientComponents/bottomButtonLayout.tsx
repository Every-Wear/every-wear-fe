import styled from "styled-components";

interface BottomButtonLayoutInterface {
  children: React.JSX.Element | React.JSX.Element[];
}

const BottomButtonLayoutWrap = styled.nav`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
`;

const BottomButtonLayout = ({ children }: BottomButtonLayoutInterface) => {
  return <BottomButtonLayoutWrap>{children}</BottomButtonLayoutWrap>;
};

export default BottomButtonLayout;
