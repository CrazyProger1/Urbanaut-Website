import React from "react";
import { CircleQuestionMark } from "lucide-react";

type Props = {
  description: string;
};

export const DescriptionSection = ({ description }: Props) => {
  return <div className="text-sm text-wrap">{description}</div>;
};
