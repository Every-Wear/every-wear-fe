import styled from "styled-components";

import { clientFonts, colors } from "@/styles/theme";

interface ClientSubTextInterface {
  center?: boolean;
  children: string | string[] | React.ReactNode;
  label?: string;
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
  label,
}: ClientSubTextInterface) => {
  return (
    <ClientSubTextWrap aria-label={label} center={center}>
      {children}
    </ClientSubTextWrap>
  );
};

export default ClientSubText;
