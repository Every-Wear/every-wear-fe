import { useEffect, useRef } from "react";

interface IntroAriaLabelInterface {
  labelText: string;
}

const IntroAriaLabel = ({ labelText }: IntroAriaLabelInterface) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return <div ref={ref} tabIndex={0} aria-label={labelText} />;
};

export default IntroAriaLabel;
