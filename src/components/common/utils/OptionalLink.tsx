import React from "react";
import { Link } from "@/i18n";

type Props = {
  href?: string;
  children?: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const OptionalLink = ({ href, children, ...props }: Props) => {
  if (href) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  return children;
};
