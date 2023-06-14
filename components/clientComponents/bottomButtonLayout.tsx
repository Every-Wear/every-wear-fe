import styled from "styled-components";

interface BottomButtonLayoutInterface {
  children: React.JSX.Element | React.JSX.Element[];
  grid?: boolean;
}

const BottomButtonLayoutWrap = styled.nav`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;

  display: ${(props: { grid: boolean }) => props.grid && "grid"};
  grid-template-columns: 1fr 1fr;
`;

const BottomButtonLayout = ({
  children,
  grid = false,
}: BottomButtonLayoutInterface) => {
  return (
    <BottomButtonLayoutWrap grid={grid}>{children}</BottomButtonLayoutWrap>
  );
};

export default BottomButtonLayout;
