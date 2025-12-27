import React from "react";
import { Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n";

type Props = {
  tags: string[];
};

export const TagsSection = ({ tags }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1">
        <Tag />
        <div className="font-semibold">Tags</div>
      </div>
      <div className="flex flex-wrap gap-1">
        {tags?.map((tag) => (
          <Link key={tag} href={`?tags=${tag}`}>
            <Badge variant="tertiary">
              <Tag /> {tag}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
};
