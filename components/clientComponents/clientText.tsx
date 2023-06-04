import styled from "styled-components";

import { clientFonts, colors } from "@/styles/theme";

interface ClientTextInterface {
  center?: boolean;
  children: string | string[] | React.ReactNode;
}

const ClientTextWrap = styled.p`
  width: 100%;
  font-weight: 700;
  word-break: keep-all;
  color: ${colors.white};
  font-size: ${clientFonts.md};
  text-align: ${(props: { center: boolean }) =>
    props.center ? "center" : null};
`;

const ClientText = ({ children, center = false }: ClientTextInterface) => {
  return <ClientTextWrap center={center}>{children}</ClientTextWrap>;
};

export default ClientText;
