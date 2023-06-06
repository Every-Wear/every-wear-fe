import styled from "styled-components";

import { clientFonts, colors } from "@/styles/theme";

interface ClientSubTextInterface {
  center?: boolean;
  children: string | string[] | React.ReactNode;
}

const ClientSubTextWrap = styled.span`
  width: 100%;
  font-weight: 500;
  display: block;
  word-break: keep-all;
  color: ${colors.sub_white};
  font-size: ${clientFonts.sm};
  text-align: ${(props: { center: boolean }) =>
    props.center ? "center" : null};
`;

const ClientSubText = ({
  children,
  center = false,
}: ClientSubTextInterface) => {
  return <ClientSubTextWrap center={center}>{children}</ClientSubTextWrap>;
};

export default ClientSubText;
