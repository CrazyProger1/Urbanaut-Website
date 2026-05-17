import React from "react";
import { Link } from "@/i18n";

type Props = {
  href?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  id?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

export const OptionalLink = ({ href, children, ...props }: Props) => {
  if (href) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  return <div {...props}>{children}</div>;
};
