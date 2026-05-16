import React from "react";

type Props = {
  description: string;
};

export const DescriptionSection = ({ description }: Props) => {
  return <div className="text-sm text-wrap">{description}</div>;
};
