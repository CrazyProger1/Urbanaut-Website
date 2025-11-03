import React from "react";
import { CircleQuestionMark } from "lucide-react";

type Props = {
  description: string;
};

export const DescriptionSection = ({ description }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1">
        <CircleQuestionMark />
        <div className="font-semibold">Description</div>
      </div>
      <div className="text-sm text-wrap">{description}</div>
    </div>
  );
};
